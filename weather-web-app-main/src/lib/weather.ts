import { WeatherData } from './types';
import { WEATHER_CONDITIONS } from './constants';

export function generateDummyWeather(): WeatherData {
  return {
    temperature: Math.floor(Math.random() * 15) + 20, // Random temp between 20-35°C
    precipitation: Math.floor(Math.random() * 100),
    condition: WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)]
  };
}