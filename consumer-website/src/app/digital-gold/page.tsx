'use client';

import React, { useState } from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  Wallet, 
  Calculator, 
  ArrowUpCircle, 
  ArrowDownCircle,
  History,
  Target
} from 'lucide-react';
import Link from 'next/link';

const DigitalGoldPage = () => {
  const [goldRate, setGoldRate] = useState(5200); // Gold rate per gram in INR
  const [balance, setBalance] = useState(12.5); // Gold balance in grams
  const [investmentValue, setInvestmentValue] = useState(65000); // Current value in INR
  
  // Mock transaction history
  const transactions = [
    { id: 1, type: 'buy', amount: 2.5, value: 13000, date: '2023-10-15', description: 'Monthly investment' },
    { id: 2, type: 'buy', amount: 5, value: 26000, date: '2023-09-15', description: 'Initial deposit' },
    { id: 3, type: 'buy', amount: 5, value: 26000, date: '2023-08-15', description: 'Monthly investment' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Digital Gold Savings
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Invest in 24K pure gold digitally with complete transparency. Buy, sell, and track your gold investments anytime.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Wallet className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900">{balance.toFixed(3)} gm</p>
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
                <p className="text-2xl font-bold text-gray-900">₹{investmentValue.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gold Rate</p>
                <p className="text-2xl font-bold text-gray-900">₹{goldRate}/gm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Buy Gold</h2>
            <p className="text-gray-600 mb-4">
              Add to your digital gold savings with flexible purchase options.
            </p>
            <Link 
              href="/digital-gold/buy"
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ArrowUpCircle className="h-5 w-5 mr-2" />
              Buy Now
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sell Gold</h2>
            <p className="text-gray-600 mb-4">
              Redeem your digital gold for cash instantly.
            </p>
            <Link 
              href="/digital-gold/sell"
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <ArrowDownCircle className="h-5 w-5 mr-2" />
              Sell Now
            </Link>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              <History className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${transaction.type === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {transaction.type === 'buy' ? (
                        <ArrowUpCircle className={`h-5 w-5 ${transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'}`} />
                      ) : (
                        <ArrowDownCircle className={`h-5 w-5 ${transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'}`} />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900 capitalize">
                        {transaction.type} Gold
                      </h3>
                      <p className="text-sm text-gray-500">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.type === 'buy' ? '+' : '-'}{transaction.amount} gm
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{transaction.value.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-400">{transaction.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalGoldPage;