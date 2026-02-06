-- =============================================
-- DIGICON 4.0 Hackathon Registration Database
-- Supabase PostgreSQL Schema (Simplified Design)
-- =============================================

-- Create team_registrations table (single table design)
CREATE TABLE IF NOT EXISTS team_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name VARCHAR(100) NOT NULL DEFAULT 'DIGICON 4.0',
    department VARCHAR(50) NOT NULL DEFAULT 'ECE',
    
    -- Team Leader
    leader_full_name VARCHAR(255) NOT NULL,
    leader_registration_number VARCHAR(50) NOT NULL,
    leader_gender VARCHAR(10) NOT NULL CHECK (leader_gender IN ('Male', 'Female')),
    leader_section VARCHAR(20) NOT NULL DEFAULT '24S01',
    leader_whatsapp_number VARCHAR(15) NOT NULL,
    leader_hostel_name VARCHAR(100) NOT NULL,
    leader_room_number VARCHAR(20) NOT NULL,
    
    -- Member 1
    member1_full_name VARCHAR(255) NOT NULL,
    member1_registration_number VARCHAR(50) NOT NULL,
    member1_gender VARCHAR(10) NOT NULL CHECK (member1_gender IN ('Male', 'Female')),
    member1_section VARCHAR(20) NOT NULL DEFAULT '24S01',
    member1_whatsapp_number VARCHAR(15) NOT NULL,
    member1_hostel_name VARCHAR(100) NOT NULL,
    member1_room_number VARCHAR(20) NOT NULL,
    
    -- Member 2
    member2_full_name VARCHAR(255) NOT NULL,
    member2_registration_number VARCHAR(50) NOT NULL,
    member2_gender VARCHAR(10) NOT NULL CHECK (member2_gender IN ('Male', 'Female')),
    member2_section VARCHAR(20) NOT NULL DEFAULT '24S01',
    member2_whatsapp_number VARCHAR(15) NOT NULL,
    member2_hostel_name VARCHAR(100) NOT NULL,
    member2_room_number VARCHAR(20) NOT NULL,
    
    -- Member 3
    member3_full_name VARCHAR(255) NOT NULL,
    member3_registration_number VARCHAR(50) NOT NULL,
    member3_gender VARCHAR(10) NOT NULL CHECK (member3_gender IN ('Male', 'Female')),
    member3_section VARCHAR(20) NOT NULL DEFAULT '24S01',
    member3_whatsapp_number VARCHAR(15) NOT NULL,
    member3_hostel_name VARCHAR(100) NOT NULL,
    member3_room_number VARCHAR(20) NOT NULL,
    
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_team_registrations_submitted_at ON team_registrations(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_registrations_leader_reg ON team_registrations(leader_registration_number);

-- Enable Row Level Security (RLS)
ALTER TABLE team_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for anonymous form submissions)
CREATE POLICY "Allow public insert" ON team_registrations
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated users to read all data (for admin dashboard)
CREATE POLICY "Allow authenticated read" ON team_registrations
    FOR SELECT TO authenticated
    USING (true);

-- =============================================
-- IMPORTANT: Run this in Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste & Run
-- =============================================
