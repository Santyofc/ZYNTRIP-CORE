import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { useTripsStore } from '@/app/providers/TripsProvider';

export function AdminDashboardPage() {
  const { trips } = useTripsStore();
  const completed = trips.filter((trip) => trip.status === 'completed').length;
  const inProgress = trips.filter((trip) => trip.status === 'in_progress').length;
  const openRequests = trips.filter((trip) => trip.status === 'requested').length;

  return (
    <AppShell>
      <section className="grid-3">
        <Card title="Open requests">
          <p className="metric">{openRequests}</p>
        </Card>
        <Card title="Trips in progress">
          <p className="metric">{inProgress}</p>
        </Card>
        <Card title="Completed trips">
          <p className="metric">{completed}</p>
        </Card>
      </section>
      <Card title="Platform health">
        <p className="muted">Operational baseline is stable and ready for backend service integration.</p>
        <ul className="list">
          <li>Auth and trip states centralized in providers</li>
          <li>Feature-first modules isolated for scale</li>
          <li>Service adapters prepared for API replacement</li>
        </ul>
      </Card>
    </AppShell>
  );
}
