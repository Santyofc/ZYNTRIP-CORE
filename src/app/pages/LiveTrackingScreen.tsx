import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, Navigation, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { MockMap } from '../components/MockMap';
import { Card } from '../components/Card';

export function LiveTrackingScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(25);

  useEffect(() => {
    // Simulate trip progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/payment'), 1000);
          return 100;
        }
        return prev + 2;
      });
      setEta((prev) => Math.max(0, prev - 0.5));
    }, 200);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Map with Route and Driver */}
      <MockMap showRoute showDriver showPickup showDestination />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-3 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-800">
            <p className="text-[#00FF88] font-bold">In Progress</p>
          </div>
        </div>
      </div>

      {/* Driver Info Bar */}
      <div className="absolute top-24 left-4 right-4 z-10">
        <Card className="bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-2xl">
              👨‍💼
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">Michael Chen</p>
              <p className="text-sm text-gray-400">Toyota Camry • ABC 1234</p>
            </div>
            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Phone className="w-4 h-4 text-[#00FF88]" />
            </button>
            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4 text-[#00FF88]" />
            </button>
          </div>
        </Card>
      </div>

      {/* Progress Card */}
      <div className="absolute bottom-6 left-4 right-4 z-10">
        <Card className="bg-black/90 backdrop-blur-sm">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white font-bold text-2xl">{Math.round(eta)} min</p>
                <p className="text-sm text-gray-400">Estimated arrival</p>
              </div>
              <div className="text-right">
                <p className="text-[#00FF88] font-bold text-xl">{progress.toFixed(0)}%</p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 pt-4 border-t border-gray-800">
            <Navigation className="w-5 h-5 text-[#00FF88] mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Destination</p>
              <p className="text-white font-semibold">San Francisco Airport</p>
              <p className="text-sm text-gray-400">Terminal 1, San Francisco, CA</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
