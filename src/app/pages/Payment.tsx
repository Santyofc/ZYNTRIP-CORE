import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { CreditCard, Wallet, DollarSign, CheckCircle2 } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const { currentTrip, processPayment } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isPaid, setIsPaid] = useState(false);

  if (!currentTrip) {
    navigate('/');
    return null;
  }

  const handlePayment = () => {
    processPayment(paymentMethod);
    setIsPaid(true);
    setTimeout(() => {
      navigate('/rating');
    }, 2000);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
            <p className="text-gray-600">Tu pago ha sido procesado correctamente</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Pago del Viaje</h1>
          <p className="text-gray-600">Completa el pago para finalizar tu viaje</p>
        </div>

        <div className="space-y-6">
          {/* Trip Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Viaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tarifa base</span>
                <span className="font-medium">${(currentTrip.price * 0.7).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Distancia ({currentTrip.distance})</span>
                <span className="font-medium">${(currentTrip.price * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tiempo ({currentTrip.estimatedTime})</span>
                <span className="font-medium">${(currentTrip.price * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-blue-600">${currentTrip.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
              <CardDescription>Selecciona cómo deseas pagar</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Tarjeta de Crédito</p>
                        <p className="text-sm text-gray-500">Visa •••• 4242</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="debit-card" id="debit-card" />
                    <Label htmlFor="debit-card" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Tarjeta de Débito</p>
                        <p className="text-sm text-gray-500">Mastercard •••• 8888</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Wallet className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Billetera Digital</p>
                        <p className="text-sm text-gray-500">Saldo: $150.00</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Efectivo</p>
                        <p className="text-sm text-gray-500">Paga al conductor</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              className="w-full" 
              size="lg"
              onClick={handlePayment}
            >
              Confirmar Pago de ${currentTrip.price}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => navigate('/rating')}
            >
              Omitir y Calificar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
