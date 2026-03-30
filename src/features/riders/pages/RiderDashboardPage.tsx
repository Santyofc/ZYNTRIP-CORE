import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { RideRequestForm } from '../components/RideRequestForm';
import { TripTimeline } from '@/features/trips/components/TripTimeline';

export function RiderDashboardPage() {
  return (
    <AppShell>
      <section className="grid-2">
        <RideRequestForm />
        <Card title="Rider operations">
          <p className="muted">Track pickup ETAs, route progress, and completed rides from one timeline.</p>
          <ul className="list">
            <li>Live dispatch visibility</li>
            <li>Trip receipts and payment records</li>
            <li>Safety support escalation path</li>
          </ul>
        </Card>
      </section>
      <TripTimeline title="Your trips" filter="all" />
    </AppShell>
  );
}
