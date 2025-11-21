'use client';

import React from 'react';
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  // Mock data for dashboard cards
  const stats = [
    { name: 'Total Products', value: '142', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { name: 'Sales Today', value: '₹2.4L', change: '+8.2%', icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Customers', value: '1,284', change: '+3.1%', icon: Users, color: 'bg-purple-500' },
    { name: 'Revenue', value: '₹42.6L', change: '+12.4%', icon: DollarSign, color: 'bg-amber-500' },
  ];

  // Mock data for recent activity
  const recentActivity = [
    { id: 1, action: 'New order received', item: 'Gold Chain Necklace', time: '2 min ago', type: 'order' },
    { id: 2, action: 'Product restocked', item: 'Diamond Earrings', time: '24 min ago', type: 'inventory' },
    { id: 3, action: 'New customer registered', item: 'Priya Sharma', time: '1 hour ago', type: 'customer' },
    { id: 4, action: 'Low stock alert', item: 'Silver Bracelet', time: '2 hours ago', type: 'alert' },
    { id: 5, action: 'Payment received', item: 'Platinum Ring', time: '3 hours ago', type: 'payment' },
  ];

  // Mock data for top selling products
  const topProducts = [
    { id: 1, name: 'Classic Gold Chain', sales: 124, revenue: '₹18.5L' },
    { id: 2, name: 'Diamond Solitaire Ring', sales: 89, revenue: '₹24.3L' },
    { id: 3, name: 'Pearl Drop Earrings', sales: 67, revenue: '₹6.2L' },
    { id: 4, name: 'Gold Bangle Set', sales: 54, revenue: '₹14.8L' },
    { id: 5, name: 'Platinum Tennis Bracelet', sales: 42, revenue: '₹19.7L' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.item}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      {activity.type === 'alert' && (
                        <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Top Selling Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units Sold
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.sales}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-amber-600 hover:text-amber-900">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Package className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Product</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <ShoppingCart className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">New Sale</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Users className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Customer</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <TrendingUp className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;