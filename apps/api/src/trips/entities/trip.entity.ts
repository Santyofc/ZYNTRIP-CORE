export type TripStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface TripEntity {
  id: string;
  riderName: string;
  pickup: string;
  destination: string;
  fareEstimate: number;
  requestedAt: string;
  status: TripStatus;
  paymentStatus: PaymentStatus;
  assignedDriverId?: string;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  paidAt?: string;
}
