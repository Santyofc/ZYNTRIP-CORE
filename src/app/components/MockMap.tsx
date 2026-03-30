import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MockMapProps {
  showRoute?: boolean;
  showDriver?: boolean;
  showPickup?: boolean;
  showDestination?: boolean;
}

export function MockMap({ showRoute, showDriver, showPickup, showDestination }: MockMapProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Grid pattern for map effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-12 h-full">
          {[...Array(96)].map((_, i) => (
            <div key={i} className="border border-gray-600" />
          ))}
        </div>
      </div>

      {/* Curved roads */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <path
          d="M 50 100 Q 150 150, 250 120"
          stroke="#4B5563"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M 100 300 Q 200 250, 300 280"
          stroke="#4B5563"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M 150 500 Q 250 450, 350 480"
          stroke="#4B5563"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      {/* Route line */}
      {showRoute && (
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00FF88" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 180 550 Q 200 400, 200 250"
            stroke="url(#routeGradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray="12 8"
          />
        </svg>
      )}

      {/* Pickup location */}
      {showPickup && (
        <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00FF88] rounded-full animate-ping opacity-75" />
            <div className="relative bg-[#00FF88] rounded-full p-3 shadow-lg shadow-[#00FF88]/50">
              <MapPin className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      )}

      {/* Destination location */}
      {showDestination && (
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-red-500 rounded-full p-3 shadow-lg shadow-red-500/50">
            <MapPin className="w-6 h-6 text-white" />
          </div>
        </div>
      )}

      {/* Driver location */}
      {showDriver && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black border-4 border-[#00FF88] rounded-full p-2 shadow-lg shadow-[#00FF88]/50">
            <Navigation className="w-5 h-5 text-[#00FF88]" fill="#00FF88" />
          </div>
        </div>
      )}

      {/* Location markers scattered */}
      <div className="absolute left-1/4 top-1/4 w-2 h-2 bg-gray-600 rounded-full" />
      <div className="absolute left-3/4 top-1/3 w-2 h-2 bg-gray-600 rounded-full" />
      <div className="absolute left-2/3 top-2/3 w-2 h-2 bg-gray-600 rounded-full" />
    </div>
  );
}
