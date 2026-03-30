export type TripStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface TripEntity {
  id: string;
  riderName: string;
  pickup: string;
  destination: string;
  pickupLat?: number;
  pickupLng?: number;
  destinationLat?: number;
  destinationLng?: number;
  fareEstimate: number;
  distanceKm?: number;
  durationMinutes?: number;
  requestedAt: string;
  status: TripStatus;
  paymentStatus: PaymentStatus;
  assignedDriverId?: string;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  paidAt?: string;
}
