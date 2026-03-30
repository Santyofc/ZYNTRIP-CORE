import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { MockMap } from '../components/MockMap';
import { StatusBar } from '../components/StatusBar';

export function SearchingDriverScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/driver-assigned');
    }, 3200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <StatusBar />
      
      {/* Map Background */}
      <MockMap showPickup />

      {/* Top Bar */}
      <div className="absolute top-11 left-0 right-0 z-10 pt-3 px-4">
        <button
          onClick={() => navigate('/ride-confirmation')}
          className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center">
          {/* Animated Ripple Effect */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            {/* Outer rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#00FF88]"
              animate={{
                scale: [1, 2.2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#00FF88]"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#00FF88]"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 1,
              }}
            />
            
            {/* Center icon with subtle animation */}
            <motion.div 
              className="absolute inset-0 bg-[#00FF88] rounded-full flex items-center justify-center shadow-2xl shadow-[#00FF88]/50"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.span 
                className="text-6xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                🚗
              </motion.span>
            </motion.div>
          </div>

          <motion.h2 
            className="text-[24px] font-bold text-white mb-2 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Finding your ride
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-[15px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Connecting you with nearby drivers
          </motion.p>

          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#00FF88] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Status text */}
          <motion.div 
            className="mt-8 text-[13px] text-gray-600"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Searching nearby...
          </motion.div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-[15px] mb-1">Comfort • 3 min away</div>
              <div className="text-gray-500 text-[13px]">To San Francisco Airport</div>
            </div>
            <div className="text-white font-bold text-[20px]">$18.75</div>
          </div>
        </div>
      </div>
    </div>
  );
}
