import type { Trip } from '../types';

export interface RideRequestPayload {
  riderName: string;
  pickup: string;
  destination: string;
}

export interface TripsStoreValue {
  trips: Trip[];
  isSyncing: boolean;
  requestTrip: (payload: RideRequestPayload) => Promise<Trip>;
  markTripPaid: (tripId: string, payment: { orderId: string; captureId?: string }) => Promise<void>;
  markTripPaymentFailed: (tripId: string) => void;
  acceptTrip: (tripId: string, driverId: string) => Promise<void>;
  rejectTrip: (tripId: string) => Promise<void>;
  startTrip: (tripId: string) => Promise<void>;
  completeTrip: (tripId: string) => Promise<void>;
}
