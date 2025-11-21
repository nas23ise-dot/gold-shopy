'use client';

import React, { useState } from 'react';
import { ArrowLeft, Calculator, Wallet, CreditCard } from 'lucide-react';
import Link from 'next/link';

const BuyGoldPage = () => {
  const [amount, setAmount] = useState('');
  const [grams, setGrams] = useState('');
  const [goldRate, setGoldRate] = useState(5200); // Gold rate per gram in INR
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const grams = parseFloat(value) / goldRate;
      setGrams(grams.toFixed(6));
    } else {
      setGrams('');
    }
  };
  
  const handleGramsChange = (value: string) => {
    setGrams(value);
    if (value && !isNaN(parseFloat(value))) {
      const amount = parseFloat(value) * goldRate;
      setAmount(amount.toFixed(2));
    } else {
      setAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/digital-gold"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Digital Gold
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900">Buy Digital Gold</h1>
          <p className="text-gray-600 mt-2">
            Purchase 24K pure gold instantly and add it to your digital savings
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchase Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Purchase Details</h2>
              
              {/* Gold Rate Display */}
              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-amber-800 font-medium">Current Gold Rate</span>
                  <span className="text-amber-800 font-bold text-lg">₹{goldRate.toLocaleString('en-IN')} / gram</span>
                </div>
              </div>
              
              {/* Purchase Options */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gold Weight (grams)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">gm</span>
                    </div>
                    <input
                      type="number"
                      step="0.001"
                      value={grams}
                      onChange={(e) => handleGramsChange(e.target.value)}
                      className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter grams"
                    />
                  </div>
                </div>
                
                {/* Conversion Display */}
                {amount && grams && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-blue-800">You will get</span>
                      <span className="text-blue-800 font-bold">{parseFloat(grams).toFixed(3)} grams</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-blue-800">Value</span>
                      <span className="text-blue-800 font-bold">₹{parseFloat(amount).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
                
                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        paymentMethod === 'upi' 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <CreditCard className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium">UPI</span>
                    </button>
                    
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        paymentMethod === 'card' 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium">Credit/Debit Card</span>
                    </button>
                  </div>
                </div>
                
                {/* Buy Button */}
                <button
                  disabled={!amount || !grams}
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    !amount || !grams
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  Buy Gold
                </button>
              </div>
            </div>
          </div>
          
          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Digital Gold?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-amber-600 mt-0.5">•</div>
                  <p className="ml-2 text-gray-600">24K pure gold with BIS hallmark certification</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-amber-600 mt-0.5">•</div>
                  <p className="ml-2 text-gray-600">No making charges or storage fees</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-amber-600 mt-0.5">•</div>
                  <p className="ml-2 text-gray-600">Instant buying and selling</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-amber-600 mt-0.5">•</div>
                  <p className="ml-2 text-gray-600">Fully insured and securely stored</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      1
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Enter amount or grams you want to buy</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      2
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Choose payment method</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      3
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Complete payment securely</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      4
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Gold gets credited to your account instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyGoldPage;