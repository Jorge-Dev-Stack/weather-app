import { getLocation } from './database';
import type { WeatherData, LocationData } from './types';

const OPENWEATHER_API_KEY = 'fce03f9c00cd394e1329b2762a4e1574';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';

export interface WeatherAndLocationData {
  weather: WeatherData;
  location: LocationData;
}

export async function fetchWeatherAndLocation(locationName: string): Promise<WeatherAndLocationData> {
  try {
    const locationData = await getLocation(locationName);
    
    // Fetch real weather data from OpenWeatherMap
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(locationName)},KE&units=metric&APPID=${OPENWEATHER_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    
    const weatherData = await weatherResponse.json();
    
    return {
      weather: {
        temperature: Math.round(weatherData.main.temp),
        precipitation: weatherData.main.humidity,
        condition: weatherData.weather[0].description
      },
      location: {
        name: locationData.name,
        season: locationData.season,
        description: locationData.description
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}