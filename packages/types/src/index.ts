export type UserRole = 'rider' | 'driver' | 'dispatcher' | 'admin' | 'finance';

export type TripStatus =
  | 'requested'
  | 'assigned'
  | 'driver_en_route'
  | 'driver_arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded';

export interface TripSummary {
  id: string;
  riderUserId: string;
  driverUserId?: string;
  status: TripStatus;
  pickupLabel: string;
  destinationLabel: string;
  fareEstimate: number;
}
