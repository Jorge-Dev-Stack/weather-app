import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface LocationSearchProps {
  onSearch: (location: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location in Kenya..."
          className="w-full px-4 py-2 pl-10 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1.5 px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};