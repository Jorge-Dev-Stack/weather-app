import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xssgnkpgesugfullrhus.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzc2dua3BnZXN1Z2Z1bGxyaHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NDQ0NzYsImV4cCI6MjA1MDAyMDQ3Nn0.2mwSOXQqmfB5_iwpuqw-fkys8icJS2Lw11EAy9rDKT4';

export const supabase = createClient(supabaseUrl, supabaseKey);