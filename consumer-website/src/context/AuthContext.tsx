'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
  name: string;
  email: string;
  phone?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        // If there's an error parsing, remove the invalid data
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, register, loginUser }}>
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