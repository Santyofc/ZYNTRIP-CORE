import { Card } from '@/components/ui/Card';
import { formatCurrency, toTitleCase } from '@/lib/utils';
import { useTripsStore } from '@/app/providers/TripsProvider';
import type { TripStatus } from '../types';

interface TripTimelineProps {
  title: string;
  filter: 'all' | TripStatus;
}

export function TripTimeline({ title, filter }: TripTimelineProps) {
  const { trips } = useTripsStore();
  const filteredTrips = filter === 'all' ? trips : trips.filter((trip) => trip.status === filter);

  return (
    <Card title={title}>
      {filteredTrips.length === 0 ? (
        <p className="muted">No trips to display.</p>
      ) : (
        <ul className="trip-list">
          {filteredTrips.map((trip) => (
            <li key={trip.id} className="trip-item">
              <div>
                <p className="trip-route">
                  {trip.pickup} to {trip.destination}
                </p>
                <p className="muted-small">
                  Rider {trip.riderName} · {new Date(trip.requestedAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="trip-price">{formatCurrency(trip.fareEstimate)}</p>
                <p className="badge">{toTitleCase(trip.status.replace('_', ' '))}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
