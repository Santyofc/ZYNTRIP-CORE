export type TripStatus =
  | 'REQUESTED'
  | 'SEARCHING_DRIVER'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_EN_ROUTE'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'PAYMENT_PENDING'
  | 'PAID';

export const tripTransitions: Record<TripStatus, TripStatus[]> = {
  REQUESTED: ['SEARCHING_DRIVER', 'CANCELLED'],
  SEARCHING_DRIVER: ['DRIVER_ASSIGNED', 'CANCELLED'],
  DRIVER_ASSIGNED: ['DRIVER_EN_ROUTE', 'CANCELLED'],
  DRIVER_EN_ROUTE: ['ARRIVED', 'CANCELLED'],
  ARRIVED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED'],
  COMPLETED: ['PAYMENT_PENDING', 'PAID'],
  PAYMENT_PENDING: ['PAID'],
  CANCELLED: [],
  PAID: [],
};

export function canTransitionTripStatus(from: TripStatus, to: TripStatus) {
  return tripTransitions[from].includes(to);
}

export function toLegacyTripStatus(status: TripStatus): 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' {
  switch (status) {
    case 'REQUESTED':
    case 'SEARCHING_DRIVER':
      return 'requested';
    case 'DRIVER_ASSIGNED':
    case 'DRIVER_EN_ROUTE':
    case 'ARRIVED':
      return 'accepted';
    case 'IN_PROGRESS':
      return 'in_progress';
    case 'COMPLETED':
    case 'PAYMENT_PENDING':
    case 'PAID':
      return 'completed';
    case 'CANCELLED':
      return 'cancelled';
  }
}
