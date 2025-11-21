'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Coins, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Wallet
} from 'lucide-react';
import Link from 'next/link';

const EnrollmentDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock enrollment data
  const enrollment = {
    id: 1,
    schemeName: "Monthly Gold Plan",
    startDate: "2023-06-15",
    endDate: "2024-06-15",
    duration: "12 months",
    monthlyAmount: 5000,
    totalGold: 15, // grams
    targetAmount: 60000,
    status: "active",
    nextPaymentDate: "2023-11-15",
    paymentsMade: 5,
    totalPayments: 12,
    goldAccumulated: 6.25, // grams
    currentValue: 32500 // INR
  };
  
  // Mock payment history
  const paymentHistory = [
    { id: 1, date: "2023-10-15", amount: 5000, status: "completed", goldAccumulated: 1.25 },
    { id: 2, date: "2023-09-15", amount: 5000, status: "completed", goldAccumulated: 1.25 },
    { id: 3, date: "2023-08-15", amount: 5000, status: "completed", goldAccumulated: 1.25 },
    { id: 4, date: "2023-07-15", amount: 5000, status: "completed", goldAccumulated: 1.25 },
    { id: 5, date: "2023-06-15", amount: 5000, status: "completed", goldAccumulated: 1.25 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/gold-scheme"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4"
          >
            <span className="text-sm font-medium">← Back to Gold Schemes</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{enrollment.schemeName}</h1>
              <p className="text-gray-600 mt-1">
                Started on {enrollment.startDate} • Ends on {enrollment.endDate}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                enrollment.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {enrollment.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Coins className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gold Accumulated</p>
                <p className="text-2xl font-bold text-gray-900">{enrollment.goldAccumulated}g</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{enrollment.currentValue.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Payments Made</p>
                <p className="text-2xl font-bold text-gray-900">{enrollment.paymentsMade}/{enrollment.totalPayments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Next Payment</p>
                <p className="text-2xl font-bold text-gray-900">{enrollment.nextPaymentDate}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'payments'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('payments')}
              >
                Payment History
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'benefits'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('benefits')}
              >
                Benefits
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Scheme Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Scheme Name</p>
                      <p className="font-medium">{enrollment.schemeName}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">{enrollment.duration}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Monthly Payment</p>
                      <p className="font-medium">₹{enrollment.monthlyAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Total Gold</p>
                      <p className="font-medium">{enrollment.totalGold} grams</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Target Amount</p>
                      <p className="font-medium">₹{enrollment.targetAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-medium">{enrollment.startDate}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Progress</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {enrollment.paymentsMade} of {enrollment.totalPayments} payments completed
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {Math.round((enrollment.paymentsMade / enrollment.totalPayments) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-amber-600 h-2.5 rounded-full" 
                          style={{ width: `${(enrollment.paymentsMade / enrollment.totalPayments) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Next Steps</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-800">Upcoming Payment</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Your next payment of ₹{enrollment.monthlyAmount.toLocaleString('en-IN')} is due on {enrollment.nextPaymentDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors">
                      Make Payment Now
                    </button>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      View Payment Schedule
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment History Tab */}
            {activeTab === 'payments' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gold Accumulated
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{payment.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.goldAccumulated}g
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Scheme Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 p-2 bg-amber-100 rounded-lg">
                        <Coins className="h-6 w-6 text-amber-600" />
                      </div>
                      <h4 className="ml-4 text-lg font-medium text-gray-900">Pure Gold</h4>
                    </div>
                    <p className="text-gray-600">
                      Receive {enrollment.totalGold} grams of 22K pure gold at the end of your scheme period. 
                      All gold is BIS hallmarked and comes with a certificate of authenticity.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                        <Wallet className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="ml-4 text-lg font-medium text-gray-900">No Making Charges</h4>
                    </div>
                    <p className="text-gray-600">
                      Enjoy your gold without any making charges or additional costs. 
                      The full value of your payments goes toward purchasing pure gold.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="ml-4 text-lg font-medium text-gray-900">Flexible Payments</h4>
                    </div>
                    <p className="text-gray-600">
                      Pay monthly at your convenience. 
                      Set up auto-payments or make manual payments as per your schedule.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="ml-4 text-lg font-medium text-gray-900">Value Growth</h4>
                    </div>
                    <p className="text-gray-600">
                      As gold prices increase, the value of your accumulated gold grows, 
                      providing you with potential appreciation beyond your investment.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDetailsPage;