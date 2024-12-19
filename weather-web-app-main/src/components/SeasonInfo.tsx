import React from 'react';
import { Calendar, Sun } from 'lucide-react';

interface SeasonInfoProps {
  season: string;
  description: string;
}

export const SeasonInfo: React.FC<SeasonInfoProps> = ({ season, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Travel Season</h2>
        <Calendar className="w-8 h-8 text-green-500" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Sun className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-lg font-medium text-gray-700">{season}</span>
        </div>
        
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};