'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

const OrderConfirmationPage = () => {
  // In a real application, this data would come from the order placement process
  const orderData = {
    orderId: 'ORD-789456123',
    orderDate: new Date().toLocaleDateString(),
    totalAmount: 480000,
    items: [
      {
        id: 1,
        name: 'Classic Gold Chain Necklace',
        price: 185000,
        quantity: 1,
        image: 'https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Chain'
      },
      {
        id: 2,
        name: 'Diamond Stud Earrings',
        price: 295000,
        quantity: 1,
        image: 'https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Earrings'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India'
    }
  };

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
                <p className="text-amber-600 font-medium">{orderData.orderId}</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center mb-2">
                  <CreditCard className="w-5 h-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Order Date</h3>
                </div>
                <p className="text-amber-600 font-medium">{orderData.orderDate}</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center mb-2">
                  <Truck className="w-5 h-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Total Amount</h3>
                </div>
                <p className="text-amber-600 font-medium">₹{orderData.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg mb-8">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Order Items</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {orderData.items.map((item) => (
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
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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