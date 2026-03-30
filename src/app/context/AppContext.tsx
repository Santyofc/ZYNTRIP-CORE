import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'passenger' | 'driver' | null;

export type TripStatus = 
  | 'requesting' 
  | 'searching' 
  | 'driver-found' 
  | 'driver-arriving' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled';

export type DriverStatus = 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  profileImage?: string;
}

export interface Driver extends User {
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  licenseNumber: string;
  verificationStatus: DriverStatus;
  rating: number;
  totalTrips: number;
}

export interface Trip {
  id: string;
  passengerId: string;
  passengerName: string;
  driverId?: string;
  driverName?: string;
  driverVehicle?: string;
  driverPlate?: string;
  driverRating?: number;
  driverPhoto?: string;
  pickup: string;
  destination: string;
  status: TripStatus;
  price: number;
  distance: string;
  estimatedTime: string;
  createdAt: Date;
  completedAt?: Date;
  rating?: number;
  review?: string;
}

interface AppContextType {
  currentUser: User | Driver | null;
  setCurrentUser: (user: User | Driver | null) => void;
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  registerPassenger: (data: any) => void;
  registerDriver: (data: any) => void;
  requestTrip: (pickup: string, destination: string) => void;
  cancelTrip: () => void;
  acceptTrip: () => void;
  rejectTrip: () => void;
  completeTrip: () => void;
  rateTrip: (rating: number, review: string) => void;
  processPayment: (method: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | Driver | null>(null);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const registerPassenger = (data: any) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: 'passenger',
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
    };
    setCurrentUser(newUser);
  };

  const registerDriver = (data: any) => {
    const newDriver: Driver = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: 'driver',
      vehicleModel: data.vehicleModel,
      vehiclePlate: data.vehiclePlate,
      vehicleColor: data.vehicleColor,
      licenseNumber: data.licenseNumber,
      verificationStatus: 'pending',
      rating: 0,
      totalTrips: 0,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
    };
    setCurrentUser(newDriver);
  };

  const requestTrip = (pickup: string, destination: string) => {
    if (!currentUser) return;

    const newTrip: Trip = {
      id: Math.random().toString(36).substr(2, 9),
      passengerId: currentUser.id,
      passengerName: currentUser.name,
      pickup,
      destination,
      status: 'searching',
      price: Math.floor(Math.random() * 30) + 10,
      distance: `${(Math.random() * 10 + 1).toFixed(1)} km`,
      estimatedTime: `${Math.floor(Math.random() * 20) + 5} min`,
      createdAt: new Date()
    };
    setCurrentTrip(newTrip);

    // Simulate finding a driver
    setTimeout(() => {
      setCurrentTrip(prev => prev ? {
        ...prev,
        status: 'driver-found',
        driverId: 'driver_' + Math.random().toString(36).substr(2, 9),
        driverName: 'Juan Pérez',
        driverVehicle: 'Toyota Corolla 2020',
        driverPlate: 'ABC-1234',
        driverRating: 4.8,
        driverPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=driver123'
      } : null);
    }, 3000);
  };

  const cancelTrip = () => {
    if (currentTrip) {
      setCurrentTrip({ ...currentTrip, status: 'cancelled' });
      setTimeout(() => setCurrentTrip(null), 2000);
    }
  };

  const acceptTrip = () => {
    if (currentTrip) {
      setCurrentTrip({ ...currentTrip, status: 'driver-arriving' });
      // Simulate driver arriving
      setTimeout(() => {
        setCurrentTrip(prev => prev ? { ...prev, status: 'in-progress' } : null);
      }, 5000);
    }
  };

  const rejectTrip = () => {
    cancelTrip();
  };

  const completeTrip = () => {
    if (currentTrip) {
      setCurrentTrip({ 
        ...currentTrip, 
        status: 'completed',
        completedAt: new Date()
      });
    }
  };

  const rateTrip = (rating: number, review: string) => {
    if (currentTrip) {
      setCurrentTrip({
        ...currentTrip,
        rating,
        review
      });
    }
  };

  const processPayment = (method: string) => {
    console.log('Payment processed with method:', method);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentTrip,
        setCurrentTrip,
        registerPassenger,
        registerDriver,
        requestTrip,
        cancelTrip,
        acceptTrip,
        rejectTrip,
        completeTrip,
        rateTrip,
        processPayment
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
