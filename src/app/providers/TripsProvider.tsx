import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { RideRequestPayload, TripsStoreValue } from '@/features/trips/state/trips-store';
import type { Trip } from '@/features/trips/types';
import {
  createFallbackTrip,
  createTrip,
  fetchTrips,
  markTripPaid as markTripPaidRequest,
  updateTripStatus,
} from '@/services/trip-service';
import { getSocket } from '@/services/socket-service';

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
    paymentStatus: 'pending',
  },
];

export function TripsProvider({ children }: PropsWithChildren) {
  const [trips, setTrips] = useState<Trip[]>(seedTrips);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    let active = true;
    const socket = getSocket();

    const syncTrips = async () => {
      try {
        const remoteTrips = await fetchTrips();
        if (active) {
          setTrips(remoteTrips);
        }
      } catch (error) {
        console.warn('Falling back to local trips store because the backend is unavailable.', error);
      } finally {
        if (active) {
          setIsSyncing(false);
        }
      }
    };

    const handleTripCreated = (trip: Trip) => {
      setTrips((current) => [trip, ...current.filter((item) => item.id !== trip.id)]);
    };

    const handleTripUpdated = (trip: Trip) => {
      setTrips((current) => current.map((item) => (item.id === trip.id ? trip : item)));
    };

    if (!socket.connected) {
      socket.connect();
    }

    socket.on('trip.created', handleTripCreated);
    socket.on('trip.updated', handleTripUpdated);

    void syncTrips();

    return () => {
      active = false;
      socket.off('trip.created', handleTripCreated);
      socket.off('trip.updated', handleTripUpdated);
    };
  }, []);

  async function requestTrip(payload: RideRequestPayload): Promise<Trip> {
    try {
      const trip = await createTrip(payload);
      setTrips((current) => [trip, ...current.filter((item) => item.id !== trip.id)]);
      return trip;
    } catch (error) {
      console.warn('Trip request fell back to local state.', error);
      const trip = createFallbackTrip(payload);
      setTrips((current) => [trip, ...current]);
      return trip;
    }
  }

  async function acceptTrip(tripId: string, driverId: string) {
    try {
      const trip = await updateTripStatus(tripId, 'accepted', driverId);
      setTrips((current) => current.map((item) => (item.id === trip.id ? trip : item)));
      return;
    } catch (error) {
      console.warn('Trip acceptance fell back to local state.', error);
    }

    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId ? { ...trip, status: 'accepted', assignedDriverId: driverId } : trip,
      ),
    );
  }

  async function markTripPaid(tripId: string, payment: { orderId: string; captureId?: string }) {
    try {
      const trip = await markTripPaidRequest(tripId, payment);
      setTrips((current) => current.map((item) => (item.id === trip.id ? trip : item)));
      return;
    } catch (error) {
      console.warn('Trip payment fell back to local state.', error);
    }

    setTrips((current) =>
      current.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              paymentStatus: 'paid',
              paypalOrderId: payment.orderId,
              paypalCaptureId: payment.captureId,
              paidAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  }

  function markTripPaymentFailed(tripId: string) {
    setTrips((current) =>
      current.map((trip) => (trip.id === tripId ? { ...trip, paymentStatus: 'failed' } : trip)),
    );
  }

  async function rejectTrip(tripId: string) {
    try {
      const trip = await updateTripStatus(tripId, 'cancelled');
      setTrips((current) => current.map((item) => (item.id === trip.id ? trip : item)));
      return;
    } catch (error) {
      console.warn('Trip rejection fell back to local state.', error);
    }

    setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, status: 'cancelled' } : trip)));
  }

  async function startTrip(tripId: string) {
    try {
      const trip = await updateTripStatus(tripId, 'in_progress');
      setTrips((current) => current.map((item) => (item.id === trip.id ? trip : item)));
      return;
    } catch (error) {
      console.warn('Trip start fell back to local state.', error);
    }

    setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, status: 'in_progress' } : trip)));
  }

  async function completeTrip(tripId: string) {
    try {
      const trip = await updateTripStatus(tripId, 'completed');
      setTrips((current) => current.map((item) => (item.id === trip.id ? trip : item)));
      return;
    } catch (error) {
      console.warn('Trip completion fell back to local state.', error);
    }

    setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, status: 'completed' } : trip)));
  }

  const value = useMemo<TripsStoreValue>(
    () => ({
      trips,
      isSyncing,
      requestTrip,
      markTripPaid,
      markTripPaymentFailed,
      acceptTrip,
      rejectTrip,
      startTrip,
      completeTrip,
    }),
    [isSyncing, trips],
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
