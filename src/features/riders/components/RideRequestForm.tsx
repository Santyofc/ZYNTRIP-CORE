import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PayPalCheckoutButton } from '@/components/payments/PayPalCheckoutButton';
import { formatCurrency } from '@/lib/utils';
import { useTripsStore } from '@/app/providers/TripsProvider';
import { useAuthStore } from '@/app/providers/AuthProvider';

export function RideRequestForm() {
  const { state } = useAuthStore();
  const { trips, requestTrip, markTripPaid, markTripPaymentFailed } = useTripsStore();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [draftTripId, setDraftTripId] = useState<string | null>(null);
  const draftTrip = trips.find((trip) => trip.id === draftTripId) ?? null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trip = await requestTrip({
      riderName: state.profile?.fullName ?? 'Rider',
      pickup,
      destination,
    });
    setDraftTripId(trip.id);
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
      {draftTrip ? (
        <div className="checkout-panel">
          <p className="success">Latest fare estimate: {formatCurrency(draftTrip.fareEstimate)}</p>
          <p className="muted-small">
            Complete payment to confirm the trip request for {draftTrip.pickup} to {draftTrip.destination}.
          </p>
          {draftTrip.paymentStatus === 'paid' ? (
            <>
              <p className="paypal-state paypal-state-success">
                Payment received. Order {draftTrip.paypalOrderId} is attached to this trip.
              </p>
              <p className="muted-small">A new operations notification has been added for your payments desk.</p>
            </>
          ) : (
            <PayPalCheckoutButton
              amount={draftTrip.fareEstimate}
              description={`Zyntrip ride for ${draftTrip.riderName}`}
              onApproved={(payment) => void markTripPaid(draftTrip.id, payment)}
            />
          )}
          {draftTrip.paymentStatus === 'failed' ? (
            <p className="paypal-state paypal-state-error">
              Payment failed. You can retry the PayPal checkout for this trip.
            </p>
          ) : null}
          {draftTrip.paymentStatus !== 'paid' ? (
            <Button type="button" variant="ghost" onClick={() => markTripPaymentFailed(draftTrip.id)}>
              Mark payment as failed
            </Button>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
