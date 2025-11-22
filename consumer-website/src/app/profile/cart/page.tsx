'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowLeft, Package, CreditCard } from 'lucide-react';
import { updateCartQuantity, removeFromCart } from '@/lib/cartUtils';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useCart } from '@/context/CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  quantity: number;
}

const CartPage = () => {
  const { cartItems, refreshCart, forceRefresh } = useCart();
  
  // Filter out invalid items
  const validCartItems = cartItems.filter(item => 
    item && 
    item.id && 
    item.quantity > 0 && 
    typeof item.price === 'number' && 
    item.price > 0 &&
    item.name && 
    item.name !== 'undefined' &&
    item.name.trim() !== ''
  );
  
  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    await updateCartQuantity(id, newQuantity);
    await forceRefresh(); // Use force refresh to ensure UI updates
  };

  const handleRemoveFromCart = async (id: number) => {
    await removeFromCart(id);
    await forceRefresh(); // Use force refresh to ensure UI updates
  };

  const subtotal = validCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100000 ? 0 : 500;
  const tax = subtotal * 0.03;
  const total = subtotal + shipping + tax;

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
                <ShoppingBag className="text-amber-600" size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Shopping Cart</h1>
            <p className="text-lg text-gray-600">Review and manage your items before checkout</p>
          </div>

          {validCartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Cart Items ({validCartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2>
                
                  <div className="space-y-6">
                    {validCartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-600">{item.material} • {item.category}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          
                            <div className="text-lg font-bold text-amber-600">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3">
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
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-amber-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/collections"
                      className="flex-1 text-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      href="/profile/checkout"
                      className="flex-1 flex items-center justify-center py-3 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      <CreditCard size={20} className="mr-2" />
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3">
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
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-amber-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                
                  <Link 
                    href="/profile/checkout"
                    className="w-full mt-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center"
                  >
                    <Package size={20} className="mr-2" />
                    Place Order
                  </Link>
                
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">Why shop with us?</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        </div>
                        BIS Hallmarked Jewelry
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        </div>
                        Lifetime Maintenance
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        </div>
                        Free Shipping Over ₹1Lakh
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        </div>
                        30-Day Return Policy
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
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
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;