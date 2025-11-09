-- Create the leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  program TEXT,
  faculty TEXT,
  wpm INTEGER NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read the leaderboard
CREATE POLICY "Anyone can read leaderboard" ON leaderboard
  FOR SELECT USING (true);

-- Policy: Users can insert their own scores
CREATE POLICY "Users can insert their own scores" ON leaderboard
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create an index on wpm for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_wpm ON leaderboard(wpm DESC);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_leaderboard_created_at ON leaderboard(created_at DESC);

-- Create an index on faculty for faster faculty leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_faculty ON leaderboard(faculty);

