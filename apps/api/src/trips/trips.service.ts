import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchingService } from '../matching/matching.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RealtimeService } from '../realtime/realtime.service';
import { SupabaseService } from '../supabase/supabase.service';
import type { Database } from '../supabase/supabase.types';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripEntity } from './entities/trip.entity';
import { canTransitionTripStatus, toLegacyTripStatus, type TripStatus as DomainTripStatus } from './trip-state.machine';

@Injectable()
export class TripsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly realtimeService: RealtimeService,
    private readonly notificationsService: NotificationsService,
    private readonly matchingService: MatchingService,
  ) {}

  private readonly trips: TripEntity[] = [
    {
      id: 'seed-1',
      riderName: 'Avery Stone',
      pickup: 'Downtown Transit Hub',
      destination: 'Riverside Business Park',
      fareEstimate: 14.2,
      requestedAt: new Date().toISOString(),
      status: 'requested',
      paymentStatus: 'pending',
    },
  ];

  async findAll() {
    const client = this.supabaseService.getAdminClient() as any;

    if (!client) {
      return this.trips;
    }

    const { data, error } = await client
      .from('trips')
      .select('*')
      .order('requested_at', { ascending: false });

    if (error) {
      throw new Error(`Supabase query failed while listing trips: ${error.message}`);
    }

    return data.map((row: Database['public']['Tables']['trips']['Row']) => this.mapTripRow(row));
  }

  async create(payload: CreateTripDto) {
    const trip: TripEntity = {
      id: crypto.randomUUID(),
      riderName: payload.riderName,
      pickup: payload.pickup,
      destination: payload.destination,
      pickupLat: payload.pickupLat,
      pickupLng: payload.pickupLng,
      destinationLat: payload.destinationLat,
      destinationLng: payload.destinationLng,
      fareEstimate: this.calculateFareEstimate(payload.pickup, payload.destination),
      requestedAt: new Date().toISOString(),
      status: 'requested',
      paymentStatus: 'pending',
    };

    const client = this.supabaseService.getAdminClient() as any;

    if (client) {
      const { data, error } = await client
        .from('trips')
        .insert({
          id: trip.id,
          rider_name: trip.riderName,
          pickup: trip.pickup,
          destination: trip.destination,
          fare_estimate: trip.fareEstimate,
          requested_at: trip.requestedAt,
          status: trip.status,
          payment_status: trip.paymentStatus,
          assigned_driver_id: null,
          paypal_order_id: null,
          paypal_capture_id: null,
          paid_at: null,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Supabase insert failed while creating a trip: ${error.message}`);
      }

      const createdTrip = this.mapTripRow(data);
      await this.tryAutoAssignDriver(createdTrip);
      this.realtimeService.emitTripCreated(createdTrip);
      return createdTrip;
    }

    this.trips.unshift(trip);
    await this.tryAutoAssignDriver(trip);
    this.realtimeService.emitTripCreated(trip);
    return trip;
  }

  async markPaid(tripId: string, payment: { orderId: string; captureId?: string }) {
    const client = this.supabaseService.getAdminClient() as any;

    if (client) {
      const { data, error } = await client
        .from('trips')
        .update({
          payment_status: 'paid',
          paypal_order_id: payment.orderId,
          paypal_capture_id: payment.captureId ?? null,
          paid_at: new Date().toISOString(),
        })
        .eq('id', tripId)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`Trip ${tripId} was not found.`);
        }

        throw new Error(`Supabase update failed while marking trip as paid: ${error.message}`);
      }

      const paidTrip = this.mapTripRow(data);
      this.realtimeService.emitTripUpdated(paidTrip);
      this.notificationsService.notifyPaymentCaptured({
        orderId: payment.orderId,
        amount: paidTrip.fareEstimate,
        riderName: paidTrip.riderName,
        pickup: paidTrip.pickup,
        destination: paidTrip.destination,
      });
      return paidTrip;
    }

    const trip = this.trips.find((item) => item.id === tripId);

    if (!trip) {
      throw new NotFoundException(`Trip ${tripId} was not found.`);
    }

    trip.paymentStatus = 'paid';
    trip.paypalOrderId = payment.orderId;
    trip.paypalCaptureId = payment.captureId;
    trip.paidAt = new Date().toISOString();
    this.realtimeService.emitTripUpdated(trip);
    this.notificationsService.notifyPaymentCaptured({
      orderId: payment.orderId,
      amount: trip.fareEstimate,
      riderName: trip.riderName,
      pickup: trip.pickup,
      destination: trip.destination,
    });

    return trip;
  }

  async updateStatus(tripId: string, status: TripEntity['status'], driverId?: string) {
    const client = this.supabaseService.getAdminClient() as any;

    if (client) {
      const patch: Record<string, unknown> = { status };
      if (typeof driverId !== 'undefined') {
        patch.assigned_driver_id = driverId;
      }

      const { data, error } = await client.from('trips').update(patch).eq('id', tripId).select().single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`Trip ${tripId} was not found.`);
        }

        throw new Error(`Supabase update failed while updating trip status: ${error.message}`);
      }

      const updatedTrip = this.mapTripRow(data);
      this.realtimeService.emitTripUpdated(updatedTrip);
      return updatedTrip;
    }

    const trip = this.trips.find((item) => item.id === tripId);

    if (!trip) {
      throw new NotFoundException(`Trip ${tripId} was not found.`);
    }

    trip.status = status;
    if (typeof driverId !== 'undefined') {
      trip.assignedDriverId = driverId;
    }

    this.realtimeService.emitTripUpdated(trip);
    return trip;
  }

  async transitionDomainStatus(tripId: string, nextStatus: DomainTripStatus, driverId?: string) {
    const trip = await this.findById(tripId);
    const currentStatus = this.toDomainTripStatus(trip);

    if (!canTransitionTripStatus(currentStatus, nextStatus)) {
      throw new Error(`Invalid transition from ${currentStatus} to ${nextStatus}`);
    }

    return this.updateStatus(tripId, toLegacyTripStatus(nextStatus), driverId);
  }

  private calculateFareEstimate(pickup: string, destination: string) {
    const distanceSignal = Math.max(pickup.length + destination.length, 8);
    return Number((distanceSignal * 0.55).toFixed(2));
  }

  private async tryAutoAssignDriver(trip: TripEntity) {
    const assignedDriverId = await this.matchingService.assignDriver({
      id: trip.id,
      pickupLat: trip.pickupLat,
      pickupLng: trip.pickupLng,
    });

    if (!assignedDriverId) {
      return;
    }

    trip.assignedDriverId = assignedDriverId;
    trip.status = 'accepted';
    this.realtimeService.emitTripUpdated(trip);
  }

  private async findById(tripId: string) {
    const trips = await this.findAll();
    const trip = trips.find((item: TripEntity) => item.id === tripId);

    if (!trip) {
      throw new NotFoundException(`Trip ${tripId} was not found.`);
    }

    return trip;
  }

  private toDomainTripStatus(trip: TripEntity): DomainTripStatus {
    if (trip.paymentStatus === 'paid') {
      return 'PAID';
    }

    switch (trip.status) {
      case 'requested':
        return trip.assignedDriverId ? 'DRIVER_ASSIGNED' : 'REQUESTED';
      case 'accepted':
        return 'DRIVER_EN_ROUTE';
      case 'in_progress':
        return 'IN_PROGRESS';
      case 'completed':
        return trip.paymentStatus === 'pending' ? 'PAYMENT_PENDING' : 'COMPLETED';
      case 'cancelled':
        return 'CANCELLED';
    }
  }

  private mapTripRow(row: Database['public']['Tables']['trips']['Row']): TripEntity {
    return {
      id: row.id,
      riderName: row.rider_name,
      pickup: row.pickup,
      destination: row.destination,
      pickupLat: undefined,
      pickupLng: undefined,
      destinationLat: undefined,
      destinationLng: undefined,
      fareEstimate: Number(row.fare_estimate),
      requestedAt: row.requested_at,
      status: row.status,
      paymentStatus: row.payment_status,
      assignedDriverId: row.assigned_driver_id ?? undefined,
      paypalOrderId: row.paypal_order_id ?? undefined,
      paypalCaptureId: row.paypal_capture_id ?? undefined,
      paidAt: row.paid_at ?? undefined,
    };
  }
}
