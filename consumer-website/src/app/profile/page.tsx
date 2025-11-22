'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  Heart, 
  ShoppingBag, 
  Package, 
  CreditCard, 
  Settings, 
  LogOut,
  Edit3,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { getCartCount, getWishlistCount } from '@/lib/cartUtils';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  
  useEffect(() => {
    // Load counts
    setCartCount(getCartCount());
    setWishlistCount(getWishlistCount());
    
    // Set up event listeners for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        setCartCount(getCartCount());
      } else if (e.key === 'wishlist') {
        setWishlistCount(getWishlistCount());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Format the current date as "Month Year" (e.g., "November 2025")
  const getCurrentDateFormatted = () => {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    return `${month} ${year}`;
  };
  
  // Mock additional user data (in a real app, this would come from a database)
  const userData = {
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+91 9876543210",
    address: "123 Main Street, Bangalore, Karnataka 560001",
    memberSince: getCurrentDateFormatted(), // Use current date instead of hardcoded date
    totalOrders: 12,
    wishlistItems: 8
  };

  const handleLogout = () => {
    logout();
    // Redirect to home page
    window.location.href = '/';
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlistCount },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'cart', label: 'My Cart', icon: ShoppingBag, count: cartCount },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Account</h1>
            <p className="text-lg text-gray-600">Manage your profile, orders, and preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <User className="text-amber-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                    <p className="text-gray-600 text-sm">Member since {userData.memberSince}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.id === 'wishlist' ? '/profile/wishlist' : 
                             item.id === 'cart' ? '/profile/cart' : 
                             item.id === 'billing' ? '/profile/billing' : 
                             item.id === 'orders' ? '/profile/orders' : '#'}
                        onClick={() => item.id !== 'wishlist' && item.id !== 'cart' && item.id !== 'billing' && item.id !== 'orders' && setActiveTab(item.id)}
                        className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} className="mr-3" />
                        <span className="flex-grow">{item.label}</span>
                        {item.count !== undefined && item.count > 0 && (
                          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={20} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                      <button className="flex items-center text-amber-600 hover:text-amber-700">
                        <Edit3 size={16} className="mr-1" />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <p className="text-gray-900">{userData.name}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <p className="text-gray-900">{userData.email}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <p className="text-gray-900">{userData.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                            <p className="text-gray-900">{userData.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-amber-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-amber-600">{userData.totalOrders}</div>
                          <div className="text-gray-600">Total Orders</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-amber-600">{wishlistCount}</div>
                          <div className="text-gray-600">Wishlist Items</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-amber-600">₹2,45,000</div>
                          <div className="text-gray-600">Total Spent</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                    <p className="text-gray-600 mb-6">Items you've saved for later</p>
                    
                    <div className="text-center py-12">
                      <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-500 mb-6">Start adding items to your wishlist</p>
                      <Link 
                        href="/collections" 
                        className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Browse Collections
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                    <p className="text-gray-600 mb-6">View your order history and track shipments</p>
                    
                    <div className="text-center py-12">
                      <Package size={64} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
                      <p className="text-gray-500 mb-6">Your orders will appear here once you make a purchase</p>
                      <Link 
                        href="/collections" 
                        className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'cart' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Cart</h2>
                    <p className="text-gray-600 mb-6">Items in your shopping cart</p>
                    
                    <div className="text-center py-12">
                      <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                      <p className="text-gray-500 mb-6">Add items to your cart to continue shopping</p>
                      <Link 
                        href="/collections" 
                        className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Browse Collections
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'payment' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
                    <p className="text-gray-600 mb-6">Manage your payment options</p>
                    
                    <div className="text-center py-12">
                      <CreditCard size={64} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No payment methods saved</h3>
                      <p className="text-gray-500 mb-6">Add a payment method to make checkout faster</p>
                      <button className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                    <p className="text-gray-600 mb-6">Manage your account preferences</p>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive updates about your orders and promotions</p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input type="checkbox" className="sr-only" id="email-notifications" defaultChecked />
                          <label 
                            htmlFor="email-notifications" 
                            className="block w-12 h-6 rounded-full bg-amber-600 cursor-pointer"
                          ></label>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                          <p className="text-sm text-gray-600">Receive text messages about your orders</p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input type="checkbox" className="sr-only" id="sms-notifications" />
                          <label 
                            htmlFor="sms-notifications" 
                            className="block w-12 h-6 rounded-full bg-gray-300 cursor-pointer"
                          ></label>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input type="checkbox" className="sr-only" id="2fa" />
                          <label 
                            htmlFor="2fa" 
                            className="block w-12 h-6 rounded-full bg-gray-300 cursor-pointer"
                          ></label>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;