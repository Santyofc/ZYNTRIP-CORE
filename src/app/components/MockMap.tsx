import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface MockMapProps {
  showRoute?: boolean;
  showDriver?: boolean;
  showPickup?: boolean;
  showDestination?: boolean;
  zoom?: 'close' | 'medium' | 'far';
}

export function MockMap({ showRoute, showDriver, showPickup, showDestination, zoom = 'medium' }: MockMapProps) {
  return (
    <div className="relative w-full h-full bg-[#1a1d24] overflow-hidden">
      {/* Base map with realistic look */}
      <div className="absolute inset-0">
        {/* Water/parks areas */}
        <div className="absolute top-[10%] left-[15%] w-32 h-32 bg-[#1e2a3a] rounded-full opacity-60 blur-xl" />
        <div className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-[#1e2a3a] rounded-full opacity-50 blur-2xl" />
        
        {/* Road network - more realistic */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          {/* Major roads */}
          <path d="M 0 200 L 400 200" stroke="#374151" strokeWidth="6" />
          <path d="M 0 400 L 400 400" stroke="#374151" strokeWidth="6" />
          <path d="M 0 600 L 400 600" stroke="#374151" strokeWidth="5" />
          <path d="M 150 0 L 150 900" stroke="#374151" strokeWidth="6" />
          <path d="M 300 0 L 300 900" stroke="#374151" strokeWidth="5" />
          
          {/* Road dividers */}
          <path d="M 0 200 L 400 200" stroke="#4B5563" strokeWidth="1" strokeDasharray="15 10" />
          <path d="M 0 400 L 400 400" stroke="#4B5563" strokeWidth="1" strokeDasharray="15 10" />
          <path d="M 150 0 L 150 900" stroke="#4B5563" strokeWidth="1" strokeDasharray="15 10" />
          
          {/* Curved roads for realism */}
          <path d="M 50 100 Q 200 150, 350 120" stroke="#374151" strokeWidth="5" fill="none" />
          <path d="M 80 700 Q 200 650, 350 720" stroke="#374151" strokeWidth="4" fill="none" />
        </svg>

        {/* Building blocks */}
        <div className="absolute top-[15%] left-[20%] w-20 h-16 bg-[#252932] opacity-70" />
        <div className="absolute top-[15%] left-[41%] w-16 h-20 bg-[#252932] opacity-60" />
        <div className="absolute top-[45%] left-[18%] w-24 h-18 bg-[#252932] opacity-75" />
        <div className="absolute top-[45%] left-[62%] w-18 h-24 bg-[#252932] opacity-65" />
        <div className="absolute top-[70%] left-[25%] w-22 h-20 bg-[#252932] opacity-70" />
        <div className="absolute top-[70%] left-[68%] w-20 h-16 bg-[#252932] opacity-60" />
        
        {/* Small location dots scattered around */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-600 rounded-full opacity-60"
            style={{
              left: `${15 + (i * 6) % 70}%`,
              top: `${10 + (i * 8) % 80}%`,
            }}
          />
        ))}
      </div>

      {/* Active route line with gradient */}
      {showRoute && (
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="1" />
              <stop offset="100%" stopColor="#00CC6A" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 200 700 Q 180 550, 190 400 T 200 200"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {/* Route outline for depth */}
          <path
            d="M 200 700 Q 180 550, 190 400 T 200 200"
            stroke="#000"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
      )}

      {/* Pickup location marker */}
      {showPickup && (
        <div className="absolute left-1/2 bottom-[25%] -translate-x-1/2" style={{ zIndex: 20 }}>
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Pulse effect */}
            <div className="absolute inset-0 -m-4">
              <motion.div
                className="w-full h-full bg-[#00FF88] rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </div>
            {/* Main marker */}
            <div className="relative">
              <div className="bg-[#00FF88] rounded-full p-3 shadow-2xl shadow-[#00FF88]/60 border-4 border-white">
                <div className="w-3 h-3 bg-black rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Destination marker */}
      {showDestination && (
        <div className="absolute left-1/2 top-[22%] -translate-x-1/2" style={{ zIndex: 20 }}>
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 15, delay: 0.1 }}
          >
            <div className="relative">
              {/* Pin shadow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-2 bg-black/40 rounded-full blur-sm" />
              {/* Pin */}
              <div className="relative">
                <div className="bg-black rounded-t-full rounded-b-full pb-2 px-3 pt-3 shadow-2xl border-4 border-white">
                  <MapPin className="w-6 h-6 text-[#00FF88]" fill="#00FF88" />
                </div>
                {/* Pin point */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-black" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Driver car marker */}
      {showDriver && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 25 }}>
          <motion.div
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              {/* Car shadow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-12 h-3 bg-black/30 rounded-full blur-md" />
              
              {/* Car body */}
              <div className="relative bg-white rounded-2xl p-3 shadow-2xl border-2 border-gray-200">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00FF88] rounded-xl opacity-20" />
                  <Navigation className="w-6 h-6 text-black relative z-10" fill="currentColor" />
                </div>
              </div>
              
              {/* Heading indicator */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-[#00FF88]" />
            </div>
          </motion.div>
        </div>
      )}

      {/* Zoom level overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2" style={{ zIndex: 15 }}>
        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-black font-bold hover:bg-gray-100 transition-colors">
          +
        </button>
        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-black font-bold hover:bg-gray-100 transition-colors">
          −
        </button>
      </div>

      {/* Current location button */}
      <div className="absolute bottom-4 left-4" style={{ zIndex: 15 }}>
        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
          <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
        </button>
      </div>
    </div>
  );
}
