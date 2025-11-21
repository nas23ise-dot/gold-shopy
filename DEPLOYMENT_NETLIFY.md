# Deployment Guide for Gold Shop on Netlify

This guide explains how to deploy the Gold Shop application on Netlify, including the consumer website, admin panel, and backend API.

## Project Structure

The Gold Shop project consists of three main components:

1. **Consumer Website** - Frontend Next.js application (in [consumer-website](./consumer-website))
2. **Admin Panel** - Frontend Next.js application (in [gold-shop-admin](./gold-shop-admin))
3. **Backend API** - Node.js/Express application (in [consumer-website/backend](./consumer-website/backend))

## Deployment Strategy

Since Netlify primarily hosts static sites and serverless functions, we'll need to deploy the applications as follows:

### 1. Consumer Website (Frontend)

The consumer website can be deployed directly to Netlify as a static site.

**Steps:**
1. Connect your repository to Netlify
2. Set the build settings:
   - Build command: `npm run build`
   - Publish directory: `consumer-website/.next/static`
3. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_API_URL` - URL of your deployed backend API
   - `NEXT_PUBLIC_SITE_NAME` - "Gold Shop"
   - `NEXT_PUBLIC_SITE_DESCRIPTION` - "Premium Gold and Diamond Jewelry Store"

### 2. Admin Panel (Frontend)

The admin panel can also be deployed to Netlify as a static site.

**Steps:**
1. Connect your repository to Netlify
2. Set the build settings:
   - Base directory: `gold-shop-admin`
   - Build command: `npm run build`
   - Publish directory: `gold-shop-admin/.next/static`

### 3. Backend API (Node.js Server)

The backend API cannot be deployed directly to Netlify as a traditional server. You have two options:

#### Option A: Deploy to a Node.js Hosting Service
Deploy the backend to a service that supports Node.js applications:
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

**Steps:**
1. Create an account with one of these services
2. Deploy the [consumer-website/backend](./consumer-website/backend) directory
3. Set environment variables as defined in [.env.example](./consumer-website/backend/.env.example)
4. Update the frontend applications to use the deployed backend URL

#### Option B: Convert to Serverless Functions
Convert the Express API to Netlify Functions:
1. Create functions in `consumer-website/netlify/functions`
2. Convert each Express route to a Netlify Function
3. Update the frontend to use the Netlify Functions URL

## Environment Variables

### Consumer Website
Create these environment variables in the Netlify dashboard:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_SITE_NAME=Gold Shop
NEXT_PUBLIC_SITE_DESCRIPTION=Premium Gold and Diamond Jewelry Store
```

### Admin Panel
The admin panel may need similar configuration depending on its API requirements.

### Backend API
When deploying the backend to a hosting service, set these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

## Deployment Steps Summary

1. **Deploy Backend API** to a Node.js hosting service
2. **Update Environment Variables** in Netlify for the consumer website:
   - Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
3. **Deploy Consumer Website** to Netlify:
   - Connect repository
   - Set build settings
4. **Deploy Admin Panel** to Netlify:
   - Connect repository
   - Set build settings with base directory

## Troubleshooting

### Build Issues
- Ensure all dependencies are correctly listed in package.json
- Check that the build command runs without errors locally first

### API Connection Issues
- Verify that the backend URL is correctly set in environment variables
- Ensure CORS is properly configured in the backend
- Check that the backend is accessible from the internet

### Environment Variables Not Loading
- Make sure environment variables prefixed with `NEXT_PUBLIC_` are correctly set in Netlify
- Restart the Netlify build after updating environment variables

## Additional Notes

- The applications are configured to work with static export, which is compatible with Netlify
- The backend uses a mock database by default, which can be useful for testing without MongoDB
- For production, configure a real MongoDB database using MongoDB Atlas or another MongoDB hosting service