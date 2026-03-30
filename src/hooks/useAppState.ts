import { useAuthStore } from '@/app/providers/AuthProvider';
import { useTripsStore } from '@/app/providers/TripsProvider';

export function useAppState() {
  return {
    auth: useAuthStore(),
    trips: useTripsStore(),
  };
}
