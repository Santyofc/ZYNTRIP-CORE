import { createBrowserRouter } from 'react-router';
import { HomeScreen } from './pages/HomeScreen';
import { DestinationScreen } from './pages/DestinationScreen';
import { RideConfirmationScreen } from './pages/RideConfirmationScreen';
import { SearchingDriverScreen } from './pages/SearchingDriverScreen';
import { DriverAssignedScreen } from './pages/DriverAssignedScreen';
import { LiveTrackingScreen } from './pages/LiveTrackingScreen';
import { PaymentScreen } from './pages/PaymentScreen';
import { RatingScreen } from './pages/RatingScreen';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomeScreen,
  },
  {
    path: '/destination',
    Component: DestinationScreen,
  },
  {
    path: '/ride-confirmation',
    Component: RideConfirmationScreen,
  },
  {
    path: '/searching',
    Component: SearchingDriverScreen,
  },
  {
    path: '/driver-assigned',
    Component: DriverAssignedScreen,
  },
  {
    path: '/live-tracking',
    Component: LiveTrackingScreen,
  },
  {
    path: '/payment',
    Component: PaymentScreen,
  },
  {
    path: '/rating',
    Component: RatingScreen,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);