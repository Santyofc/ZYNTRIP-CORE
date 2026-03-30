import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, Navigation, Phone, MessageCircle, MapPin, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { MockMap } from '../components/MockMap';
import { StatusBar } from '../components/StatusBar';

export function LiveTrackingScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(25);
  const [distance, setDistance] = useState(8.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/payment'), 1000);
          return 100;
        }
        return prev + 1.5;
      });
      setEta((prev) => Math.max(0, Math.round(prev - 0.375)));
      setDistance((prev) => Math.max(0, parseFloat((prev - 0.1275).toFixed(1))));
    }, 200);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <StatusBar />
      
      {/* Map with Route and Driver */}
      <MockMap showRoute showDriver showPickup showDestination />

      {/* Top Bar */}
      <div className="absolute top-11 left-0 right-0 z-10 pt-3 px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
          >
            <X className="w-5 h-5 text-black" />
          </button>
          <div className="bg-[#00FF88] rounded-full px-4 py-2 shadow-lg">
            <span className="text-black font-bold text-[13px]">TRIP IN PROGRESS</span>
          </div>
        </div>
      </div>

      {/* Driver Quick Info Bar */}
      <motion.div 
        className="absolute top-[76px] left-4 right-4 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-2xl p-3 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              👨‍💼
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-black font-bold text-[15px]">Michael Chen</div>
              <div className="text-gray-600 text-[13px]">Toyota Camry • ABC 1234</div>
            </div>
            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors active:scale-95 flex-shrink-0">
              <MessageCircle className="w-4.5 h-4.5 text-black" />
            </button>
            <button className="w-10 h-10 bg-black hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors active:scale-95 flex-shrink-0">
              <Phone className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Progress Card */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl rounded-t-[28px] border-t-2 border-gray-900 shadow-2xl">
          <div className="w-10 h-1.5 bg-gray-700 rounded-full mx-auto mt-3 mb-4" />
          
          <div className="px-5 pb-6">
            {/* Progress Bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-white font-bold text-[28px] leading-none mb-1">
                    {eta} min
                  </div>
                  <div className="text-gray-500 text-[13px]">
                    {distance} miles away
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#00FF88] font-bold text-[24px] leading-none mb-1">
                    {progress.toFixed(0)}%
                  </div>
                  <div className="text-gray-500 text-[13px]">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00FF88] to-[#00CC6A] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Route Info */}
            <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 border border-gray-800">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-1">
                  <div className="w-2.5 h-2.5 bg-[#00FF88] rounded-full ring-4 ring-[#00FF88]/20" />
                  <div className="w-0.5 h-12 bg-gray-800" />
                  <MapPin className="w-4 h-4 text-gray-500" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <div className="text-gray-500 text-[12px] mb-1">PICKUP</div>
                    <div className="text-white font-semibold text-[15px]">123 Market Street</div>
                    <div className="text-gray-500 text-[13px]">San Francisco, CA</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[12px] mb-1">DESTINATION</div>
                    <div className="text-white font-semibold text-[15px]">San Francisco Airport</div>
                    <div className="text-gray-500 text-[13px]">Terminal 1, SFO</div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Navigation className="w-5 h-5 text-[#00FF88]" />
                </div>
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#00FF88]" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-[14px] mb-0.5">Safety Toolkit</div>
                  <div className="text-gray-500 text-[12px]">Share trip status, call 911, or get help</div>
                </div>
                <button className="text-[#00FF88] text-[14px] font-semibold hover:text-[#00E67A] transition-colors">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
