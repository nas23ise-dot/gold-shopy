# Quick Deployment Checklist

Follow these steps in order:

## ✅ Pre-Deployment Checklist

- [ ] Code is pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Google OAuth credentials ready (if using OAuth)

---

## 🚀 Step 1: Deploy Backend (15-20 minutes)

### Using Render (Easiest)

1. **Sign up**: [render.com](https://render.com) → Sign up with GitHub
2. **New Web Service**: Click "+ New" → "Web Service"
3. **Connect Repo**: Select your `gold-shop` repository
4. **Configure**:
   ```
   Name: gold-shop-backend
   Root Directory: consumer-website/backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```
5. **Set Environment Variables** (see below)
6. **Create Web Service** → Wait for deployment
7. **Copy your backend URL**: `https://your-app.onrender.com`

### Set Up MongoDB Atlas

1. **Sign up**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Free tier (M0)
3. **Database Access**: Create user (save password!)
4. **Network Access**: Allow from anywhere (0.0.0.0/0)
5. **Get Connection String**: 
   - Database → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` and `<dbname>`

### Backend Environment Variables (in Render)

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/goldshop?retryWrites=true&w=majority
JWT_SECRET=generate_random_32_char_string
FRONTEND_URL=https://your-site.netlify.app (update after step 2)
BACKEND_URL=https://your-app.onrender.com
USE_MOCK_DB=false
```

**Generate JWT_SECRET**: Use [random.org](https://www.random.org/strings/) or run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🎨 Step 2: Deploy Frontend (10-15 minutes)

### Using Netlify

1. **Sign up**: [netlify.com](https://netlify.com) → Sign up with GitHub
2. **New Site**: "Add new site" → "Import an existing project"
3. **Connect GitHub**: Select your repository
4. **Build Settings**:
   ```
   Base directory: consumer-website
   Build command: npm run build
   Publish directory: out
   ```
5. **Environment Variables**:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-app.onrender.com
   ```
   (Use the backend URL from Step 1)
6. **Deploy site** → Wait for build
7. **Copy your frontend URL**: `https://random-name-12345.netlify.app`

---

## 🔗 Step 3: Connect Frontend & Backend

1. **Update Backend CORS**:
   - Go to Render dashboard
   - Update environment variable:
     ```
     FRONTEND_URL=https://your-site.netlify.app
     ```
   - Redeploy backend (or it will auto-redeploy)

2. **Test Connection**:
   - Visit your Netlify site
   - Open browser console (F12)
   - Try to sign up/login
   - Check for errors

---

## 🔐 Step 4: Google OAuth (Optional)

1. **Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com)
2. **APIs & Services** → **Credentials**
3. **Edit OAuth Client**:
   - **Authorized redirect URIs**: 
     ```
     https://your-app.onrender.com/api/users/auth/google/callback
     ```
   - **Authorized JavaScript origins**:
     ```
     https://your-app.onrender.com
     ```
4. **Update Backend Environment Variables** (in Render):
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_CALLBACK_URL=https://your-app.onrender.com/api/users/auth/google/callback
   ```

---

## ✅ Verification

Test these features:
- [ ] Homepage loads
- [ ] Products display
- [ ] User registration works
- [ ] User login works
- [ ] Add to cart works
- [ ] Add to wishlist works
- [ ] Google OAuth works (if configured)

---

## 🆘 Troubleshooting

**Backend not working?**
- Check Render logs
- Verify MongoDB connection string
- Check environment variables

**Frontend can't connect to backend?**
- Verify `NEXT_PUBLIC_BACKEND_URL` in Netlify
- Check CORS settings in backend
- Look at browser console errors

**Build fails?**
- Check Netlify build logs
- Try building locally: `cd consumer-website && npm run build`

---

## 📝 URLs to Save

After deployment, save these:
- **Backend URL**: `https://your-app.onrender.com`
- **Frontend URL**: `https://your-site.netlify.app`
- **MongoDB Connection String**: (keep secure!)

---

## 💰 Cost

- **Free**: Render (spins down), Netlify, MongoDB Atlas
- **Always-on**: $7/month (Render) for backend that never sleeps

---

**Need help?** Check the detailed guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

