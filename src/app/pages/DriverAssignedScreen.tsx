import React from 'react';
import { useNavigate } from 'react-router';
import { X, Phone, MessageCircle, Star } from 'lucide-react';
import { MockMap } from '../components/MockMap';
import { BottomSheet } from '../components/BottomSheet';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export function DriverAssignedScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Map with Driver Location */}
      <MockMap showDriver showPickup />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => navigate('/')}
          className="p-3 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* ETA Badge */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-800">
          <p className="text-[#00FF88] font-bold text-2xl text-center">3 min</p>
          <p className="text-gray-400 text-sm text-center">away</p>
        </div>
      </div>

      {/* Bottom Sheet with Driver Info */}
      <BottomSheet height="auto">
        <div className="px-6 pb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
            <p className="text-[#00FF88] font-semibold">Driver arriving</p>
          </div>

          <Card className="bg-gray-900 mb-4">
            <div className="flex items-center gap-4">
              {/* Driver Photo */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center text-3xl">
                  👨‍💼
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#00FF88] rounded-full p-1">
                  <div className="text-xs font-bold text-black px-1.5">4.9</div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">Michael Chen</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span>4.9 (2,340 rides)</span>
                </div>
                <p className="text-sm text-gray-400">Toyota Camry • Gray</p>
                <p className="text-sm font-semibold text-white">ABC 1234</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <Phone className="w-5 h-5 text-[#00FF88]" />
                </button>
                <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#00FF88]" />
                </button>
              </div>
            </div>
          </Card>

          {/* Trip Details */}
          <Card className="bg-gray-900 mb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Trip fare</span>
                <span className="text-white font-semibold">$12.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Distance</span>
                <span className="text-white font-semibold">8.5 miles</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Est. arrival</span>
                <span className="text-white font-semibold">7:45 PM</span>
              </div>
            </div>
          </Card>

          <Button onClick={() => navigate('/live-tracking')}>
            Start Trip
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
