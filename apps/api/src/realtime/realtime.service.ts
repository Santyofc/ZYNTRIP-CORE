import { Injectable } from '@nestjs/common';
import type { TripEntity } from '../trips/entities/trip.entity';
import type { DriverLocation } from '../drivers/drivers.service';
import { RealtimeGateway } from './realtime.gateway';

export interface RealtimeNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  channel: 'app' | 'browser';
  status: 'unread' | 'read';
}

@Injectable()
export class RealtimeService {
  constructor(private readonly gateway: RealtimeGateway) {}

  emitTripCreated(trip: TripEntity) {
    this.gateway.server.emit('trip.created', trip);
    this.gateway.server.to(`trip:${trip.id}`).emit('trip.created', trip);
  }

  emitTripUpdated(trip: TripEntity) {
    this.gateway.server.emit('trip.updated', trip);
    this.gateway.server.to(`trip:${trip.id}`).emit('trip.updated', trip);
  }

  emitNotificationCreated(notification: RealtimeNotification) {
    this.gateway.server.emit('notification.created', notification);
  }

  emitDriverLocationUpdated(location: DriverLocation) {
    this.gateway.server.emit('driver.location.updated', location);
    this.gateway.server.to(`driver:${location.driverId}`).emit('driver.location.updated', location);
  }

  emitDriverOffer(driverId: string, payload: { tripId: string }) {
    this.gateway.server.to(`driver:${driverId}`).emit('trip.offer', payload);
  }
}
