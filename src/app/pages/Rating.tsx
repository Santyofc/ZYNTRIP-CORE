import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Star, User } from 'lucide-react';

export default function Rating() {
  const navigate = useNavigate();
  const { currentUser, currentTrip, rateTrip, setCurrentTrip } = useApp();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  if (!currentTrip) {
    navigate('/');
    return null;
  }

  const isPassenger = currentUser?.type === 'passenger';

  const handleSubmit = () => {
    rateTrip(rating, review);
    setCurrentTrip(null);
    navigate(isPassenger ? '/passenger/home' : '/driver/home');
  };

  const handleSkip = () => {
    setCurrentTrip(null);
    navigate(isPassenger ? '/passenger/home' : '/driver/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle>Califica tu Viaje</CardTitle>
          <CardDescription>
            {isPassenger 
              ? 'Cuéntanos cómo fue tu experiencia con el conductor'
              : 'Califica a tu pasajero'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Driver/Passenger Info */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-20 h-20">
              <AvatarImage 
                src={isPassenger ? currentTrip.driverPhoto : undefined} 
              />
              <AvatarFallback>
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-lg">
                {isPassenger ? currentTrip.driverName : currentTrip.passengerName}
              </p>
              {isPassenger && (
                <p className="text-sm text-gray-600">{currentTrip.driverVehicle}</p>
              )}
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className="text-center">
              <p className="text-lg font-medium">
                {rating === 5 && '¡Excelente! 🌟'}
                {rating === 4 && '¡Muy bien! 😊'}
                {rating === 3 && 'Aceptable 👍'}
                {rating === 2 && 'Podría mejorar 😐'}
                {rating === 1 && 'Necesita mejorar 😞'}
              </p>
            </div>
          )}

          {/* Review Text */}
          {rating > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Cuéntanos más sobre tu experiencia (opcional)
              </label>
              <Textarea
                placeholder="Escribe tu comentario aquí..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {/* Trip Summary */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Distancia</span>
              <span className="font-medium">{currentTrip.distance}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duración</span>
              <span className="font-medium">{currentTrip.estimatedTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total pagado</span>
              <span className="font-medium text-blue-600">${currentTrip.price}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Enviar Calificación
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={handleSkip}
            >
              Omitir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
