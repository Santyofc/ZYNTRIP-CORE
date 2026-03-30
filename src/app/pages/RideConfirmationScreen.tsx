import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Clock, Users } from 'lucide-react';
import { MockMap } from '../components/MockMap';
import { BottomSheet } from '../components/BottomSheet';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const rideOptions = [
  {
    id: 1,
    name: 'UberX',
    description: 'Affordable, everyday rides',
    eta: '3 min',
    price: '$12.50',
    capacity: 4,
    icon: '🚗',
  },
  {
    id: 2,
    name: 'Comfort',
    description: 'Newer cars with extra legroom',
    eta: '5 min',
    price: '$18.75',
    capacity: 4,
    icon: '🚙',
  },
  {
    id: 3,
    name: 'UberXL',
    description: 'Affordable rides for groups up to 6',
    eta: '8 min',
    price: '$22.00',
    capacity: 6,
    icon: '🚐',
  },
];

export function RideConfirmationScreen() {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = React.useState(rideOptions[0].id);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Map with Route */}
      <MockMap showRoute showPickup showDestination />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => navigate('/destination')}
          className="p-3 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Route Info Card */}
      <div className="absolute top-20 left-4 right-4 z-10">
        <Card className="bg-black/80 backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 bg-[#00FF88] rounded-full" />
                <div className="w-0.5 h-8 bg-gray-700 mx-auto my-1" />
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Pickup</p>
                  <p className="text-white font-semibold">Current Location</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Destination</p>
                  <p className="text-white font-semibold">San Francisco Airport</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#00FF88] font-semibold">8.5 mi</p>
                <p className="text-sm text-gray-400">25 min</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Sheet with Ride Options */}
      <BottomSheet height="55%">
        <div className="px-6 pb-8 flex flex-col h-full">
          <h2 className="text-xl font-bold text-white mb-4">Choose a ride</h2>

          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {rideOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => setSelectedRide(option.id)}
                className={`transition-all ${
                  selectedRide === option.id
                    ? 'border-[#00FF88] bg-gray-800'
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{option.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{option.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Users className="w-3 h-3" />
                        <span>{option.capacity}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{option.description}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{option.eta}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{option.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button onClick={() => navigate('/searching')}>
            Request {rideOptions.find(r => r.id === selectedRide)?.name}
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
