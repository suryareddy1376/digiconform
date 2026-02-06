import { createClient } from '@supabase/supabase-js';

// Use environment variables for production, fallback to hardcoded for development
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hombsmicyuiooaambhwh.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbWJzbWljeXVpb29hYW1iaHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzUyOTgsImV4cCI6MjA4NTk1MTI5OH0.vv6JYOXFkRFYyzoKnBEEYvVVtAcFFYqSsY4Fm8ZPmEA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
