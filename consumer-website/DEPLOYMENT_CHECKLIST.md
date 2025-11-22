# Netlify Deployment Checklist

## Pre-deployment Tasks

- [ ] Update Google OAuth redirect URIs in Google Cloud Console
- [ ] Deploy backend API to a hosting service (Heroku, Render, etc.)
- [ ] Update environment variables in Netlify
- [ ] Test build locally
- [ ] Verify all links and functionality

## Google OAuth Configuration

Before deploying, update the Google OAuth credentials in Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Find your OAuth 2.0 client ID
4. Click the pencil icon to edit it
5. Add the following URIs to "Authorized redirect URIs":
   - For development: `http://localhost:5000/api/users/auth/google/callback`
   - For production: `https://your-backend-domain.com/api/users/auth/google/callback` (replace with actual backend domain)
6. Click "Save"

## Backend Deployment

The backend API needs to be deployed to a service that supports Node.js applications:

1. Choose a hosting service (Heroku, Render, Railway, etc.)
2. Deploy the `consumer-website/backend` directory
3. Set the following environment variables:
   ```
   NODE_ENV=production
   PORT=5000 (or as required by the hosting service)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

## Netlify Environment Variables

Set the following environment variables in the Netlify dashboard:

1. Go to Site settings > Build & deploy > Environment
2. Add these variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api (replace with actual backend domain)
   NEXT_PUBLIC_SITE_NAME=Gold Shop
   NEXT_PUBLIC_SITE_DESCRIPTION=Premium Gold and Diamond Jewelry Store
   ```

## Deployment Steps

1. Connect your repository to Netlify
2. Set the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next/static`
3. Add environment variables as specified above
4. Deploy the site
5. Update the placeholder URLs in the code with actual domains:
   - In `backend/config/passport.js`: Update the production callbackURL
   - In `backend/controllers/userController.js`: Update the production frontend URLs
   - In `src/context/AuthContext.tsx`: Update the production backend URL

## Post-deployment Verification

- [ ] Test Google OAuth login
- [ ] Verify all pages load correctly
- [ ] Check that API calls are working
- [ ] Test cart and wishlist functionality
- [ ] Verify responsive design on different devices

## Troubleshooting

If you encounter issues:

1. Check Netlify build logs for errors
2. Verify all environment variables are correctly set
3. Ensure the backend API is accessible
4. Check browser console for JavaScript errors
5. Verify Google OAuth credentials are correct