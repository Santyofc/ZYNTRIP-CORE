import React from 'react';
import { useNavigate } from 'react-router';
import { Check, MapPin, Clock, Navigation as NavigationIcon, Download, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { StatusBar } from '../components/StatusBar';

const fareBreakdown = [
  { label: 'Base fare', amount: 4.0 },
  { label: 'Distance (8.5 mi)', amount: 6.8 },
  { label: 'Time (25 min)', amount: 2.5 },
  { label: 'Service fee', amount: 2.2 },
  { label: 'Booking fee', amount: 0.75 },
];

const promoDiscount = -2.50;
const subtotal = fareBreakdown.reduce((sum, item) => sum + item.amount, 0);
const total = subtotal + promoDiscount;

export function PaymentScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <StatusBar />
      
      {/* Header with Success Animation */}
      <div className="bg-gradient-to-b from-[#1a1a1a] to-black px-6 pt-16 pb-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <div className="w-24 h-24 bg-[#00FF88] rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-[#00FF88]/30 relative">
            <motion.div
              className="absolute inset-0 bg-[#00FF88] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <Check className="w-12 h-12 text-black relative z-10" strokeWidth={3} />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-[28px] font-bold text-white mb-2 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Trip completed!
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-[15px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Thanks for riding with us
        </motion.p>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4">
        {/* Trip Route Summary */}
        <motion.div 
          className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-1">
              <div className="w-2.5 h-2.5 bg-[#00FF88] rounded-full" />
              <div className="w-0.5 h-12 bg-gray-800" />
              <MapPin className="w-3.5 h-3.5 text-gray-500" fill="currentColor" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-3">
                <div className="text-gray-500 text-[12px] mb-1">FROM</div>
                <div className="text-white font-semibold text-[15px]">123 Market Street</div>
                <div className="text-gray-500 text-[13px]">San Francisco, CA</div>
              </div>
              <div>
                <div className="text-gray-500 text-[12px] mb-1">TO</div>
                <div className="text-white font-semibold text-[15px]">San Francisco Airport</div>
                <div className="text-gray-500 text-[13px]">Terminal 1, SFO</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-3 border-t border-gray-800 text-[13px]">
            <div className="flex items-center gap-1.5 text-gray-400">
              <NavigationIcon className="w-3.5 h-3.5" />
              <span>8.5 mi</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>25 min</span>
            </div>
            <div className="flex-1 text-right text-gray-500">
              Today, 7:45 PM
            </div>
          </div>
        </motion.div>

        {/* Fare Breakdown */}
        <motion.div 
          className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-[17px]">Fare breakdown</h3>
            <button className="text-[#00FF88] text-[13px] font-semibold hover:text-[#00E67A] transition-colors flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
          </div>
          
          <div className="space-y-3">
            {fareBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400 text-[14px]">{item.label}</span>
                <span className="text-white font-semibold text-[14px]">
                  ${item.amount.toFixed(2)}
                </span>
              </div>
            ))}
            
            {promoDiscount < 0 && (
              <>
                <div className="h-px bg-gray-800 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-[#00FF88] text-[14px] font-medium">Promo discount</span>
                  <span className="text-[#00FF88] font-semibold text-[14px]">
                    ${promoDiscount.toFixed(2)}
                  </span>
                </div>
              </>
            )}
            
            <div className="pt-3 border-t-2 border-gray-700 flex items-center justify-between">
              <span className="text-white font-bold text-[18px]">Total</span>
              <span className="text-[#00FF88] font-bold text-[24px]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div 
          className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
              💳
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-[15px] mb-1">Visa •••• 4242</div>
              <div className="text-[#00FF88] text-[13px] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Payment successful
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-400 text-[13px] font-semibold transition-colors">
              Change
            </button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button variant="secondary" size="md">
            <Download className="w-4 h-4" />
            Download receipt
          </Button>
          
          <Button onClick={() => navigate('/rating')}>
            Rate your trip
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
