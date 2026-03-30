import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Star, ThumbsUp, Heart, X } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const quickFeedback = [
  { id: 1, icon: ThumbsUp, label: 'Great service' },
  { id: 2, icon: Heart, label: 'Friendly' },
  { id: 3, icon: Star, label: 'Clean car' },
  { id: 4, icon: Star, label: 'Safe driving' },
];

export function RatingScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState<number[]>([]);
  const [comment, setComment] = useState('');

  const toggleFeedback = (id: number) => {
    setSelectedFeedback((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    // In a real app, submit the rating
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black px-6 py-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 p-2 hover:bg-gray-900 rounded-xl transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>
        
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
          👨‍💼
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Rate Michael Chen</h1>
        <p className="text-gray-400">How was your trip?</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {/* Star Rating */}
        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={`w-12 h-12 ${
                  star <= rating
                    ? 'fill-[#00FF88] text-[#00FF88]'
                    : 'text-gray-700'
                }`}
              />
            </button>
          ))}
        </div>

        {rating > 0 && (
          <>
            {/* Quick Feedback */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Quick feedback</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickFeedback.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedFeedback.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleFeedback(item.id)}
                      className={`p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-gray-800 border-[#00FF88]'
                          : 'bg-gray-900 border-gray-800 hover:bg-gray-800'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 ${
                          isSelected ? 'text-[#00FF88]' : 'text-gray-400'
                        }`}
                      />
                      <p
                        className={`text-sm ${
                          isSelected ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {item.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">
                Additional comments (optional)
              </h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share more about your experience..."
                className="w-full bg-gray-900 text-white rounded-2xl p-4 border border-gray-800 focus:border-[#00FF88] focus:outline-none transition-colors resize-none h-32"
              />
            </div>

            {/* Tip Section */}
            <Card className="mb-6">
              <h3 className="text-white font-semibold mb-3">Add a tip</h3>
              <div className="grid grid-cols-4 gap-2">
                {['$2', '$5', '$10', 'Custom'].map((tip) => (
                  <button
                    key={tip}
                    className="py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors"
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </Card>

            <Button onClick={handleSubmit}>
              Submit Rating
            </Button>
          </>
        )}

        {rating === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Select stars above to rate your trip
          </p>
        )}
      </div>
    </div>
  );
}
