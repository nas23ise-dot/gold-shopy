# Complete Deployment Guide - Gold Shop

This guide will walk you through deploying both the **Backend API** and **Consumer Website** from scratch.

## Overview

- **Backend API**: Node.js/Express server (deploy to Render, Railway, or Heroku)
- **Frontend**: Next.js static site (deploy to Netlify)

---

## Part 1: Deploy Backend API

### Option A: Render (Recommended - Free Tier Available)

#### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Verify your email

#### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository (or use public repo)
3. Configure the service:
   - **Name**: `gold-shop-backend`
   - **Root Directory**: `consumer-website/backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid)

#### Step 3: Set Environment Variables
In Render dashboard, go to **Environment** tab and add:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_very_secure_random_string_here_min_32_chars
FRONTEND_URL=https://your-netlify-site.netlify.app
BACKEND_URL=https://your-backend-name.onrender.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-name.onrender.com/api/users/auth/google/callback
USE_MOCK_DB=false
```

**Important Notes:**
- Generate a strong `JWT_SECRET` (use: `openssl rand -base64 32` or [random.org](https://www.random.org/strings/))
- Replace `your-backend-name.onrender.com` with your actual Render URL
- We'll set up MongoDB next

#### Step 4: Set Up MongoDB (MongoDB Atlas - Free)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (choose free tier)
4. Create database user:
   - Go to **Database Access** → **Add New Database User**
   - Username: `goldshop` (or your choice)
   - Password: Generate secure password (save it!)
   - Database User Privileges: **Read and write to any database**
5. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0) for development
6. Get connection string:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `goldshop`
   - Example: `mongodb+srv://goldshop:yourpassword@cluster0.xxxxx.mongodb.net/goldshop?retryWrites=true&w=majority`
7. Add this connection string to Render environment variables as `MONGODB_URI`

#### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your backend will be available at: `https://your-backend-name.onrender.com`
4. Test it: Visit `https://your-backend-name.onrender.com` - should see API status

---

### Option B: Railway (Alternative)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add service → Select `consumer-website/backend` directory
6. Set environment variables (same as Render)
7. Railway auto-detects Node.js and deploys
8. Get your URL from Railway dashboard

---

### Option C: Heroku (Alternative)

1. Install Heroku CLI: [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create gold-shop-backend`
4. Set config vars:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   # ... add all other variables
   ```
5. Deploy: `git push heroku main`
6. Your backend: `https://gold-shop-backend.herokuapp.com`

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Prepare Your Code

1. Make sure your code is pushed to GitHub
2. Build locally to test (optional):
   ```bash
   cd consumer-website
   npm install
   npm run build
   ```

### Step 2: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub (recommended)
3. Complete email verification

### Step 3: Deploy from GitHub

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your repositories
4. Select your `gold-shop` repository

### Step 4: Configure Build Settings

In Netlify build settings:

- **Base directory**: `consumer-website`
- **Build command**: `npm run build`
- **Publish directory**: `out` (or `.next/static` if using static export)

**Note**: Your `next.config.ts` already has `output: 'export'`, so publish directory should be `out`

### Step 5: Set Environment Variables

Go to **Site settings** → **Environment variables** → **Add variable**:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-name.onrender.com
```

**Important**: 
- Replace with your actual backend URL from Render/Railway/Heroku
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser

### Step 6: Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (3-5 minutes)
3. Your site will be available at: `https://random-name-12345.netlify.app`
4. You can change the site name in **Site settings** → **Change site name**

### Step 7: Update Backend CORS Settings

Go back to your backend (Render/Railway/Heroku) and update:

```env
FRONTEND_URL=https://your-netlify-site-name.netlify.app
```

Then redeploy the backend.

---

## Part 3: Configure Google OAuth (Optional)

If you want Google OAuth to work in production:

### Step 1: Update Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Add to **Authorized redirect URIs**:
   ```
   https://your-backend-name.onrender.com/api/users/auth/google/callback
   ```
6. Add to **Authorized JavaScript origins**:
   ```
   https://your-backend-name.onrender.com
   ```
7. Save changes

### Step 2: Update Environment Variables

In your backend hosting service, make sure you have:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-name.onrender.com/api/users/auth/google/callback
```

---

## Part 4: Verify Deployment

### Test Backend
1. Visit: `https://your-backend-name.onrender.com`
   - Should see: `{"message":"Gold Shop Backend API","database":"MongoDB","status":"Running"}`

### Test Frontend
1. Visit: `https://your-netlify-site.netlify.app`
2. Try to:
   - Browse products
   - Sign up / Sign in
   - Add items to cart
   - Check if API calls work (open browser console)

### Common Issues

**Backend not connecting to MongoDB:**
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string has correct password
- Check MongoDB user has read/write permissions

**Frontend can't reach backend:**
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly in Netlify
- Check backend CORS settings include your Netlify URL
- Check browser console for CORS errors

**Build fails:**
- Check Netlify build logs
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

---

## Quick Reference: Environment Variables

### Backend (Render/Railway/Heroku)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/goldshop
JWT_SECRET=your_secure_secret_32_chars_min
FRONTEND_URL=https://your-site.netlify.app
BACKEND_URL=https://your-backend.onrender.com
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/users/auth/google/callback
USE_MOCK_DB=false
```

### Frontend (Netlify)
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

---

## Cost Estimate

- **Render Backend**: Free tier (spins down after 15 min inactivity) or $7/month for always-on
- **MongoDB Atlas**: Free tier (512MB storage)
- **Netlify**: Free tier (100GB bandwidth/month)
- **Total**: $0/month (with free tiers) or $7/month (always-on backend)

---

## Next Steps

1. ✅ Deploy backend to Render/Railway/Heroku
2. ✅ Set up MongoDB Atlas
3. ✅ Deploy frontend to Netlify
4. ✅ Configure environment variables
5. ✅ Test all functionality
6. ✅ Set up custom domain (optional)
7. ✅ Enable Google OAuth (optional)

---

## Support

If you encounter issues:
1. Check build logs in Netlify/Render dashboard
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Ensure backend is running and accessible

