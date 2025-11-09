# Supabase Setup Guide for WaterlooType

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: `waterlootype` (or any name you prefer)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., `US East` or `US West`)
   - **Pricing Plan**: Free tier is fine to start
5. Click "Create new project" (takes ~2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 3: Get Your API Keys

1. Go to **Settings** → **API** (left sidebar)
2. You'll need two values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## Step 4: Configure Authentication

1. Go to **Authentication** → **Settings** (left sidebar)
2. Under **Site URL**, add:
   - `http://localhost:3000` (for local development)
   - Your Vercel URL (e.g., `https://waterlootype.vercel.app`) after deployment
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/**`
   - `https://your-vercel-url.vercel.app/**`
4. Scroll down to **Email Templates** (optional):
   - You can customize the email verification template if you want
   - Make sure "Confirm signup" template is enabled

## Step 5: Set Up Environment Variables

### For Local Development:

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `your-project-id` with your actual Supabase project ID
- `your-anon-key-here` with your actual anon key

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these two variables:

   **Variable 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://your-project-id.supabase.co`
   - **Environments**: Production, Preview, Development (check all)

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: `your-anon-key-here`
   - **Environments**: Production, Preview, Development (check all)

4. Click **Save**

## Step 6: Test the Setup

1. Run locally: `npm run dev`
2. Try signing up with a test @uwaterloo.ca email
3. Check your email for the verification link
4. After verifying, you should be able to use the app

## Important Notes

- **Email Verification**: Supabase sends verification emails automatically. Make sure to check spam folder.
- **Row Level Security (RLS)**: Already configured in the SQL script - users can only insert their own scores, but anyone can read the leaderboard.
- **Free Tier Limits**: 
  - 500MB database storage
  - 2GB bandwidth/month
  - 50,000 monthly active users
  - Should be plenty for a typing test app!

## Troubleshooting

**Issue**: "Invalid API key"
- Double-check you're using the `anon` key, not the `service_role` key
- Make sure there are no extra spaces in your `.env.local` file

**Issue**: "Email not verified"
- Check Supabase dashboard → Authentication → Users
- You can manually verify users there if needed for testing

**Issue**: "RLS policy violation"
- Make sure you ran the SQL script completely
- Check Authentication → Policies to see if policies exist

**Issue**: Can't sign up
- Make sure email ends with `@uwaterloo.ca`
- Check Supabase logs: Dashboard → Logs → Auth Logs

## Security Checklist

✅ Only @uwaterloo.ca emails allowed (client-side validation)  
✅ Email verification required  
✅ RLS policies enabled  
✅ Users can only insert their own scores  
✅ Leaderboard is publicly readable (by design)  

## Next Steps

Once Supabase is set up:
1. Deploy to Vercel (connect your GitHub repo)
2. Add environment variables in Vercel
3. Update Supabase redirect URLs with your Vercel domain
4. Test the full flow!

