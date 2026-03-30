import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { useTripsStore } from '@/app/providers/TripsProvider';
import { formatCurrency } from '@/lib/utils';

export function PaymentsPage() {
  const { trips, isSyncing } = useTripsStore();
  const settledTrips = trips.filter((trip) => trip.status === 'completed');
  const paidTrips = trips.filter((trip) => trip.paymentStatus === 'paid');
  const grossVolume = settledTrips.reduce((sum, trip) => sum + trip.fareEstimate, 0);
  const paymentVolume = paidTrips.reduce((sum, trip) => sum + trip.fareEstimate, 0);

  return (
    <AppShell>
      <section className="grid-2">
        <Card title="Payments overview">
          <p className="muted">Monitor transaction throughput and reconciliation readiness.</p>
          <p className="muted-small">Realtime sync: {isSyncing ? 'connecting to backend' : 'live via Socket.IO'}</p>
          <ul className="list">
            <li>Paid rides: {paidTrips.length}</li>
            <li>Collected through PayPal: {formatCurrency(paymentVolume)}</li>
            <li>Completed transactions: {settledTrips.length}</li>
            <li>Gross volume: {formatCurrency(grossVolume)}</li>
            <li>Payout schedule: Daily batch</li>
          </ul>
        </Card>
        <Card title="Integration readiness">
          <p className="muted">PayPal Checkout is wired for client-side ride payments, internal alerts, browser notifications, and live operations sync.</p>
          <ul className="list">
            <li>Client-side checkout enabled through the JavaScript SDK</li>
            <li>Live and sandbox apps can share this integration with env-based client IDs</li>
            <li>Approved payments now create an operations alert inside the app</li>
            <li>Webhook listener module still pending backend hook-up for email or Telegram fan-out</li>
          </ul>
        </Card>
      </section>
    </AppShell>
  );
}
