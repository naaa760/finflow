"use client";
import { useState } from "react";
import { transactionService } from "@/services/transactions";
import { suggestCategory } from "@/utils/categorizeTransaction";

interface TransactionFormProps {
  onSuccess: () => void;
}

export default function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await transactionService.create({
        ...formData,
        amount: parseFloat(formData.amount),
        type: formData.type as "expense" | "income",
        name: formData.description,
      });
      setFormData({
        amount: "",
        category: "",
        description: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const handleDescriptionChange = (description: string) => {
    const suggestedCategory = suggestCategory(description);
    setFormData((prev) => ({
      ...prev,
      description,
      category: prev.category || suggestedCategory,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as "income" | "expense",
            })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
