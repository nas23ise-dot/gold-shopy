'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
  name: string;
  email: string;
  phone?: string;
  token?: string;
  tokenExpiry?: number; // Timestamp when token expires
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  setRedirectUrl: (url: string) => void;
  getRedirectUrl: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to refresh token - defined before useEffect to avoid scope issues
  const refreshToken = async (token: string) => {
    try {
      const response = await authApi.rememberMeLogin(token);
      return {
        name: response.name,
        email: response.email,
        phone: response.phone,
        token: response.token,
        tokenExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('redirectUrl');
  };

  // Set redirect URL
  const setRedirectUrl = (url: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('redirectUrl', url);
    }
  };

  // Get redirect URL
  const getRedirectUrl = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('redirectUrl');
    }
    return null;
  };

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        
        // Check if token is expired
        if (userData.tokenExpiry && userData.tokenExpiry < Date.now()) {
          // Token is expired, try to refresh it
          if (userData.token) {
            refreshToken(userData.token)
              .then(newUserData => {
                setUser(newUserData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(newUserData));
              })
              .catch(() => {
                // If refresh fails, logout user
                logout();
              });
          } else {
            // No token available, logout
            logout();
          }
        } else {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (e) {
        // If there's an error parsing, remove the invalid data
        localStorage.removeItem('user');
      }
    }
    // Removed default user auto-login for security
  }, []);

  const login = (userData: User) => {
    // Add token expiry time (30 days from now)
    const userDataWithExpiry = {
      ...userData,
      tokenExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    
    setUser(userDataWithExpiry);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userDataWithExpiry));
    
    // Dispatch a custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: userDataWithExpiry }));
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      const response = await authApi.register({ name, email, password, phone });
      // Automatically log in after registration
      login({
        name: response.name,
        email: response.email,
        phone: response.phone,
        token: response.token
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      login({
        name: response.name,
        email: response.email,
        phone: response.phone,
        token: response.token
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginWithGoogle = () => {
    // Store current URL as redirect URL before Google OAuth, but ensure we use the Render frontend URL
    if (typeof window !== 'undefined') {
      // Get the current path but use the Render frontend URL as base
      const currentPath = window.location.pathname + window.location.search;
      
      // Only store redirect URL if it's not one of the auth pages
      if (currentPath !== '/auth/signin' && currentPath !== '/auth/signup') {
        // Use the Render frontend URL as the base for redirect
        const frontendUrl = typeof window !== 'undefined' 
          ? (process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://gold-shopy-frontend.onrender.com')
          : 'https://gold-shopy-frontend.onrender.com';
        
        const fullRedirectUrl = frontendUrl + currentPath;
        console.log('Setting redirect URL:', fullRedirectUrl); // Debug log
        setRedirectUrl(fullRedirectUrl);
      } else {
        // For auth pages, redirect to home after login
        const frontendUrl = typeof window !== 'undefined' 
          ? (process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://gold-shopy-frontend.onrender.com')
          : 'https://gold-shopy-frontend.onrender.com';
        
        console.log('Setting redirect URL to home'); // Debug log
        setRedirectUrl(frontendUrl + '/');
      }
    }
    
    // Redirect to Google OAuth endpoint
    const backendUrl = typeof window !== 'undefined'
      ? (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')
      : 'http://localhost:5000';
    window.location.href = `${backendUrl}/api/users/auth/google`;
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, register, loginUser, loginWithGoogle, setRedirectUrl, getRedirectUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};