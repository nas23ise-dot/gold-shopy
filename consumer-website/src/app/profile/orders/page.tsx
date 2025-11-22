'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Package, Calendar, CreditCard, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { orderApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const OrdersPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([
    {
      _id: '1',
      orderNumber: 'ORD-789456123',
      items: [
        {
          productId: '1',
          name: 'Classic Gold Chain Necklace',
          price: 185000,
          quantity: 1,
          image: 'https://via.placeholder.com/400x400/D4AF37/FFFFFF?text=Gold+Chain'
        },
        {
          productId: '2',
          name: 'Diamond Stud Earrings',
          price: 295000,
          quantity: 1,
          image: 'https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Diamond+Earrings'
        }
      ],
      totalAmount: 480000,
      status: 'delivered',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        phone: '+91 98765 43210'
      },
      paymentMethod: 'Credit Card',
      createdAt: '2023-06-15T10:30:00Z',
      updatedAt: '2023-06-18T14:20:00Z'
    },
    {
      _id: '2',
      orderNumber: 'ORD-456789123',
      items: [
        {
          productId: '3',
          name: 'Rose Gold Bracelet',
          price: 89000,
          quantity: 1,
          image: 'https://via.placeholder.com/400x400/E5E7EB/1F2937?text=Rose+Gold+Bracelet'
        }
      ],
      totalAmount: 89000,
      status: 'processing',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        phone: '+91 98765 43210'
      },
      paymentMethod: 'PayPal',
      createdAt: '2023-06-20T09:15:00Z',
      updatedAt: '2023-06-20T09:15:00Z'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/signin');
          return;
        }

        const response = await orderApi.getUserOrders(token);
        if (Array.isArray(response)) {
          setOrders(response);
        } else if (response.orders) {
          setOrders(response.orders);
        }
      } catch (err: any) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'shipped':
        return <Truck size={20} className="text-blue-500" />;
      case 'processing':
        return <Clock size={20} className="text-yellow-500" />;
      case 'cancelled':
        return <XCircle size={20} className="text-red-500" />;
      default:
        return <Clock size={20} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/profile" className="text-amber-600 hover:text-amber-700">
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile" className="flex items-center text-gray-600 hover:text-amber-600 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">View and track all your orders</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link
              href="/collections"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order._id || order.orderNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Package size={20} className="text-amber-600" />
                        <span className="font-semibold text-gray-900">
                          Order #{order.orderNumber || order._id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Placed on {formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <img
                          src={item.image || 'https://via.placeholder.com/100x100'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-xl font-bold text-amber-600">
                        ₹{order.totalAmount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <CreditCard size={16} />
                      <span>Payment: {order.paymentMethod || 'Not specified'}</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.name}<br />
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                        Phone: {order.shippingAddress.phone}
                      </p>
                    </div>
                  )}

                  {/* View Details Link */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/profile/orders/${order._id || order.orderNumber}`}
                      className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                    >
                      View Order Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

