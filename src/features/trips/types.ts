export type TripStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface Trip {
  id: string;
  riderName: string;
  pickup: string;
  destination: string;
  fareEstimate: number;
  requestedAt: string;
  status: TripStatus;
  assignedDriverId?: string;
}
