# Deploying Gold Shop Consumer Website to Netlify

This guide explains how to deploy the Gold Shop consumer website to Netlify.

## Prerequisites

1. A Netlify account (free at [netlify.com](https://netlify.com))
2. This repository connected to your Netlify account

## Deployment Steps

1. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your Git provider (GitHub, GitLab, or Bitbucket)
   - Select this repository

2. **Configure Build Settings**
   - Base directory: `consumer-website`
   - Build command: `npm run build`
   - Publish directory: `.next/static`

3. **Add Environment Variables**
   - Go to Site settings > Build & deploy > Environment
   - Add the following variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
     NEXT_PUBLIC_SITE_NAME=Gold Shop
     NEXT_PUBLIC_SITE_DESCRIPTION=Premium Gold and Diamond Jewelry Store
     ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be available at the provided Netlify URL

## Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Follow the DNS configuration instructions

## Troubleshooting

If you encounter issues:
1. Check that all environment variables are correctly set
2. Verify the build command runs locally: `cd consumer-website && npm run build`
3. Check the Netlify build logs for specific error messages

For more detailed deployment instructions, see [DEPLOYMENT_NETLIFY.md](../DEPLOYMENT_NETLIFY.md) in the root directory.