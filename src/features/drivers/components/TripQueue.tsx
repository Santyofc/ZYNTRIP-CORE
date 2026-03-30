import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatCurrency, toTitleCase } from '@/lib/utils';
import { useTripsStore } from '@/app/providers/TripsProvider';

export function TripQueue() {
  const { trips, acceptTrip, rejectTrip, startTrip, completeTrip } = useTripsStore();
  const openTrips = trips.filter((trip) => trip.status === 'requested' || trip.status === 'accepted' || trip.status === 'in_progress');

  if (openTrips.length === 0) {
    return <Card title="Driver queue">No trip requests are waiting.</Card>;
  }

  return (
    <Card title="Driver queue">
      <ul className="trip-list">
        {openTrips.map((trip) => (
          <li key={trip.id} className="trip-item">
            <div>
              <p className="trip-route">
                {trip.pickup} to {trip.destination}
              </p>
              <p className="muted-small">
                Fare {formatCurrency(trip.fareEstimate)} · Status {toTitleCase(trip.status.replace('_', ' '))}
              </p>
            </div>
            <div className="actions">
              {trip.status === 'requested' ? (
                <>
                  <Button onClick={() => acceptTrip(trip.id, 'driver-session')}>Accept</Button>
                  <Button variant="ghost" onClick={() => rejectTrip(trip.id)}>
                    Decline
                  </Button>
                </>
              ) : null}
              {trip.status === 'accepted' ? (
                <Button variant="secondary" onClick={() => startTrip(trip.id)}>
                  Start trip
                </Button>
              ) : null}
              {trip.status === 'in_progress' ? (
                <Button variant="secondary" onClick={() => completeTrip(trip.id)}>
                  Complete
                </Button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
