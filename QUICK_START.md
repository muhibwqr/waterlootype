# Quick Start Checklist

## Supabase Setup (5 minutes)

- [ ] Create account at [supabase.com](https://supabase.com)
- [ ] Create new project
- [ ] Run `supabase-setup.sql` in SQL Editor
- [ ] Copy **Project URL** from Settings → API
- [ ] Copy **anon key** from Settings → API
- [ ] Update Authentication → Settings:
  - Site URL: `http://localhost:3000`
  - Redirect URLs: `http://localhost:3000/**`

## Local Development

- [ ] Run `npm install`
- [ ] Create `.env.local` with your Supabase credentials
- [ ] Run `npm run dev`
- [ ] Test signup with @uwaterloo.ca email
- [ ] Verify email and test typing test

## Vercel Deployment

- [ ] Push code to GitHub
- [ ] Import to Vercel
- [ ] Add environment variables in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Update Supabase redirect URLs with Vercel domain
- [ ] Deploy and test!

## Files You Need

- `supabase-setup.sql` - Database schema
- `SUPABASE_SETUP.md` - Detailed Supabase guide
- `VERCEL_DEPLOY.md` - Vercel deployment guide

That's it! 🎉

