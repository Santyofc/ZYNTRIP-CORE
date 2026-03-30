import type { RideRequestPayload } from '@/features/trips/state/trips-store';
import type { Trip } from '@/features/trips/types';

export function createTrip(payload: RideRequestPayload): Trip {
  return {
    id: crypto.randomUUID(),
    riderName: payload.riderName,
    pickup: payload.pickup,
    destination: payload.destination,
    fareEstimate: Math.max(4.5, Math.round((Math.random() * 30 + 4.5) * 100) / 100),
    requestedAt: new Date().toISOString(),
    status: 'requested',
  };
}
