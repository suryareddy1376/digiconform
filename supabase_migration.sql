-- SQL Migration for Digicon Registration System
-- Run this in Supabase SQL Editor before deploying frontend changes

-- Add team_name column to team_registrations table
ALTER TABLE team_registrations 
ADD COLUMN IF NOT EXISTS team_name TEXT;

-- Optional: Add index for faster querying by team name
CREATE INDEX IF NOT EXISTS idx_team_registrations_team_name 
ON team_registrations (team_name);

-- Enable RLS on the table
ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to delete registrations" ON team_registrations;
DROP POLICY IF EXISTS "Allow authenticated users to select registrations" ON team_registrations;
DROP POLICY IF EXISTS "Allow anyone to insert registrations" ON team_registrations;
DROP POLICY IF EXISTS "Enable insert for everyone" ON team_registrations;
DROP POLICY IF EXISTS "Enable read for authenticated" ON team_registrations;
DROP POLICY IF EXISTS "Allow public insert" ON team_registrations;
DROP POLICY IF EXISTS "Allow authenticated read" ON team_registrations;

-- Policy to allow authenticated users to delete any row (for Reset List feature)
CREATE POLICY "Allow authenticated users to delete registrations"
ON team_registrations
FOR DELETE
TO authenticated
USING (true);

-- Policy to allow authenticated users to select all rows (for Dashboard)
CREATE POLICY "Allow authenticated users to select registrations"
ON team_registrations
FOR SELECT
TO authenticated
USING (true);

-- Policy to allow anyone to insert (for public registration form)
CREATE POLICY "Allow anyone to insert registrations"
ON team_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
