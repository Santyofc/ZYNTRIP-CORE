import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Clock, Users, Info } from 'lucide-react';
import { MockMap } from '../components/MockMap';
import { SimpleBottomSheet } from '../components/BottomSheet';
import { Button } from '../components/Button';
import { StatusBar } from '../components/StatusBar';
import { motion } from 'motion/react';

const rideOptions = [
  {
    id: 1,
    name: 'UberX',
    description: 'Affordable, everyday rides',
    eta: '3 min',
    price: 12.50,
    priceMax: 15.25,
    capacity: 4,
    icon: '🚗',
    popular: false,
  },
  {
    id: 2,
    name: 'Comfort',
    description: 'Newer cars with extra legroom',
    eta: '5 min',
    price: 18.75,
    priceMax: 22.50,
    capacity: 4,
    icon: '✨',
    popular: true,
  },
  {
    id: 3,
    name: 'UberXL',
    description: 'Affordable rides for groups up to 6',
    eta: '8 min',
    price: 22.00,
    priceMax: 28.00,
    capacity: 6,
    icon: '🚐',
    popular: false,
  },
  {
    id: 4,
    name: 'Green',
    description: 'Eco-friendly rides',
    eta: '6 min',
    price: 14.25,
    priceMax: 17.50,
    capacity: 4,
    icon: '🌿',
    popular: false,
  },
];

export function RideConfirmationScreen() {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState(rideOptions[1].id);
  const selectedOption = rideOptions.find(r => r.id === selectedRide);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <StatusBar />
      
      {/* Map with Route */}
      <MockMap showRoute showPickup showDestination />

      {/* Top Bar */}
      <div className="absolute top-11 left-0 right-0 z-10 pt-3 px-4">
        <button
          onClick={() => navigate('/destination')}
          className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Route Info Card */}
      <div className="absolute top-[72px] left-4 right-4 z-10">
        <div className="bg-white rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className="w-2 h-2 bg-[#00FF88] rounded-full" />
              <div className="w-0.5 h-10 bg-gray-300" />
              <MapPin className="w-3.5 h-3.5 text-black" fill="black" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] text-gray-600 mb-0.5">Current Location</div>
              <div className="text-black font-semibold text-[15px] truncate mb-3">123 Market Street</div>
              <div className="text-[13px] text-gray-600 mb-0.5">San Francisco Airport</div>
              <div className="text-black font-semibold text-[15px] truncate">Terminal 1, SFO</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-black font-bold text-[15px]">8.5 mi</div>
              <div className="text-[13px] text-gray-600">25 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet with Ride Options */}
      <SimpleBottomSheet>
        <div className="px-5 pb-6 pt-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Choose a ride</h2>
            <button className="flex items-center gap-1 text-[#00FF88] text-[14px] font-semibold">
              <Users className="w-4 h-4" />
              <span>For me</span>
            </button>
          </div>

          <div className="space-y-2 mb-4 max-h-[280px] overflow-y-auto">
            {rideOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedRide(option.id)}
                className={`w-full text-left transition-all ${
                  selectedRide === option.id
                    ? 'bg-[#1a1a1a] border-2 border-[#00FF88]'
                    : 'bg-[#1a1a1a] border-2 border-transparent hover:bg-[#222]'
                } rounded-2xl p-4 relative`}
                whileTap={{ scale: 0.98 }}
              >
                {option.popular && (
                  <div className="absolute -top-2 left-4 bg-[#00FF88] text-black text-[11px] font-bold px-2 py-0.5 rounded-full">
                    POPULAR
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="text-4xl flex-shrink-0">{option.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-white font-bold text-[16px]">{option.name}</h3>
                      <div className="flex items-center gap-1 text-[12px] text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{option.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[12px] text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{option.eta}</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-500">{option.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-white font-bold text-[17px]">
                      ${option.price.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-gray-600">
                      ${option.priceMax.toFixed(2)}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Price estimate disclaimer */}
          <div className="flex items-start gap-2 mb-4 p-3 bg-[#1a1a1a] rounded-xl border border-gray-800">
            <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Price may vary based on traffic and demand. You won't be charged until the trip is complete.
            </p>
          </div>

          <Button onClick={() => navigate('/searching')}>
            Request {selectedOption?.name}
          </Button>
        </div>
      </SimpleBottomSheet>
    </div>
  );
}
