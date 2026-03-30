import type { Trip } from '../types';

export interface RideRequestPayload {
  riderName: string;
  pickup: string;
  destination: string;
}

export interface TripsStoreValue {
  trips: Trip[];
  requestTrip: (payload: RideRequestPayload) => Trip;
  acceptTrip: (tripId: string, driverId: string) => void;
  rejectTrip: (tripId: string) => void;
  startTrip: (tripId: string) => void;
  completeTrip: (tripId: string) => void;
}
