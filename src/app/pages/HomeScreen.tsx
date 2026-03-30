import React from 'react';
import { useNavigate } from 'react-router';
import { Search, Menu, User } from 'lucide-react';
import { MockMap } from '../components/MockMap';
import { BottomSheet } from '../components/BottomSheet';

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Map Background */}
      <MockMap />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <button className="p-3 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800">
            <Menu className="w-6 h-6 text-white" />
          </button>
          <button className="p-3 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800">
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet height="auto">
        <div className="px-6 pb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Good evening, Alex
          </h2>
          
          <button
            onClick={() => navigate('/destination')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl p-4 border border-gray-800 flex items-center gap-4 transition-colors group"
          >
            <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-gray-700 transition-colors">
              <Search className="w-5 h-5 text-[#00FF88]" />
            </div>
            <span className="text-lg text-gray-400">Where to?</span>
          </button>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="bg-gray-900 hover:bg-gray-800 rounded-2xl p-4 border border-gray-800 transition-colors">
              <div className="text-left">
                <div className="text-white font-semibold mb-1">🏠 Home</div>
                <div className="text-sm text-gray-500">123 Main St</div>
              </div>
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 rounded-2xl p-4 border border-gray-800 transition-colors">
              <div className="text-left">
                <div className="text-white font-semibold mb-1">💼 Work</div>
                <div className="text-sm text-gray-500">456 Office Blvd</div>
              </div>
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
