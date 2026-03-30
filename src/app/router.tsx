import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from './providers/AuthProvider';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { RiderDashboardPage } from '@/features/riders/pages/RiderDashboardPage';
import { DriverDashboardPage } from '@/features/drivers/pages/DriverDashboardPage';
import { DispatchBoardPage } from '@/features/dispatch/pages/DispatchBoardPage';
import { PaymentsPage } from '@/features/payments/pages/PaymentsPage';
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage';

function ProtectedRoute() {
  const { state } = useAuthStore();

  if (!state.isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet />;
}

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>The route you requested is not part of the Zyntrip console.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.login} replace />,
  },
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.register,
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.rider, element: <RiderDashboardPage /> },
      { path: ROUTES.driver, element: <DriverDashboardPage /> },
      { path: ROUTES.dispatch, element: <DispatchBoardPage /> },
      { path: ROUTES.payments, element: <PaymentsPage /> },
      { path: ROUTES.admin, element: <AdminDashboardPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
