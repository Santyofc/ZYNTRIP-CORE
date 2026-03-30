import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Star, ThumbsUp, Heart, X, Zap, Shield, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { StatusBar } from '../components/StatusBar';

const quickFeedback = [
  { id: 1, icon: ThumbsUp, label: 'Great service', color: '#00FF88' },
  { id: 2, icon: Heart, label: 'Friendly', color: '#FF6B9D' },
  { id: 3, icon: Sparkles, label: 'Clean car', color: '#FFD700' },
  { id: 4, icon: Shield, label: 'Safe driving', color: '#00BFFF' },
  { id: 5, icon: Zap, label: 'Fast pickup', color: '#FF6B35' },
  { id: 6, icon: MessageSquare, label: 'Good conversation', color: '#9D4EDD' },
];

const tipOptions = [
  { value: 2, label: '$2' },
  { value: 5, label: '$5' },
  { value: 10, label: '$10' },
  { value: 0, label: 'Custom' },
];

export function RatingScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState<number[]>([]);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const toggleFeedback = (id: number) => {
    setSelectedFeedback((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    navigate('/');
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a1a] to-black px-6 pt-14 pb-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-14 right-4 w-9 h-9 flex items-center justify-center hover:bg-gray-900 rounded-full transition-colors active:scale-95"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-2xl">
              👨‍💼
            </div>
          </motion.div>
          <h1 className="text-[24px] font-bold text-white mb-1 tracking-tight">Rate Michael Chen</h1>
          <p className="text-gray-400 text-[15px]">How was your trip?</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 overflow-y-auto">
        {/* Star Rating */}
        <div className="mb-6">
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform active:scale-90"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star
                  className={`w-14 h-14 transition-colors ${
                    star <= displayRating
                      ? 'fill-[#00FF88] text-[#00FF88]'
                      : 'text-gray-800'
                  }`}
                />
              </motion.button>
            ))}
          </div>
          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-500 text-[13px]"
            >
              {rating === 5 && '⭐ Amazing!'}
              {rating === 4 && '👍 Great'}
              {rating === 3 && '😊 Good'}
              {rating === 2 && '😐 Okay'}
              {rating === 1 && '😞 Not great'}
            </motion.p>
          )}
        </div>

        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Quick Feedback */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-[17px] mb-3">What went well?</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {quickFeedback.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedFeedback.includes(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => toggleFeedback(item.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'bg-[#1a1a1a] border-[#00FF88]'
                          : 'bg-[#0f0f0f] border-gray-800 hover:bg-[#1a1a1a]'
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon
                        className={`w-6 h-6 mx-auto mb-2 transition-colors ${
                          isSelected ? 'text-[#00FF88]' : 'text-gray-500'
                        }`}
                        style={isSelected ? { color: item.color } : {}}
                      />
                      <p
                        className={`text-[13px] font-medium ${
                          isSelected ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {item.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-[17px] mb-3">
                Add a comment <span className="text-gray-600 font-normal">(optional)</span>
              </h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share more details about your experience..."
                maxLength={200}
                className="w-full bg-[#0f0f0f] text-white rounded-2xl p-4 border-2 border-gray-800 focus:border-[#00FF88] focus:outline-none transition-colors resize-none h-28 text-[15px] placeholder:text-gray-600"
              />
              <div className="text-right text-[12px] text-gray-600 mt-1">
                {comment.length}/200
              </div>
            </div>

            {/* Tip Section */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-[17px] mb-3">Add a tip for Michael</h3>
              <div className="grid grid-cols-4 gap-2.5 mb-3">
                {tipOptions.map((tip) => (
                  <motion.button
                    key={tip.value}
                    onClick={() => setSelectedTip(tip.value)}
                    className={`py-4 rounded-2xl font-bold text-[15px] transition-all border-2 ${
                      selectedTip === tip.value
                        ? 'bg-[#00FF88] text-black border-[#00FF88]'
                        : 'bg-[#0f0f0f] text-white border-gray-800 hover:bg-[#1a1a1a]'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tip.label}
                  </motion.button>
                ))}
              </div>
              <p className="text-[12px] text-gray-500 text-center">
                100% of your tip goes directly to your driver
              </p>
            </div>

            {/* Submit Button */}
            <div className="pb-2">
              <Button 
                onClick={handleSubmit}
                disabled={rating === 0}
              >
                {selectedTip && selectedTip > 0 
                  ? `Submit & Tip $${selectedTip}` 
                  : 'Submit rating'}
              </Button>
            </div>
          </motion.div>
        )}

        {rating === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-[15px]">Tap a star above to rate your trip</p>
          </div>
        )}
      </div>
    </div>
  );
}
