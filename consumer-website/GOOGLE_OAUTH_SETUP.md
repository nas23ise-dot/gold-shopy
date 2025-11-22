# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the Gold Shop application.

## Prerequisites

1. A Google account
2. Access to the Google Cloud Console

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" then "New Project"
3. Enter a project name (e.g., "Gold Shop")
4. Click "Create"

### 2. Enable the Google+ API

1. In the Google Cloud Console, make sure your project is selected
2. Navigate to "APIs & Services" > "Library"
3. Search for "Google+ API"
4. Click on "Google+ API" in the search results
5. Click "Enable"

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted to configure the OAuth consent screen:
   - Click "Configure Consent Screen"
   - Select "External" (for testing purposes)
   - Fill in the required fields:
     * App name: Gold Shop
     * User support email: Your email
     * Developer contact information: Your email
   - Click "Save and Continue"
   - Click "Save and Continue" on the Scopes page
   - Add your email to "Test users" if using External user type
   - Click "Save and Continue"
4. Back on the "Create OAuth client ID" page:
   - Application type: Web application
   - Name: Gold Shop
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:5000/api/users/auth/google/callback
     ```
5. Click "Create"
6. Copy the Client ID and Client Secret - you'll need these for the next step

### 4. Configure Environment Variables

1. Open the `.env` file in the `backend` directory
2. Replace the placeholder values with your actual Google OAuth credentials:
   ```env
   GOOGLE_CLIENT_ID=your_actual_client_id_here
   GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
   ```

### 5. Restart the Application

1. Stop both the frontend and backend servers if they're running
2. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
3. Start the frontend server:
   ```bash
   cd consumer-website
   npm run dev
   ```

## Testing Google OAuth

1. Navigate to http://localhost:3000/auth/signin
2. Click the "Google" button
3. You should be redirected to Google's OAuth consent screen
4. After authenticating, you should be redirected back to your application

## Troubleshooting

### Common Issues

1. **invalid_client Error**: 
   - Make sure you've correctly copied the Client ID and Client Secret
   - Ensure there are no extra spaces in the values
   - Verify that the credentials are for a "Web application" type

2. **redirect_uri_mismatch Error**:
   - Make sure the Authorized redirect URIs in Google Cloud Console exactly match:
     ```
     http://localhost:5000/api/users/auth/google/callback
     ```

3. **Access blocked Error**:
   - If using "External" user type, make sure your email is added to "Test users"
   - For production applications, you'll need to submit for verification

### Need Help?

If you continue to experience issues:
1. Double-check all environment variables
2. Verify the Google Cloud Console configuration
3. Check the application logs for more detailed error messages