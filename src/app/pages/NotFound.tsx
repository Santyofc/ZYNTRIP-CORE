import React from 'react';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { StatusBar } from '../components/StatusBar';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          >
            <div className="text-[120px] font-bold mb-4 bg-gradient-to-br from-[#00FF88] to-[#00CC6A] bg-clip-text text-transparent">
              404
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-[24px] font-bold text-white mb-3 tracking-tight">
              Page not found
            </h2>
            <p className="text-gray-400 text-[15px] mb-8 max-w-xs mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Button onClick={() => navigate('/')} size="md">
              <Home className="w-5 h-5" />
              Go to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
