import { createBrowserRouter } from 'react-router';
import Landing from './pages/Landing';
import PassengerRegister from './pages/PassengerRegister';
import DriverRegister from './pages/DriverRegister';
import DriverVerification from './pages/DriverVerification';
import PassengerHome from './pages/PassengerHome';
import DriverHome from './pages/DriverHome';
import TripView from './pages/TripView';
import Payment from './pages/Payment';
import Rating from './pages/Rating';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/passenger/register',
    Component: PassengerRegister,
  },
  {
    path: '/passenger/home',
    Component: PassengerHome,
  },
  {
    path: '/driver/register',
    Component: DriverRegister,
  },
  {
    path: '/driver/verification',
    Component: DriverVerification,
  },
  {
    path: '/driver/home',
    Component: DriverHome,
  },
  {
    path: '/trip',
    Component: TripView,
  },
  {
    path: '/payment',
    Component: Payment,
  },
  {
    path: '/rating',
    Component: Rating,
  },
]);
