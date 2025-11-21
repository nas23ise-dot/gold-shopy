# Deploying Gold Shop Admin Panel to Netlify

This guide explains how to deploy the Gold Shop admin panel to Netlify.

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
   - Base directory: `gold-shop-admin`
   - Build command: `npm run build`
   - Publish directory: `.next/static`

3. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be available at the provided Netlify URL

## Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Follow the DNS configuration instructions

## Accessing the Admin Panel

After deployment, you can access the admin panel at your Netlify URL. The default login credentials are:
- Username: admin
- Password: password123

## Troubleshooting

If you encounter issues:
1. Verify the build command runs locally: `cd gold-shop-admin && npm run build`
2. Check the Netlify build logs for specific error messages

For more detailed deployment instructions, see [DEPLOYMENT_NETLIFY.md](../DEPLOYMENT_NETLIFY.md) in the root directory.