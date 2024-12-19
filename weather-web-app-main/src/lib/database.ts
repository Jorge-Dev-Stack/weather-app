import { supabase } from './supabase';
import { INITIAL_LOCATIONS } from './constants';
import type { Location } from './types';

export async function getLocation(locationName: string): Promise<Location> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .ilike('name', `%${locationName}%`)
      .limit(1);

    if (error) {
      console.error('Database error:', error.message);
      throw new Error('Unable to connect to the database. Please try again later.');
    }

    if (!data || data.length === 0) {
      // Try to find a matching location from constants as fallback
      const fallbackLocation = INITIAL_LOCATIONS.find(
        loc => loc.name.toLowerCase().includes(locationName.toLowerCase())
      );

      if (!fallbackLocation) {
        throw new Error('Location not found. Please check the spelling and try again.');
      }

      // Return fallback data in the same format as database data
      return {
        id: 0,
        name: fallbackLocation.name,
        latitude: fallbackLocation.latitude,
        longitude: fallbackLocation.longitude,
        season: fallbackLocation.season,
        description: fallbackLocation.description,
        created_at: new Date().toISOString()
      };
    }

    return data[0] as Location;
  } catch (error) {
    console.error('Error in getLocation:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}