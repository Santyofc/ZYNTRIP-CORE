import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { 
  MapPin, 
  Navigation, 
  User, 
  Car, 
  Phone, 
  MessageSquare,
  Clock,
  DollarSign
} from 'lucide-react';

export default function TripView() {
  const navigate = useNavigate();
  const { currentUser, currentTrip, cancelTrip, completeTrip } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentTrip) {
      navigate(currentUser?.type === 'passenger' ? '/passenger/home' : '/driver/home');
      return;
    }

    // Simulate progress for in-progress trips
    if (currentTrip.status === 'in-progress') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentTrip, currentUser, navigate]);

  useEffect(() => {
    if (currentTrip?.status === 'completed') {
      setTimeout(() => {
        navigate('/payment');
      }, 2000);
    }
  }, [currentTrip?.status, navigate]);

  if (!currentTrip) return null;

  const isPassenger = currentUser?.type === 'passenger';
  const isDriver = currentUser?.type === 'driver';

  const getStatusText = () => {
    switch (currentTrip.status) {
      case 'searching':
        return 'Buscando conductor...';
      case 'driver-found':
        return '¡Conductor encontrado!';
      case 'driver-arriving':
        return 'Conductor en camino';
      case 'in-progress':
        return 'Viaje en curso';
      case 'completed':
        return '¡Viaje completado!';
      case 'cancelled':
        return 'Viaje cancelado';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (currentTrip.status) {
      case 'searching':
        return 'bg-yellow-500';
      case 'driver-found':
      case 'driver-arriving':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-green-500';
      case 'completed':
        return 'bg-green-600';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleComplete = () => {
    completeTrip();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Viaje Activo</h1>
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 pt-8">
        <div className="space-y-6">
          {/* Map Placeholder */}
          <Card className="h-96">
            <CardContent className="p-0 h-full bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Seguimiento en tiempo real</p>
                </div>
              </div>
              {/* Simulated route */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-blue-400 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Car className="w-3 h-3 text-white" />
              </div>
              <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-red-500 rounded-full"></div>
            </CardContent>
          </Card>

          {/* Trip Progress */}
          {currentTrip.status === 'in-progress' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progreso del viaje</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-gray-600 text-center">{progress}% completado</p>
              </CardContent>
            </Card>
          )}

          {/* Driver/Passenger Info */}
          {isPassenger && currentTrip.status !== 'searching' && (
            <Card>
              <CardHeader>
                <CardTitle>Tu Conductor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={currentTrip.driverPhoto} />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{currentTrip.driverName}</p>
                    <p className="text-sm text-gray-600">{currentTrip.driverVehicle}</p>
                    <p className="text-sm text-gray-600">Placa: {currentTrip.driverPlate}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{currentTrip.driverRating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isDriver && (
            <Card>
              <CardHeader>
                <CardTitle>Tu Pasajero</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{currentTrip.passengerName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trip Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Viaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Origen</p>
                    <p className="text-sm text-gray-600">{currentTrip.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Destino</p>
                    <p className="text-sm text-gray-600">{currentTrip.destination}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">Precio</p>
                  </div>
                  <p className="font-semibold">${currentTrip.price}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">Distancia</p>
                  </div>
                  <p className="font-semibold">{currentTrip.distance}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">Tiempo</p>
                  </div>
                  <p className="font-semibold">{currentTrip.estimatedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            {isDriver && currentTrip.status === 'in-progress' && progress >= 95 && (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                size="lg"
                onClick={handleComplete}
              >
                Finalizar Viaje
              </Button>
            )}
            
            {currentTrip.status !== 'completed' && currentTrip.status !== 'in-progress' && (
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={cancelTrip}
              >
                Cancelar Viaje
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
