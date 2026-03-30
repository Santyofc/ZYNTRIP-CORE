import React from 'react';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#00FF88] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page not found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/')}>
          <Home className="w-5 h-5 inline mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
