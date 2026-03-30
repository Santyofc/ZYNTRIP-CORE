import React from 'react';
import { useNavigate } from 'react-router';
import { Search, Menu, Clock } from 'lucide-react';
import { MockMap } from '../components/MockMap';
import { SimpleBottomSheet } from '../components/BottomSheet';
import { StatusBar } from '../components/StatusBar';

const savedPlaces = [
  { icon: '🏠', label: 'Home', address: '1234 Market Street', time: '15 min' },
  { icon: '💼', label: 'Work', address: '567 Mission Street', time: '22 min' },
];

const recentTrips = [
  { name: 'Whole Foods Market', address: '399 4th Street', time: 'Today, 2:30 PM' },
  { name: 'San Francisco Airport', address: 'Terminal 2', time: 'Yesterday' },
];

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <StatusBar />
      
      {/* Map Background */}
      <MockMap />

      {/* Top Bar */}
      <div className="absolute top-11 left-0 right-0 z-10 pt-3 px-4">
        <div className="flex items-center justify-between mb-4">
          <button className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all">
            <Menu className="w-5 h-5 text-black" />
          </button>
          <button className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
              A
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <SimpleBottomSheet>
        <div className="px-5 pb-6 pt-4">
          <h2 className="text-[22px] font-bold text-white mb-5 tracking-tight">
            Where to?
          </h2>
          
          {/* Search Bar */}
          <button
            onClick={() => navigate('/destination')}
            className="w-full bg-[#1a1a1a] hover:bg-[#222] text-white rounded-2xl px-4 py-4 flex items-center gap-4 transition-colors mb-6 border border-gray-800"
          >
            <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-[17px] text-gray-400 font-normal">Search destination</span>
          </button>

          {/* Saved Places */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {savedPlaces.map((place, index) => (
              <button
                key={index}
                className="bg-[#1a1a1a] hover:bg-[#222] rounded-2xl p-4 transition-colors border border-gray-800 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{place.icon}</span>
                  <span className="text-white font-semibold text-[15px]">{place.label}</span>
                </div>
                <div className="text-[13px] text-gray-500 truncate">{place.address}</div>
                <div className="flex items-center gap-1 mt-2 text-[12px] text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{place.time}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 mb-5" />

          {/* Recent Trips */}
          <div>
            <h3 className="text-[15px] font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Recent
            </h3>
            <div className="space-y-1">
              {recentTrips.map((trip, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/destination')}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#1a1a1a] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white font-medium text-[15px] mb-0.5">{trip.name}</div>
                    <div className="text-[13px] text-gray-500">{trip.address}</div>
                  </div>
                  <div className="text-[12px] text-gray-600">{trip.time}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SimpleBottomSheet>
    </div>
  );
}
