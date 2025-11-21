'use client';

import React, { useState } from 'react';
import { ArrowLeft, Calculator, Wallet, CreditCard, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const SellGoldPage = () => {
  const [balance, setBalance] = useState(12.5); // Gold balance in grams
  const [goldRate, setGoldRate] = useState(5200); // Gold rate per gram in INR
  const [grams, setGrams] = useState('');
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  
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
          
          <h1 className="text-3xl font-bold text-gray-900">Sell Digital Gold</h1>
          <p className="text-gray-600 mt-2">
            Redeem your digital gold for cash instantly
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sell Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sell Details</h2>
              
              {/* Balance Display */}
              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-amber-800 font-medium">Available Balance</span>
                  <span className="text-amber-800 font-bold text-lg">{balance.toFixed(3)} grams</span>
                </div>
              </div>
              
              {/* Sell Options */}
              <div className="space-y-6">
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
                      max={balance}
                      value={grams}
                      onChange={(e) => handleGramsChange(e.target.value)}
                      className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter grams to sell"
                    />
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleGramsChange((balance * 0.25).toString())}
                      className="text-xs text-amber-600 hover:text-amber-800"
                    >
                      25%
                    </button>
                    <button
                      onClick={() => handleGramsChange((balance * 0.5).toString())}
                      className="text-xs text-amber-600 hover:text-amber-800"
                    >
                      50%
                    </button>
                    <button
                      onClick={() => handleGramsChange((balance * 0.75).toString())}
                      className="text-xs text-amber-600 hover:text-amber-800"
                    >
                      75%
                    </button>
                    <button
                      onClick={() => handleGramsChange(balance.toString())}
                      className="text-xs text-amber-600 hover:text-amber-800"
                    >
                      Max
                    </button>
                  </div>
                </div>
                
                {/* Conversion Display */}
                {amount && grams && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-blue-800">You will receive</span>
                      <span className="text-blue-800 font-bold">₹{parseFloat(amount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-blue-800">Gold sold</span>
                      <span className="text-blue-800 font-bold">{parseFloat(grams).toFixed(3)} grams</span>
                    </div>
                  </div>
                )}
                
                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Receive Payment Via</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        paymentMethod === 'bank' 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <Wallet className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium">Bank Transfer</span>
                    </button>
                    
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
                  </div>
                </div>
                
                {/* Bank Details */}
                {paymentMethod === 'bank' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Enter bank account number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>
                )}
                
                {/* Sell Button */}
                <button
                  disabled={!grams || !amount || (paymentMethod === 'bank' && (!bankAccount || !ifscCode))}
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    !grams || !amount || (paymentMethod === 'bank' && (!bankAccount || !ifscCode))
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  Sell Gold
                </button>
              </div>
            </div>
          </div>
          
          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Important Information</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Sell requests are processed within 24 hours</li>
                      <li>Bank transfers may take 1-2 business days</li>
                      <li>Minimum sell amount is 1 gram</li>
                      <li>Standard processing fees apply</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sell Process</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      1
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Enter grams of gold you want to sell</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      2
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Provide bank details or UPI ID</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      3
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Confirm and submit sell request</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      4
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Receive payment in your account</p>
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

export default SellGoldPage;