"use client";
import React from "react";
import { motion } from "framer-motion";

export default function InvestmentsPage() {
  const investments = [
    {
      id: 1,
      name: "Tech Growth Fund",
      value: 12500,
      change: 8.5,
      allocation: 35,
      type: "Stocks",
      color: "blue",
    },
    {
      id: 2,
      name: "S&P 500 ETF",
      value: 8300,
      change: 4.2,
      allocation: 25,
      type: "ETF",
      color: "green",
    },
    {
      id: 3,
      name: "Government Bonds",
      value: 6200,
      change: 1.8,
      allocation: 20,
      type: "Bonds",
      color: "amber",
    },
    {
      id: 4,
      name: "Bitcoin",
      value: 4800,
      change: -2.5,
      allocation: 15,
      type: "Crypto",
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Portfolio Overview */}
      <div className="bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent backdrop-blur-sm rounded-3xl p-6 border border-[#8B5E34]/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Investment Portfolio
          </h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            New Investment
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
            <p className="text-indigo-600 font-medium">Total Portfolio Value</p>
            <p className="text-2xl font-bold text-indigo-900">$31,800.00</p>
            <p className="text-sm text-indigo-600 mt-1">+5.8% All Time</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <p className="text-green-600 font-medium">Monthly Returns</p>
            <p className="text-2xl font-bold text-green-900">+$1,240.00</p>
            <p className="text-sm text-green-600 mt-1">+3.9% This Month</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <p className="text-blue-600 font-medium">Yearly Returns</p>
            <p className="text-2xl font-bold text-blue-900">+$4,580.00</p>
            <p className="text-sm text-blue-600 mt-1">+14.4% This Year</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <p className="text-purple-600 font-medium">Available Cash</p>
            <p className="text-2xl font-bold text-purple-900">$1,500.00</p>
            <p className="text-sm text-purple-600 mt-1">Ready to Invest</p>
          </div>
        </div>
      </div>

      {/* Enhanced Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investments.map((investment, index) => (
          <motion.div
            key={investment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-[#8B5E34]/20 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{investment.name}</h3>
                <p className="text-sm text-gray-500">{investment.type}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${investment.value.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    investment.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {investment.change >= 0 ? "+" : ""}
                  {investment.change}%
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Allocation</span>
                <span>{investment.allocation}%</span>
              </div>
              <div className="relative h-2 bg-[#8B5E34]/10 rounded-full overflow-hidden mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${investment.allocation}%` }}
                  className="absolute h-full bg-gradient-to-r from-[#8B5E34] to-[#6B4423] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-medium">Market Trend</p>
              <p className="text-sm opacity-90">
                Markets showing strong recovery in tech sector
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="font-medium">Opportunity Alert</p>
              <p className="text-sm opacity-90">
                Consider rebalancing portfolio to maintain target allocation
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Performance Chart
          </h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            {/* Placeholder for chart */}
            <p className="text-gray-500">Performance chart coming soon...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
