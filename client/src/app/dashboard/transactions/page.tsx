"use client";
import React from "react";
import { motion } from "framer-motion";

const buttonBaseStyle = `
  relative overflow-hidden
  before:content-[''] before:absolute before:inset-0 
  before:bg-[conic-gradient(from_0deg,rgba(255,255,255,0.5),transparent)]
  before:transition-transform before:duration-500 before:ease-out before:rotate-0
  hover:before:rotate-180
  active:scale-95
  transition-all duration-300
`;

export default function TransactionsPage() {
  const transactions = [
    {
      id: 1,
      name: "Grocery Shopping",
      amount: -156.78,
      date: "2024-02-24",
      category: "Food & Groceries",
      status: "completed",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 4500.0,
      date: "2024-02-23",
      category: "Income",
      status: "completed",
    },
    // Add more transaction data...
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-br from-[#8B5E34]/10 via-[#6B4423]/5 to-transparent backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-[#8B5E34]/20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#4A2F17]">
            Transactions
          </h1>
          <button
            className={`${buttonBaseStyle} bg-gradient-to-r from-[#8B5E34] to-[#6B4423] text-white px-6 py-3 rounded-xl hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            New Transaction
          </button>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="p-3 rounded-xl bg-white/10 border border-[#8B5E34]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E34]/20 transition-all duration-300"
        />
        <select className="p-2 border rounded-lg">
          <option value="">All Categories</option>
          <option value="food">Food & Groceries</option>
          <option value="transport">Transport</option>
          <option value="utilities">Utilities</option>
        </select>
        <input type="date" className="p-2 border rounded-lg" />
        <select className="p-2 border rounded-lg">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white/30 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-[#8B5E34]/20">
        <table className="min-w-full divide-y divide-[#8B5E34]/10">
          <thead className="bg-[#8B5E34]/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8B5E34]/10">
            {transactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ backgroundColor: "rgba(139,94,52,0.05)" }}
                className="transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-semibold ${
                      transaction.amount >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amount >= 0 ? "+" : ""}
                    {transaction.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex justify-between items-center bg-white/30 backdrop-blur-sm px-6 py-4 rounded-2xl border border-[#8B5E34]/20">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">20</span> results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
