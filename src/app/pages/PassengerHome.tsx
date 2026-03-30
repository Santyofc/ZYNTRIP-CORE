import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { MapPin, Navigation, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export default function PassengerHome() {
  const navigate = useNavigate();
  const { currentUser, requestTrip, currentTrip, setCurrentUser } = useApp();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    if (currentTrip) {
      navigate('/trip');
    }
  }, [currentTrip, navigate]);

  const handleRequestTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickup && destination) {
      requestTrip(pickup, destination);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">RideShare</h1>
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
          {/* Map Placeholder */}
          <Card className="md:col-span-2 h-96">
            <CardContent className="p-0 h-full bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Mapa interactivo</p>
                </div>
              </div>
              {/* Simulated map markers */}
              <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>

          {/* Request Trip Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Solicitar Viaje</CardTitle>
              <CardDescription>Ingresa tu ubicación y destino</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRequestTrip} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Punto de recogida</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="pickup"
                      placeholder="Ej: Calle Mayor 1, Madrid"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destino</Label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="destination"
                      placeholder="Ej: Gran Vía 50, Madrid"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Buscar Conductor
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
