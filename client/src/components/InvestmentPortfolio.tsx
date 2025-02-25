"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Investment {
  id: string;
  type: string;
  name: string;
  amount: number;
  currentValue: number;
  purchaseDate: string;
}

interface InvestmentPortfolioProps {
  investments: Investment[];
  onAddInvestment: (investment: Omit<Investment, "id">) => Promise<void>;
}

export default function InvestmentPortfolio({
  investments,
  onAddInvestment,
}: InvestmentPortfolioProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "stocks",
    name: "",
    amount: "",
    currentValue: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  const totalValue = investments.reduce(
    (sum, inv) => sum + inv.currentValue,
    0
  );
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = ((totalValue - totalInvested) / totalInvested) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddInvestment({
        ...formData,
        amount: parseFloat(formData.amount),
        currentValue: parseFloat(formData.currentValue),
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding investment:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Investment Portfolio</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Investment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-gray-500">Total Value</h3>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-gray-500">Total Invested</h3>
          <p className="text-2xl font-bold">${totalInvested.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-gray-500">Total Return</h3>
          <p
            className={`text-2xl font-bold ${
              totalReturn >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalReturn.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Investment List */}
      <div className="space-y-4">
        {investments.map((investment) => (
          <motion.div
            key={investment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{investment.name}</h3>
                <p className="text-sm text-gray-500">{investment.type}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${investment.currentValue.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    investment.currentValue >= investment.amount
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {(
                    ((investment.currentValue - investment.amount) /
                      investment.amount) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Investment Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Investment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                >
                  <option value="stocks">Stocks</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="bonds">Bonds</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Investment
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Value
                </label>
                <input
                  type="number"
                  value={formData.currentValue}
                  onChange={(e) =>
                    setFormData({ ...formData, currentValue: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) =>
                    setFormData({ ...formData, purchaseDate: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Add Investment
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
