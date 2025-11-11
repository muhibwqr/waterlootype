export interface LeaderboardEntry {
  id: string
  user_id?: string | null
  email?: string | null
  program?: string | null
  faculty?: string | null
  wpm: number
  accuracy: number
  created_at: string
  rank?: number
}

export interface FacultyEntry {
  faculty: string
  avgWpm: number
  count: number
  rank?: number
}

