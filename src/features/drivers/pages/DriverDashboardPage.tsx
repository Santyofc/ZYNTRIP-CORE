import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { TripQueue } from '../components/TripQueue';

export function DriverDashboardPage() {
  return (
    <AppShell>
      <section className="grid-2">
        <Card title="Driver operations">
          <p className="muted">Review incoming requests, accept rides, and move trips through fulfillment stages.</p>
          <ul className="list">
            <li>Active shift status tracking</li>
            <li>Earnings visibility per ride</li>
            <li>Trip lifecycle controls</li>
          </ul>
        </Card>
        <TripQueue />
      </section>
    </AppShell>
  );
}
