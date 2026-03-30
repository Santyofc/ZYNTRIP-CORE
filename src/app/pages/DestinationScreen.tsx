import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, MapPin, Clock } from 'lucide-react';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

const mockLocations = [
  { id: 1, name: 'San Francisco Airport', address: 'Terminal 1, San Francisco, CA', distance: '12 miles' },
  { id: 2, name: 'Golden Gate Bridge', address: 'Golden Gate Bridge, San Francisco, CA', distance: '8 miles' },
  { id: 3, name: 'Union Square', address: '333 Post St, San Francisco, CA', distance: '5 miles' },
  { id: 4, name: 'Fisherman\'s Wharf', address: 'Pier 39, San Francisco, CA', distance: '6 miles' },
  { id: 5, name: 'AT&T Park', address: '24 Willie Mays Plaza, San Francisco, CA', distance: '4 miles' },
];

export function DestinationScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = searchQuery
    ? mockLocations.filter(loc =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockLocations;

  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-800 p-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-900 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Choose destination</h1>
        </div>

        <Input
          icon={<Search className="w-5 h-5" />}
          placeholder="Search destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Recent & Suggestions */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            RECENT
          </h3>
        </div>

        <div className="space-y-3">
          {filteredLocations.map((location) => (
            <Card key={location.id} onClick={() => navigate('/ride-confirmation')}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-xl">
                  <MapPin className="w-5 h-5 text-[#00FF88]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{location.name}</h4>
                  <p className="text-sm text-gray-400">{location.address}</p>
                  <p className="text-xs text-gray-500 mt-1">{location.distance}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
