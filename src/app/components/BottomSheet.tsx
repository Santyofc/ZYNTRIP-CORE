import React from 'react';
import { motion } from 'motion/react';

interface BottomSheetProps {
  children: React.ReactNode;
  height?: string;
}

export function BottomSheet({ children, height = 'auto' }: BottomSheetProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 bg-black rounded-t-3xl border-t border-gray-800 shadow-2xl"
      style={{ height }}
    >
      <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mt-3 mb-4" />
      {children}
    </motion.div>
  );
}
