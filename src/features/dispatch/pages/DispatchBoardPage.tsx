import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { TripTimeline } from '@/features/trips/components/TripTimeline';

export function DispatchBoardPage() {
  return (
    <AppShell>
      <section className="grid-2">
        <Card title="Dispatch center">
          <p className="muted">Coordinate live demand and driver supply with priority-based dispatch rules.</p>
          <ul className="list">
            <li>Peak-hour surge readiness</li>
            <li>Safety incident escalation routing</li>
            <li>Fleet balancing by zone</li>
          </ul>
        </Card>
        <TripTimeline title="Pending dispatch" filter="requested" />
      </section>
    </AppShell>
  );
}
