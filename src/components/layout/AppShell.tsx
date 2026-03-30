import { NavLink } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import { useNotificationsStore } from '@/app/providers/NotificationsProvider';
import { NotificationsInbox } from '@/features/notifications/components/NotificationsInbox';
import { APP_NAME, ROUTES } from '@/lib/constants';

const navItems = [
  { path: ROUTES.rider, label: 'Rider' },
  { path: ROUTES.driver, label: 'Driver' },
  { path: ROUTES.dispatch, label: 'Dispatch' },
  { path: ROUTES.payments, label: 'Payments' },
  { path: ROUTES.admin, label: 'Admin' },
];

export function AppShell({ children }: PropsWithChildren) {
  const { unreadCount } = useNotificationsStore();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-brand">{APP_NAME}</p>
          <p className="app-subtitle">Mobility Platform Console</p>
        </div>
        <div className="app-header-status">
          <p className="header-status-label">Ops inbox</p>
          <p className="header-status-value">{unreadCount} unread</p>
        </div>
        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <NotificationsInbox />
      <main className="app-main">{children}</main>
    </div>
  );
}
