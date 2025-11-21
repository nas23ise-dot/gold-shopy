'use client';

import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
  membership: 'Gold' | 'Silver' | 'Bronze' | 'None';
}

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock customer data
  const customers: Customer[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      totalPurchases: 12,
      totalSpent: 1850000,
      lastPurchase: '2023-10-15',
      membership: 'Gold'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya.sharma@email.com',
      address: '456 Park Avenue, Delhi, Delhi 110001',
      totalPurchases: 8,
      totalSpent: 950000,
      lastPurchase: '2023-10-20',
      membership: 'Silver'
    },
    {
      id: 3,
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      email: 'amit.patel@email.com',
      address: '789 Central Road, Bangalore, Karnataka 560001',
      totalPurchases: 5,
      totalSpent: 625000,
      lastPurchase: '2023-09-28',
      membership: 'Silver'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      phone: '+91 98765 43213',
      email: 'sneha.reddy@email.com',
      address: '101 Hill Street, Hyderabad, Telangana 500001',
      totalPurchases: 3,
      totalSpent: 320000,
      lastPurchase: '2023-10-05',
      membership: 'Bronze'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      phone: '+91 98765 43214',
      email: 'vikram.singh@email.com',
      address: '202 Lake View, Chennai, Tamil Nadu 600001',
      totalPurchases: 7,
      totalSpent: 1125000,
      lastPurchase: '2023-10-18',
      membership: 'Gold'
    },
  ];

  const getMembershipColor = (membership: string) => {
    switch (membership) {
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      case 'Bronze':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="mt-1 text-gray-600">Manage your customers and their information</p>
        </div>
        <button className="flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200">
          <Plus className="h-5 w-5 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers by name, phone, or email..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMembershipColor(customer.membership)}`}>
                    {customer.membership} Member
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-amber-600 hover:text-amber-900">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {customer.phone}
                </div>
                {customer.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {customer.email}
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Purchases</p>
                    <p className="text-lg font-medium text-gray-900">{customer.totalPurchases}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Spent</p>
                    <p className="text-lg font-medium text-gray-900">₹{customer.totalSpent.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-500">Last Purchase</p>
                  <p className="text-sm text-gray-900">{customer.lastPurchase}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-200 rounded-lg shadow sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">5</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;