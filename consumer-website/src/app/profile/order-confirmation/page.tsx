'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

const OrderConfirmationPage = () => {
  const [orderData, setOrderData] = useState<any>(null);

  // Get order data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOrder = localStorage.getItem('lastOrder');
      if (storedOrder) {
        try {
          const parsedOrder = JSON.parse(storedOrder);
          setOrderData(parsedOrder);
          // Clear the order data after displaying it
          localStorage.removeItem('lastOrder');
        } catch (e) {
          console.error('Error parsing order data:', e);
        }
      }
    }
  }, []);

  if (!orderData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your order...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">Thank you for your purchase. Your order has been received.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center mb-2">
                  <Package className="w-5 h-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Order ID</h3>
                </div>
                <p className="text-amber-600 font-medium">{orderData.orderNumber || orderData._id}</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center mb-2">
                  <CreditCard className="w-5 h-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Order Date</h3>
                </div>
                <p className="text-amber-600 font-medium">
                  {orderData.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center mb-2">
                  <Truck className="w-5 h-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Total Amount</h3>
                </div>
                <p className="text-amber-600 font-medium">₹{(orderData.totalAmount || 0).toLocaleString()}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg mb-8">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Order Items</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {orderData.items && orderData.items.map((item: any) => (
                    <div key={item.id || item.productId} className="flex items-center">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{(item.price || 0).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {orderData.shippingAddress && (
              <div className="border border-gray-200 rounded-lg mb-8">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-900">{orderData.shippingAddress.name}</p>
                  <p className="text-gray-600">{orderData.shippingAddress.address}</p>
                  <p className="text-gray-600">
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">{orderData.shippingAddress.country}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/profile/orders" 
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-center"
              >
                View Order Status
              </Link>
              <Link 
                href="/collections" 
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OrderConfirmationPage;