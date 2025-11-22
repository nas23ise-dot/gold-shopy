'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Calendar } from 'lucide-react';
import { orderApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface OrderDetailsClientProps {
  params: {
    id: string;
  };
}

interface Order {
  _id?: string;
  orderNumber?: string;
  items?: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  totalAmount?: number;
  status?: string;
  createdAt?: string;
}

export default function OrderDetailsClient({ params }: OrderDetailsClientProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Use token from AuthContext instead of localStorage
        if (!user || !user.token) {
          router.push('/auth/signin');
          return;
        }
        
        const data = await orderApi.getOrderById(user.token, params.id);
        setOrder(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [params.id, router, user]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link href="/profile/orders" className="flex items-center text-gray-600 hover:text-amber-600 mr-4">
            <ArrowLeft size={20} className="mr-1" />
            <span>Back to Orders</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <Package className="text-amber-600" size={32} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Order Details</h1>
          <p className="text-lg text-gray-600">Order #{order?._id || order?.orderNumber || params.id}</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading order details...</p>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">We couldn't load this order. Showing basic details.</p>
              <div className="inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded">
                Order ID: {params.id}
              </div>
            </div>
          )}

          {!loading && !error && order && (
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Calendar size={16} />
                <span>{formatDate(order.createdAt)}</span>
              </div>

              <div className="space-y-4">
                {(order.items || []).map((item) => (
                  <div key={`${item.productId}-${item.name}`} className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg" />
                      )}
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-600">₹{(order.totalAmount || 0).toLocaleString()}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}