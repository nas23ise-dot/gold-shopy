# MongoDB Atlas Setup Guide

This guide explains how to set up MongoDB Atlas for the Gold Shop backend.

## Prerequisites

1. A MongoDB Atlas account (free at [mongodb.com](https://www.mongodb.com/cloud/atlas))
2. This repository cloned locally

## Setup Steps

### 1. Create a MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up for an account
3. Verify your email address

### 2. Create a New Cluster

1. In the MongoDB Atlas dashboard, click "Build a Database"
2. Select the "M0 FREE" tier
3. Choose a cloud provider and region closest to you
4. Give your cluster a name (e.g., "gold-shop-cluster")
5. Click "Create Cluster"

### 3. Configure Database Access

1. In the left sidebar, click "Database Access" under "Security"
2. Click "Add New Database User"
3. Create a new user with:
   - Username: `goldshopuser`
   - Password: Create a strong password and save it securely
   - Permissions: "Atlas admin" (for development) or more restrictive for production
4. Click "Add User"

### 4. Configure Network Access

1. In the left sidebar, click "Network Access" under "Security"
2. Click "Add IP Address"
3. For development, you can add your current IP or "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Your Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password

### 6. Update Your Environment Variables

#### For Local Development

1. Create a `.env` file in the `consumer-website/backend` directory
2. Add the following variables:
   ```
   MONGODB_URI=mongodb+srv://goldshopuser:<password>@<cluster-url>/goldshop?retryWrites=true&w=majority
   USE_MOCK_DB=false
   ```

#### For Render.com Deployment

1. Go to your Render.com dashboard
2. Find your "gold-shopy" service
3. Go to "Environment" in the settings
4. Add or update these environment variables:
   - `MONGODB_PASSWORD`: Your MongoDB user password
   - `USE_MOCK_DB`: false

### 7. Test the Connection

1. Start your backend server locally:
   ```bash
   cd consumer-website/backend
   npm start
   ```
2. Check the console for "Connected to MongoDB" message

## Troubleshooting

### Connection Issues

1. Ensure your IP address is whitelisted in Network Access
2. Verify your username and password are correct
3. Check that your cluster is not paused (free clusters pause after 7 days of inactivity)

### Authentication Errors

1. Make sure you're using the correct database user credentials
2. Ensure the user has appropriate permissions

## Security Best Practices

1. Never commit credentials to version control
2. Use strong, unique passwords
3. Limit IP access to only necessary addresses
4. Regularly rotate credentials
5. Use environment variables for sensitive data