# Vercel Deployment Checklist

## Before Deploying

✅ **Code is pushed to GitHub**
- All changes committed and pushed

✅ **Environment Variables Set in Vercel**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add these variables for **all environments** (Production, Preview, Development):
  - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

✅ **Supabase Configuration**
- Run `supabase-setup.sql` in Supabase SQL Editor (if not done already)
- Go to Supabase Dashboard → Authentication → Settings
- Add your Vercel URL to:
  - **Site URL**: `https://your-project.vercel.app`
  - **Redirect URLs**: `https://your-project.vercel.app/**`

## Build Configuration

The project uses:
- **Node Version**: 20 (specified in `.nvmrc` and `package.json`)
- **Framework**: Next.js 14 (auto-detected by Vercel)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

## Common Build Issues & Solutions

### Issue: "supabaseUrl is required"
**Solution**: Make sure environment variables are set in Vercel dashboard

### Issue: TypeScript errors
**Solution**: The build should pass TypeScript checks. If not, check the build logs.

### Issue: Module not found
**Solution**: Run `npm install` locally to ensure `package-lock.json` is up to date, then commit and push.

### Issue: Build timeout
**Solution**: Vercel free tier has build timeouts. If this happens, try:
- Removing unnecessary dependencies
- Optimizing the build process

## After Deployment

1. ✅ Visit your Vercel URL
2. ✅ Test signup with @uwaterloo.ca email
3. ✅ Verify email works
4. ✅ Complete a typing test
5. ✅ Check leaderboard appears

## Files Included for Vercel

- ✅ `vercel.json` - Vercel configuration
- ✅ `.nvmrc` - Node version specification
- ✅ `package.json` - Dependencies and scripts
- ✅ `next.config.js` - Next.js configuration

## Need Help?

Check the build logs in Vercel Dashboard → Deployments → [Your Deployment] → Build Logs

