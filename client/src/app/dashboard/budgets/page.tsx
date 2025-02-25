"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BudgetsPage() {
  const budgets = [
    {
      id: 1,
      category: "Housing",
      allocated: 2000,
      spent: 1800,
      color: "indigo",
    },
    {
      id: 2,
      category: "Food & Dining",
      allocated: 800,
      spent: 650,
      color: "emerald",
    },
    {
      id: 3,
      category: "Transportation",
      allocated: 400,
      spent: 380,
      color: "amber",
    },
    {
      id: 4,
      category: "Entertainment",
      allocated: 300,
      spent: 275,
      color: "rose",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent backdrop-blur-sm rounded-3xl p-6 border border-[#8B5E34]/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Budget Overview
          </h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Add New Budget
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
            <p className="text-indigo-600 font-medium">Total Budget</p>
            <p className="text-2xl font-bold text-indigo-900">$3,500.00</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
            <p className="text-emerald-600 font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-emerald-900">$3,105.00</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
            <p className="text-amber-600 font-medium">Remaining</p>
            <p className="text-2xl font-bold text-amber-900">$395.00</p>
          </div>
        </div>
      </div>

      {/* Enhanced Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {budgets.map((budget, index) => (
          <motion.div
            key={budget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-[#8B5E34]/20 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {budget.category}
              </h3>
              <span className={`text-${budget.color}-600 font-medium`}>
                {((budget.spent / budget.allocated) * 100).toFixed(1)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    ${budget.spent} spent
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    ${budget.allocated} allocated
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-[#8B5E34]/10 rounded-full overflow-hidden mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(budget.spent / budget.allocated) * 100}%`,
                  }}
                  className="absolute h-full bg-gradient-to-r from-[#8B5E34] to-[#6B4423] rounded-full"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                View Details
              </button>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                Adjust Budget
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Monthly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Monthly Spending Trend
        </h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          {/* Placeholder for chart */}
          <p className="text-gray-500">Chart visualization coming soon...</p>
        </div>
      </motion.div>

      {/* Budget Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
      >
        <h2 className="text-xl font-semibold mb-4">Budget Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-medium">Save on Housing</p>
            <p className="text-sm opacity-90">
              Consider negotiating your rent or refinancing your mortgage
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-medium">Reduce Food Costs</p>
            <p className="text-sm opacity-90">
              Plan meals ahead and buy groceries in bulk
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="font-medium">Transportation Savings</p>
            <p className="text-sm opacity-90">
              Use public transport or carpooling when possible
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
