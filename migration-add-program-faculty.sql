-- Migration: Add program and faculty columns to existing leaderboard table
-- Run this if you already have a leaderboard table and need to add the new columns

-- Add program and faculty columns (nullable for existing records)
ALTER TABLE leaderboard 
ADD COLUMN IF NOT EXISTS program TEXT,
ADD COLUMN IF NOT EXISTS faculty TEXT;

-- Create an index on faculty for faster faculty leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_faculty ON leaderboard(faculty);

