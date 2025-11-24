'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, setRedirectUrl } = useAuth();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if we're still initializing the auth state
    const checkAuthState = () => {
      // Small delay to ensure localStorage is loaded
      setTimeout(() => {
        setIsCheckingAuth(false);
      }, 100);
    };
    
    checkAuthState();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      // Store the current URL as redirect URL
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname + window.location.search;
        setRedirectUrl(currentPath);
      }
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router, setRedirectUrl, isCheckingAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;