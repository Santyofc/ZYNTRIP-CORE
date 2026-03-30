import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import type { RideRequestPayload, TripsStoreValue } from '@/features/trips/state/trips-store';
import type { Trip } from '@/features/trips/types';
import { createTrip } from '@/services/trip-service';

const TripsContext = createContext<TripsStoreValue | null>(null);

const seedTrips: Trip[] = [
  {
    id: 'seed-1',
    riderName: 'Avery Stone',
    pickup: 'Downtown Transit Hub',
    destination: 'Riverside Business Park',
    fareEstimate: 14.2,
    requestedAt: new Date().toISOString(),
    status: 'requested',
  },
];

export function TripsProvider({ children }: PropsWithChildren) {
  const [trips, setTrips] = useState<Trip[]>(seedTrips);

  function requestTrip(payload: RideRequestPayload): Trip {
    const trip = createTrip(payload);
    setTrips((current) => [trip, ...current]);
    return trip;
  }

  function acceptTrip(tripId: string, driverId: string) {
    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId ? { ...trip, status: 'accepted', assignedDriverId: driverId } : trip,
      ),
    );
  }

  function rejectTrip(tripId: string) {
    setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, status: 'cancelled' } : trip)));
  }

  function startTrip(tripId: string) {
    setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, status: 'in_progress' } : trip)));
  }

  function completeTrip(tripId: string) {
    setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, status: 'completed' } : trip)));
  }

  const value = useMemo<TripsStoreValue>(
    () => ({
      trips,
      requestTrip,
      acceptTrip,
      rejectTrip,
      startTrip,
      completeTrip,
    }),
    [trips],
  );

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>;
}

export function useTripsStore() {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error('useTripsStore must be used within TripsProvider');
  }

  return context;
}
