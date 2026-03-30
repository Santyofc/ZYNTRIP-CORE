import type { RideRequestPayload } from '@/features/trips/state/trips-store';
import type { Trip, TripStatus } from '@/features/trips/types';
import { apiClient } from './api-client';

export function createFallbackTrip(payload: RideRequestPayload): Trip {
  return {
    id: crypto.randomUUID(),
    riderName: payload.riderName,
    pickup: payload.pickup,
    destination: payload.destination,
    fareEstimate: Math.max(4.5, Math.round((Math.random() * 30 + 4.5) * 100) / 100),
    requestedAt: new Date().toISOString(),
    status: 'requested',
    paymentStatus: 'pending',
  };
}

export async function fetchTrips() {
  return apiClient<Trip[]>('/trips');
}

export async function createTrip(payload: RideRequestPayload) {
  return apiClient<Trip>('/trips', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function markTripPaid(tripId: string, payment: { orderId: string; captureId?: string }) {
  return apiClient<Trip>(`/trips/${tripId}/payment/paid`, {
    method: 'PATCH',
    body: JSON.stringify(payment),
  });
}

export async function updateTripStatus(
  tripId: string,
  status: Extract<TripStatus, 'accepted' | 'in_progress' | 'completed' | 'cancelled'>,
  driverId?: string,
) {
  return apiClient<Trip>(`/trips/${tripId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
      driverId,
    }),
  });
}
