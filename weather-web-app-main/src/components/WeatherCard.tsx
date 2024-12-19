import React from 'react';
import { Cloud, Droplets, ThermometerSun } from 'lucide-react';

interface WeatherCardProps {
  temperature: number;
  precipitation: number;
  condition: string;
  location: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  precipitation,
  condition,
  location,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{location}</h2>
        <Cloud className="w-8 h-8 text-blue-500" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ThermometerSun className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-gray-600">Temperature</span>
          </div>
          <span className="text-lg font-medium">{temperature}°C</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplets className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-gray-600">Precipitation</span>
          </div>
          <span className="text-lg font-medium">{precipitation}%</span>
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-gray-700 text-center">{condition}</p>
        </div>
      </div>
    </div>
  );
};