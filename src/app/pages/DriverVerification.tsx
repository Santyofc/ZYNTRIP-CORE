import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp, Driver } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function DriverVerification() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useApp();
  const [status, setStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setStatus('verified');
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          verificationStatus: 'verified'
        } as Driver);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="w-16 h-16 text-yellow-500" />,
          title: 'Verificación en Proceso',
          description: 'Estamos revisando tus documentos. Esto puede tomar unos minutos.',
          badge: <Badge className="bg-yellow-500">Pendiente</Badge>
        };
      case 'verified':
        return {
          icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
          title: '¡Verificación Exitosa!',
          description: 'Tu cuenta ha sido verificada. Ya puedes comenzar a aceptar viajes.',
          badge: <Badge className="bg-green-500">Verificado</Badge>
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: 'Verificación Rechazada',
          description: 'No pudimos verificar tus documentos. Por favor, contacta con soporte.',
          badge: <Badge className="bg-red-500">Rechazado</Badge>
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {statusDisplay.icon}
          </div>
          <div className="mb-2">
            {statusDisplay.badge}
          </div>
          <CardTitle>{statusDisplay.title}</CardTitle>
          <CardDescription>{statusDisplay.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'pending' && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          )}
          {status === 'verified' && (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700" 
              size="lg"
              onClick={() => navigate('/driver/home')}
            >
              Comenzar a Conducir
            </Button>
          )}
          {status === 'rejected' && (
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Contactar Soporte
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Volver al Inicio
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
