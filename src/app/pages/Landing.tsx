import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Car, UserRound } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">RideShare</h1>
          <p className="text-xl text-gray-600">Tu viaje, tu manera</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/passenger/register')}>
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <UserRound className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle>Soy Pasajero</CardTitle>
              <CardDescription>Solicita un viaje ahora</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Comenzar como Pasajero
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/driver/register')}>
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <Car className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle>Soy Conductor</CardTitle>
              <CardDescription>Gana dinero conduciendo</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Comenzar como Conductor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
