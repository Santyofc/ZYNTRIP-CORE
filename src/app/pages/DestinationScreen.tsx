import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, MapPin, Star, Clock, Navigation as NavIcon } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';

const mockLocations = [
  { 
    id: 1, 
    name: 'San Francisco International Airport', 
    address: 'San Francisco, CA 94128, USA',
    type: 'Airport',
    distance: '12.4 mi',
    time: '23 min',
    rating: 4.5
  },
  { 
    id: 2, 
    name: 'Golden Gate Bridge', 
    address: 'Golden Gate Bridge, San Francisco, CA',
    type: 'Landmark',
    distance: '8.2 mi',
    time: '18 min',
    rating: 4.9
  },
  { 
    id: 3, 
    name: 'Union Square', 
    address: '333 Post St, San Francisco, CA 94108',
    type: 'Shopping',
    distance: '5.1 mi',
    time: '12 min',
    rating: 4.6
  },
  { 
    id: 4, 
    name: 'Fisherman\'s Wharf', 
    address: 'Pier 39, San Francisco, CA 94133',
    type: 'Tourist Attraction',
    distance: '6.3 mi',
    time: '15 min',
    rating: 4.7
  },
  { 
    id: 5, 
    name: 'Oracle Park', 
    address: '24 Willie Mays Plaza, San Francisco, CA',
    type: 'Stadium',
    distance: '4.2 mi',
    time: '11 min',
    rating: 4.8
  },
  { 
    id: 6, 
    name: 'Salesforce Tower', 
    address: '415 Mission St, San Francisco, CA',
    type: 'Office Building',
    distance: '3.8 mi',
    time: '9 min',
    rating: 4.5
  },
];

export function DestinationScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [pickupLocation] = useState('Current Location');

  const filteredLocations = searchQuery
    ? mockLocations.filter(loc =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockLocations;

  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-black pt-11 px-4 pb-4 border-b border-gray-900">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-900 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-[20px] font-bold text-white tracking-tight">Plan your trip</h1>
        </div>

        {/* Location Inputs */}
        <div className="space-y-3">
          {/* Pickup */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#00FF88] ring-4 ring-[#00FF88]/20" />
              <div className="w-0.5 h-8 bg-gray-800" />
            </div>
            <div className="flex-1 bg-[#1a1a1a] rounded-xl px-4 py-3 border border-gray-800">
              <div className="text-white font-medium text-[15px]">{pickupLocation}</div>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gray-700 flex-shrink-0 ml-0" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Where to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white rounded-xl px-4 py-3 border border-gray-800 focus:border-[#00FF88] focus:outline-none transition-colors text-[15px] placeholder:text-gray-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery && (
          <div className="px-4 py-3 border-b border-gray-900">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Search className="w-4 h-4" />
              <span>Search results for "{searchQuery}"</span>
            </div>
          </div>
        )}

        <div className="px-4 py-3">
          {!searchQuery && (
            <h3 className="text-[13px] font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Suggested Destinations
            </h3>
          )}
          
          <div className="space-y-0.5">
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => navigate('/ride-confirmation')}
                className="w-full flex items-start gap-4 p-3 rounded-xl hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium text-[15px] mb-1">{location.name}</div>
                  <div className="text-[13px] text-gray-500 mb-2">{location.address}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[12px] text-gray-600">
                      <NavIcon className="w-3 h-3" />
                      <span>{location.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{location.time}</span>
                    </div>
                    {location.rating && (
                      <div className="flex items-center gap-1 text-[12px] text-gray-600">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span>{location.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {filteredLocations.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="text-gray-600 text-[15px]">No results found</div>
            <div className="text-gray-700 text-[13px] mt-1">Try a different search term</div>
          </div>
        )}
      </div>
    </div>
  );
}
