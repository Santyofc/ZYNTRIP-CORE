import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { useTripsStore } from '@/app/providers/TripsProvider';
import { formatCurrency } from '@/lib/utils';

export function PaymentsPage() {
  const { trips } = useTripsStore();
  const settledTrips = trips.filter((trip) => trip.status === 'completed');
  const grossVolume = settledTrips.reduce((sum, trip) => sum + trip.fareEstimate, 0);

  return (
    <AppShell>
      <section className="grid-2">
        <Card title="Payments overview">
          <p className="muted">Monitor transaction throughput and reconciliation readiness.</p>
          <ul className="list">
            <li>Completed transactions: {settledTrips.length}</li>
            <li>Gross volume: {formatCurrency(grossVolume)}</li>
            <li>Payout schedule: Daily batch</li>
          </ul>
        </Card>
        <Card title="Integration readiness">
          <p className="muted">Prepared for Stripe, Adyen, or custom payment processor integration through services layer.</p>
          <ul className="list">
            <li>Webhook listener module pending backend hook-up</li>
            <li>Idempotent transaction IDs planned in trip service</li>
            <li>Fraud risk scoring endpoint reserved</li>
          </ul>
        </Card>
      </section>
    </AppShell>
  );
}
