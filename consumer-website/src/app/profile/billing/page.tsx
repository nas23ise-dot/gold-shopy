'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Wallet, 
  ArrowLeft, 
  Package, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Edit3
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

interface BillingItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  quantity: number;
}

const BillingPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('billing');

  // Mock billing data
  const billingItems: BillingItem[] = [
    {
      id: 1,
      name: 'Classic Gold Chain Necklace',
      price: 185000,
      image: 'https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Chain',
      category: 'Necklaces',
      material: '22K Gold',
      quantity: 1
    },
    {
      id: 2,
      name: 'Diamond Stud Earrings',
      price: 295000,
      image: 'https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Earrings',
      category: 'Earrings',
      material: 'White Gold',
      quantity: 1
    }
  ];

  const subtotal = billingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100000 ? 0 : 500;
  const tax = subtotal * 0.03;
  const total = subtotal + shipping + tax;

  // Mock billing history
  const billingHistory = [
    {
      id: 'ORD-789456123',
      date: '2023-06-15',
      amount: 125000,
      status: 'paid',
      items: 2
    },
    {
      id: 'ORD-456789123',
      date: '2023-05-22',
      amount: 89000,
      status: 'paid',
      items: 1
    },
    {
      id: 'ORD-123456789',
      date: '2023-04-10',
      amount: 245000,
      status: 'paid',
      items: 3
    }
  ];

  const menuItems = [
    { id: 'billing', label: 'Billing Information', icon: CreditCard },
    { id: 'history', label: 'Billing History', icon: Package },
    { id: 'payment', label: 'Payment Methods', icon: Wallet }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/profile" className="flex items-center text-gray-600 hover:text-amber-600 mr-4">
              <ArrowLeft size={20} className="mr-1" />
              <span>Back to Profile</span>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <CreditCard className="text-amber-600" size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Billing & Payments</h1>
            <p className="text-lg text-gray-600">Manage your billing information and payment methods</p>
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
                    <h2 className="text-xl font-bold text-gray-900">{user?.name || "John Doe"}</h2>
                    <p className="text-gray-600 text-sm">Billing Information</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} className="mr-3" />
                        <span className="flex-grow">{item.label}</span>
                      </button>
                    );
                  })}
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
                {activeTab === 'billing' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
                      <button className="flex items-center text-amber-600 hover:text-amber-700">
                        <Edit3 size={16} className="mr-1" />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <p className="text-gray-900">{user?.name || "John Doe"}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <p className="text-gray-900">{user?.email || "john.doe@example.com"}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <p className="text-gray-900">{user?.phone || "+91 98765 43210"}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <p className="text-gray-900">123 Main Street</p>
                            <p className="text-gray-900">Bangalore, Karnataka 560001</p>
                            <p className="text-gray-900">India</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Order Summary</h3>
                      <div className="border border-gray-200 rounded-lg">
                        <div className="p-4 border-b border-gray-200">
                          <h4 className="font-medium text-gray-900">Order Items</h4>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {billingItems.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <div className="w-16 h-16 flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </div>
                                <div className="ml-4 flex-grow">
                                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                                  <p className="text-sm text-gray-600">{item.material} • {item.category}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax (3%)</span>
                            <span className="font-medium">₹{tax.toLocaleString()}</span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-amber-600">₹{total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>
                    <p className="text-gray-600 mb-6">View your past orders and billing information</p>
                    
                    <div className="space-y-4">
                      {billingHistory.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Package size={20} className="text-amber-600" />
                                <span className="font-semibold text-gray-900">
                                  Order #{order.id}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar size={16} />
                                <span>{new Date(order.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-4">
                              <div>
                                <p className="text-gray-600 text-sm">Items: {order.items}</p>
                                <p className="font-semibold text-gray-900">₹{order.amount.toLocaleString()}</p>
                              </div>
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                Paid
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <Link
                              href={`/profile/orders/${order.id}`}
                              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                            >
                              View Order Details →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'payment' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
                    <p className="text-gray-600 mb-6">Manage your payment options</p>
                    
                    <div className="space-y-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                              <CreditCard className="text-gray-600" size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Credit Card</h3>
                              <p className="text-sm text-gray-600">**** **** **** 1234</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-amber-600 hover:text-amber-700 text-sm">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                              <Wallet className="text-gray-600" size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">PayPal</h3>
                              <p className="text-sm text-gray-600">john.doe@example.com</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-amber-600 hover:text-amber-700 text-sm">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-colors">
                        + Add New Payment Method
                      </button>
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

export default BillingPage;