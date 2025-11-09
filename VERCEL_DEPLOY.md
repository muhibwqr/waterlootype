# Deploying WaterlooType to Vercel

## Quick Deploy Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables in Vercel**
   - In your Vercel project dashboard
   - Go to **Settings** → **Environment Variables**
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - Select all environments (Production, Preview, Development)
   - Click **Save**

4. **Update Supabase Redirect URLs**
   - Go to Supabase Dashboard → **Authentication** → **Settings**
   - Under **Site URL**, add your Vercel URL: `https://your-project.vercel.app`
   - Under **Redirect URLs**, add: `https://your-project.vercel.app/**`
   - Click **Save**

5. **Redeploy** (if needed)
   - Vercel will auto-deploy on git push
   - Or manually trigger: **Deployments** → **Redeploy**

## Environment Variables Checklist

✅ `NEXT_PUBLIC_SUPABASE_URL`  
✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Both should be set for:
- Production
- Preview  
- Development

## Testing After Deployment

1. Visit your Vercel URL
2. Try signing up with a @uwaterloo.ca email
3. Verify email
4. Complete a typing test
5. Check leaderboard appears

Done! 🎉

