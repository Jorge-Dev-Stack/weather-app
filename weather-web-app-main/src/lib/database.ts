import { supabase } from './supabase';
import { INITIAL_LOCATIONS } from './constants';
import type { Location } from './types';

export async function getLocation(locationName: string): Promise<Location> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .ilike('name', `%${locationName}%`)
    .limit(1);

  if (error) {
    console.error('Error fetching location:', error);
    throw new Error('Database error occurred');
  }

  if (!data || data.length === 0) {
    // Find matching location from constants as fallback
    const fallbackLocation = INITIAL_LOCATIONS.find(
      loc => loc.name.toLowerCase().includes(locationName.toLowerCase())
    );

    if (!fallbackLocation) {
      throw new Error('Location not found');
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
}