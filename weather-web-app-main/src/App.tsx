import React, { useState } from 'react';
import { LocationSearch } from './components/LocationSearch';
import { WeatherCard } from './components/WeatherCard';
import { SeasonInfo } from './components/SeasonInfo';
import { Compass } from 'lucide-react';
import { fetchWeatherAndLocation } from './lib/api';
import type { WeatherData, LocationData } from './lib/types';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (locationName: string) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setLocation(null);
    
    try {
      const { weather: weatherData, location: locationData } = await fetchWeatherAndLocation(locationName);
      setWeather(weatherData);
      setLocation(locationData);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Failed to fetch weather data') {
          setError('Unable to fetch weather data. Please check your internet connection and try again.');
        } else {
          setError('Location not found. Please try searching for major cities in Kenya like Nairobi, Mombasa, Kisumu, or Nakuru.');
        }
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Compass className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Weather & Travel Season Advisor
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the perfect time to visit your favorite destinations in Kenya
            with real-time weather updates and seasonal travel insights.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <LocationSearch onSearch={handleSearch} />
          <p className="text-sm text-gray-600">
            Try searching for: Nairobi, Mombasa, Maasai Mara, or Lamu
          </p>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          weather && location && (
            <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
              <WeatherCard
                temperature={weather.temperature}
                precipitation={weather.precipitation}
                condition={weather.condition}
                location={location.name}
              />
              <SeasonInfo
                season={location.season}
                description={location.description}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;