import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp, Trip } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { MapPin, Navigation, User, LogOut, DollarSign } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

export default function DriverHome() {
  const navigate = useNavigate();
  const { currentUser, currentTrip, acceptTrip, rejectTrip, setCurrentUser } = useApp();
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState<Trip | null>(null);

  useEffect(() => {
    if (currentTrip && currentTrip.status !== 'requesting') {
      navigate('/trip');
    }
  }, [currentTrip, navigate]);

  useEffect(() => {
    // Simulate incoming trip requests when online
    if (isOnline && !incomingRequest) {
      const timer = setTimeout(() => {
        const mockTrip: Trip = {
          id: Math.random().toString(36).substr(2, 9),
          passengerId: 'passenger_' + Math.random().toString(36).substr(2, 9),
          passengerName: 'Ana Martínez',
          pickup: 'Calle Alcalá 100, Madrid',
          destination: 'Aeropuerto Barajas, Madrid',
          status: 'requesting',
          price: 25,
          distance: '15.2 km',
          estimatedTime: '22 min',
          createdAt: new Date()
        };
        setIncomingRequest(mockTrip);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOnline, incomingRequest]);

  const handleAccept = () => {
    if (incomingRequest) {
      acceptTrip();
      setIncomingRequest(null);
    }
  };

  const handleReject = () => {
    rejectTrip();
    setIncomingRequest(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-600">RideShare Driver</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={currentUser?.profileImage} />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{currentUser?.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 pt-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Status Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Estado del Conductor</CardTitle>
                <Badge className={isOnline ? 'bg-green-500' : 'bg-gray-400'}>
                  {isOnline ? 'En línea' : 'Desconectado'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="online-mode"
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                />
                <Label htmlFor="online-mode">
                  {isOnline ? 'Disponible para viajes' : 'No disponible'}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card className="md:col-span-2 h-96">
            <CardContent className="p-0 h-full bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Mapa de tu ubicación</p>
                </div>
              </div>
              {isOnline && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-green-500 rounded-full opacity-25 animate-ping"></div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Incoming Request */}
          {incomingRequest && (
            <Card className="md:col-span-2 border-2 border-green-500 shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-600">¡Nueva Solicitud de Viaje!</CardTitle>
                <CardDescription>Un pasajero necesita un conductor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{incomingRequest.passengerName}</p>
                    <p className="text-sm text-gray-500">Pasajero</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Recogida</p>
                      <p className="text-sm text-gray-600">{incomingRequest.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Navigation className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Destino</p>
                      <p className="text-sm text-gray-600">{incomingRequest.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 text-center">
                    <p className="text-sm text-gray-600">Distancia</p>
                    <p className="font-semibold">{incomingRequest.distance}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-sm text-gray-600">Tiempo est.</p>
                    <p className="font-semibold">{incomingRequest.estimatedTime}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-sm text-gray-600">Ganancia</p>
                    <p className="font-semibold text-green-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                      {incomingRequest.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleReject}
                  >
                    Rechazar
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleAccept}
                  >
                    Aceptar Viaje
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Waiting State */}
          {isOnline && !incomingRequest && (
            <Card className="md:col-span-2">
              <CardContent className="py-12 text-center">
                <div className="animate-pulse">
                  <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Buscando pasajeros cerca de ti...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
