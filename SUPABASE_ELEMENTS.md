# Supabase Elements Reference

## Database Table: `leaderboard`

### Table Name
```
leaderboard
```

### Column Names
| Column Name | Type | Required | Description |
|------------|------|----------|-------------|
| `id` | UUID | Yes (Primary Key) | Auto-generated unique identifier |
| `user_id` | UUID | Yes | References Supabase auth.users.id |
| `email` | TEXT | Yes | User's email address |
| `program` | TEXT | No (Nullable) | User's program (e.g., "Computer Science") |
| `faculty` | TEXT | No (Nullable) | User's faculty (e.g., "Mathematics", "Engineering") |
| `wpm` | INTEGER | Yes | Words per minute score |
| `accuracy` | DECIMAL(5,2) | Yes | Accuracy percentage (e.g., 95.50) |
| `created_at` | TIMESTAMP WITH TIME ZONE | Auto | Timestamp when record was created |

## Row Level Security (RLS) Policies

### Policy Names
1. **"Anyone can read leaderboard"**
   - Type: SELECT
   - Allows: Anyone to read all leaderboard entries

2. **"Users can insert their own scores"**
   - Type: INSERT
   - Allows: Users to insert their own scores only (validates `auth.uid() = user_id`)

## Indexes

### Index Names
1. **`idx_leaderboard_wpm`**
   - Column: `wpm`
   - Order: DESC (descending)
   - Purpose: Fast leaderboard sorting by WPM

2. **`idx_leaderboard_created_at`**
   - Column: `created_at`
   - Order: DESC (descending)
   - Purpose: Fast sorting by creation date

3. **`idx_leaderboard_faculty`**
   - Column: `faculty`
   - Purpose: Fast faculty aggregation queries

## User Metadata Fields (in auth.users)

These are stored in the `user_metadata` JSON field of the auth.users table:

| Field Name | Type | Description |
|-----------|------|-------------|
| `program` | string | User's program (set during signup) |
| `faculty` | string | User's faculty (set during signup) |

## Authentication Settings

### Required Settings in Supabase Dashboard

1. **Site URL**
   - Format: `https://your-domain.vercel.app` (or `http://localhost:3000` for local)

2. **Redirect URLs**
   - Format: `https://your-domain.vercel.app/**` (or `http://localhost:3000/**` for local)

3. **Email Templates**
   - "Confirm signup" template should be enabled

## Environment Variables

### Required in `.env.local` and Vercel

| Variable Name | Description |
|--------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Quick Reference

### Table Structure
```sql
leaderboard (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  program TEXT,
  faculty TEXT,
  wpm INTEGER NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

### User Metadata Structure
```json
{
  "program": "Computer Science",
  "faculty": "Mathematics"
}
```

### Query Examples

**Get top 5 individuals:**
```sql
SELECT * FROM leaderboard 
ORDER BY wpm DESC 
LIMIT 5;
```

**Get faculty averages:**
```sql
SELECT 
  faculty, 
  AVG(wpm) as avg_wpm, 
  COUNT(*) as count 
FROM leaderboard 
WHERE faculty IS NOT NULL 
GROUP BY faculty 
ORDER BY avg_wpm DESC;
```

## All Element Names Summary

### Database
- **Table:** `leaderboard`
- **Columns:** `id`, `user_id`, `email`, `program`, `faculty`, `wpm`, `accuracy`, `created_at`
- **Indexes:** `idx_leaderboard_wpm`, `idx_leaderboard_created_at`, `idx_leaderboard_faculty`
- **Policies:** `"Anyone can read leaderboard"`, `"Users can insert their own scores"`

### Authentication
- **User Metadata Fields:** `program`, `faculty`
- **Settings:** Site URL, Redirect URLs

### Environment
- **Variables:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`


