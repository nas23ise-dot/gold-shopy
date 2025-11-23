'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Function to decode JWT token
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const parsed = JSON.parse(jsonPayload);
    return parsed;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const GoogleCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, getRedirectUrl } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleGoogleCallback = () => {
      // Get token from URL parameters
      const token = searchParams.get('token');
      const error = searchParams.get('error');
      
      if (error) {
        console.error('Google OAuth error:', error);
        alert('Authentication failed. Please try again.');
        router.push('/auth/signin');
        return;
      }
      
      if (!token) {
        console.error('No token received from Google OAuth');
        alert('Authentication failed. Please try again.');
        router.push('/auth/signin');
        return;
      }
      
      try {
        // Decode the JWT token to get user info
        const payload = decodeToken(token);
        
        if (!payload) {
          throw new Error('Failed to decode token');
        }
        
        // Create user object
        const userData = {
          name: payload.name || payload.email || 'Google User',
          email: payload.email || '',
          token: token,
          tokenExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
        };
        
        // Log in the user
        login(userData);
        
        // Show success message
        setShowSuccess(true);
        
        // Redirect to intended destination or home page after a short delay
        setTimeout(() => {
          const redirectUrl = getRedirectUrl();
          localStorage.removeItem('redirectUrl'); // Clean up redirect URL
          
          if (redirectUrl && redirectUrl !== '/auth/signin' && redirectUrl !== '/auth/signup') {
            window.location.href = redirectUrl;
          } else {
            window.location.href = '/';
          }
        }, 3000);
      } catch (err) {
        console.error('Error processing Google OAuth callback:', err);
        alert('Authentication failed. Please try again.');
        router.push('/auth/signin');
      }
    };
    
    handleGoogleCallback();
  }, [router, searchParams, login, getRedirectUrl]);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created Successfully!</h2>
          <p className="text-gray-600 mb-6">Welcome to Gold Shop. Redirecting to your destination...</p>
          <button
            onClick={() => {
              const redirectUrl = getRedirectUrl();
              localStorage.removeItem('redirectUrl'); // Clean up redirect URL
              
              if (redirectUrl && redirectUrl !== '/auth/signin' && redirectUrl !== '/auth/signup') {
                window.location.href = redirectUrl;
              } else {
                window.location.href = '/';
              }
            }}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors cursor-pointer"
          >
            Continue to Destination
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing Google authentication...</p>
      </div>
    </div>
  );
};

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing Google authentication...</p>
        </div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}