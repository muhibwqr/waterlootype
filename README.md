# WaterlooType

A typing test web app exclusively for University of Waterloo students, built with Next.js and Supabase.

## Features

- 🔐 Supabase authentication (only @uwaterloo.ca emails)
- ⚡ Real-time typing test with WPM and accuracy tracking
- 🏆 Leaderboard with Diamond/Gold/Bronze badges for top 3
- 📤 Share your achievements
- 🎨 Beautiful, modern UI

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Follow the detailed guide in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
   - Or run the SQL script in `supabase-setup.sql` in your Supabase SQL Editor

3. **Configure environment variables:**
   - Create `.env.local` file:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run locally:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

See [`VERCEL_DEPLOY.md`](./VERCEL_DEPLOY.md) for step-by-step deployment instructions.

**Quick version:**
1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Update Supabase redirect URLs
5. Deploy! 🚀

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Supabase (Authentication & Database)

