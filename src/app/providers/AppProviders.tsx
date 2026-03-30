import type { PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider';
import { TripsProvider } from './TripsProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <TripsProvider>{children}</TripsProvider>
    </AuthProvider>
  );
}
