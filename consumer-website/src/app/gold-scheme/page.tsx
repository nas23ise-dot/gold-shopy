'use client';

import React, { useState } from 'react';
import { 
  Target, 
  Calendar, 
  Coins, 
  CheckCircle, 
  ArrowRight, 
  PiggyBank,
  Gift,
  Users
} from 'lucide-react';
import Link from 'next/link';

const GoldSchemePage = () => {
  const [selectedScheme, setSelectedScheme] = useState<number | null>(null);
  
  // Mock gold schemes data
  const schemes = [
    {
      id: 1,
      name: "Monthly Gold Plan",
      duration: "12 months",
      monthlyAmount: 5000,
      totalGold: 15, // grams
      targetAmount: 60000,
      benefits: [
        "15 grams of 22K gold",
        "No making charges",
        "Flexible payment options",
        "Free hallmarked certificate"
      ],
      popular: true
    },
    {
      id: 2,
      name: "Quarterly Gold Plan",
      duration: "8 quarters",
      monthlyAmount: 7500,
      totalGold: 20, // grams
      targetAmount: 60000,
      benefits: [
        "20 grams of 22K gold",
        "No making charges",
        "Free customization",
        "Priority customer support"
      ],
      popular: false
    },
    {
      id: 3,
      name: "Annual Gold Plan",
      duration: "1 year",
      monthlyAmount: 10000,
      totalGold: 25, // grams
      targetAmount: 120000,
      benefits: [
        "25 grams of 22K gold",
        "No making charges",
        "Free jewelry designing",
        "Exclusive member events"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gold Scheme Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Save for your dream jewelry with our flexible gold schemes. Pay monthly and get pure gold at the end of your plan.
          </p>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {schemes.map((scheme) => (
            <div 
              key={scheme.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                selectedScheme === scheme.id 
                  ? 'border-amber-500 ring-2 ring-amber-200' 
                  : 'border-transparent'
              }`}
            >
              {scheme.popular && (
                <div className="bg-amber-500 text-white text-center py-2">
                  <span className="text-sm font-bold">MOST POPULAR</span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{scheme.name}</h2>
                  <Coins className="h-6 w-6 text-amber-600" />
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{scheme.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-bold text-amber-600">₹{scheme.monthlyAmount.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Gold</span>
                    <span className="font-bold">{scheme.totalGold} grams</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Target Amount</span>
                    <span className="font-bold">₹{scheme.targetAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Benefits</h3>
                  <ul className="space-y-2">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => setSelectedScheme(scheme.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    selectedScheme === scheme.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {selectedScheme === scheme.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enrollment Section */}
        {selectedScheme && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enroll in {schemes.find(s => s.id === selectedScheme)?.name}
              </h2>
              <p className="text-gray-600">
                Complete your enrollment to start your gold savings journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Details</h3>
                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-amber-800">Plan Details</span>
                    <span className="text-amber-800 font-medium">
                      {schemes.find(s => s.id === selectedScheme)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-amber-800">Monthly Amount</span>
                    <span className="text-amber-800 font-bold">
                      ₹{schemes.find(s => s.id === selectedScheme)?.monthlyAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-800">Duration</span>
                    <span className="text-amber-800 font-medium">
                      {schemes.find(s => s.id === selectedScheme)?.duration}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500">
                      <option>UPI</option>
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>Net Banking</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors">
                Enroll Now & Start Saving
              </button>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How Our Gold Scheme Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">1. Choose Plan</h3>
              <p className="mt-2 text-sm text-gray-600">
                Select a scheme that fits your budget and goals
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                <PiggyBank className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">2. Make Payments</h3>
              <p className="mt-2 text-sm text-gray-600">
                Pay monthly installments as per your chosen plan
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">3. Track Progress</h3>
              <p className="mt-2 text-sm text-gray-600">
                Monitor your savings and gold accumulation
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                <Gift className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">4. Receive Gold</h3>
              <p className="mt-2 text-sm text-gray-600">
                Get your pure gold at the end of the scheme period
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldSchemePage;