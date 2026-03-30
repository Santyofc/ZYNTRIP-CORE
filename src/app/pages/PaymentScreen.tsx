import React from 'react';
import { useNavigate } from 'react-router';
import { Check, MapPin, Clock, Navigation as NavigationIcon } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const fareBreakdown = [
  { label: 'Base fare', amount: 4.0 },
  { label: 'Distance (8.5 mi)', amount: 6.8 },
  { label: 'Time (25 min)', amount: 2.5 },
  { label: 'Service fee', amount: 2.2 },
];

export function PaymentScreen() {
  const navigate = useNavigate();
  const total = fareBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black px-6 py-12 text-center">
        <div className="w-20 h-20 bg-[#00FF88] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#00FF88]/30">
          <Check className="w-10 h-10 text-black" strokeWidth={3} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Trip completed!</h1>
        <p className="text-gray-400">We hope you enjoyed your ride</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {/* Trip Summary */}
        <Card className="mb-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 bg-[#00FF88] rounded-full" />
                <div className="w-0.5 h-8 bg-gray-700 mx-auto my-1" />
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Pickup</p>
                  <p className="text-white font-semibold">Current Location</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Destination</p>
                  <p className="text-white font-semibold">San Francisco Airport</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <NavigationIcon className="w-4 h-4" />
                <span>8.5 miles</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>25 min</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Fare Breakdown */}
        <Card className="mb-4">
          <h3 className="text-white font-semibold mb-4">Fare breakdown</h3>
          <div className="space-y-3">
            {fareBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white font-semibold">
                  ${item.amount.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-[#00FF88] font-bold text-xl">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-xl">
              💳
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">Visa •••• 4242</p>
              <p className="text-sm text-gray-400">Payment successful</p>
            </div>
            <Check className="w-5 h-5 text-[#00FF88]" />
          </div>
        </Card>

        <Button onClick={() => navigate('/rating')}>
          Continue
        </Button>
      </div>
    </div>
  );
}
