import React from 'react';
import { useNavigate } from 'react-router';
import { X, Phone, MessageCircle, Star, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { MockMap } from '../components/MockMap';
import { SimpleBottomSheet } from '../components/BottomSheet';
import { Button } from '../components/Button';
import { StatusBar } from '../components/StatusBar';

export function DriverAssignedScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <StatusBar />
      
      {/* Map with Driver Location */}
      <MockMap showDriver showPickup />

      {/* Top Bar */}
      <div className="absolute top-11 left-0 right-0 z-10 pt-3 px-4">
        <button
          onClick={() => navigate('/')}
          className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* ETA Badge */}
      <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-10">
        <motion.div 
          className="bg-black/90 backdrop-blur-xl rounded-2xl px-5 py-3 border-2 border-[#00FF88] shadow-2xl shadow-[#00FF88]/20"
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <div className="text-center">
            <div className="text-[#00FF88] font-bold text-[28px] leading-none">3</div>
            <div className="text-gray-400 text-[13px] font-medium">minutes</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Sheet with Driver Info */}
      <SimpleBottomSheet>
        <div className="px-5 pb-6 pt-3">
          {/* Status Badge */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="w-2 h-2 bg-[#00FF88] rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="text-[#00FF88] font-semibold text-[14px]">Driver on the way</span>
          </motion.div>

          {/* Driver Card */}
          <motion.div 
            className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Driver Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  👨‍💼
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-[#00FF88] rounded-full px-2 py-0.5 border-2 border-black">
                  <div className="text-[11px] font-bold text-black leading-none">4.9</div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-[18px] mb-1">Michael Chen</h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="text-[13px] text-gray-400 font-medium">4.9</span>
                  <span className="text-[13px] text-gray-600">•</span>
                  <span className="text-[13px] text-gray-400">2,340 trips</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span className="text-[13px] text-[#00FF88] font-medium">Verified driver</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-shrink-0">
                <button className="w-11 h-11 bg-[#252525] hover:bg-[#2a2a2a] rounded-full flex items-center justify-center transition-colors active:scale-95">
                  <MessageCircle className="w-5 h-5 text-[#00FF88]" />
                </button>
                <button className="w-11 h-11 bg-[#252525] hover:bg-[#2a2a2a] rounded-full flex items-center justify-center transition-colors active:scale-95">
                  <Phone className="w-5 h-5 text-[#00FF88]" />
                </button>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
              <div className="text-3xl">🚗</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-[15px] mb-0.5">Toyota Camry</div>
                <div className="text-gray-500 text-[13px]">Gray • Comfort</div>
              </div>
              <div className="bg-gray-900 px-3 py-2 rounded-lg border border-gray-800">
                <div className="text-white font-bold text-[15px] tracking-wider">ABC 1234</div>
              </div>
            </div>
          </motion.div>

          {/* Trip Details */}
          <motion.div 
            className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-[15px] mb-3">Trip details</h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-[14px]">Distance</span>
                <span className="text-white font-semibold text-[14px]">8.5 miles</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-[14px]">Estimated time</span>
                <span className="text-white font-semibold text-[14px]">25 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-[14px]">Fare</span>
                <span className="text-white font-semibold text-[14px]">$18.75</span>
              </div>
              <div className="h-px bg-gray-800 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-[15px]">Est. arrival</span>
                <span className="text-[#00FF88] font-bold text-[15px]">7:45 PM</span>
              </div>
            </div>
          </motion.div>

          <Button onClick={() => navigate('/live-tracking')}>
            Contact Driver
          </Button>
        </div>
      </SimpleBottomSheet>
    </div>
  );
}
