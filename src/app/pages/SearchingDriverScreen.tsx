import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { MockMap } from '../components/MockMap';

export function SearchingDriverScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate finding a driver after 3 seconds
    const timer = setTimeout(() => {
      navigate('/driver-assigned');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Map Background */}
      <MockMap showPickup />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => navigate('/ride-confirmation')}
          className="p-3 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          {/* Animated Pulse */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 bg-[#00FF88] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 bg-[#00FF88] rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            <div className="absolute inset-0 bg-[#00FF88] rounded-full flex items-center justify-center">
              <span className="text-5xl">🚗</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Finding your ride...
          </h2>
          <p className="text-gray-400">
            Connecting you with nearby drivers
          </p>

          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#00FF88] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
