export interface WeatherData {
  temperature: number;
  precipitation: number;
  condition: string;
}

export interface LocationData {
  name: string;
  season: string;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  season: string;
  description: string;
  created_at: string;
}