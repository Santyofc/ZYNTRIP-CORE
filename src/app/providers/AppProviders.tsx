import type { PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider';
import { NotificationsProvider } from './NotificationsProvider';
import { TripsProvider } from './TripsProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <TripsProvider>{children}</TripsProvider>
      </NotificationsProvider>
    </AuthProvider>
  );
}
