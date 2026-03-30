import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import { useTripsStore } from '@/app/providers/TripsProvider';
import { useAuthStore } from '@/app/providers/AuthProvider';

export function RideRequestForm() {
  const { state } = useAuthStore();
  const { requestTrip } = useTripsStore();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [lastFare, setLastFare] = useState<number | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trip = requestTrip({
      riderName: state.profile?.fullName ?? 'Rider',
      pickup,
      destination,
    });
    setLastFare(trip.fareEstimate);
    setPickup('');
    setDestination('');
  }

  return (
    <Card title="Request a ride">
      <form onSubmit={onSubmit} className="form-grid">
        <Input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Pickup point" required />
        <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Drop-off destination" required />
        <Button type="submit">Request trip</Button>
      </form>
      {lastFare !== null ? <p className="success">Latest fare estimate: {formatCurrency(lastFare)}</p> : null}
    </Card>
  );
}
