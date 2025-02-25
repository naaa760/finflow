"use client";
import { useState } from "react";
import { transactionService } from "@/services/transactions";

interface RecurringTransactionFormProps {
  onSuccess: () => void;
}

export default function RecurringTransactionForm({
  onSuccess,
}: RecurringTransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    type: "expense" as "income" | "expense",
    frequency: "monthly" as "daily" | "weekly" | "monthly" | "yearly",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await transactionService.createRecurring({
        ...formData,
        amount: parseFloat(formData.amount),
        type: formData.type,
        frequency: formData.frequency,
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating recurring transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Reuse most of TransactionForm fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Frequency
        </label>
        <select
          value={formData.frequency}
          onChange={(e) =>
            setFormData({
              ...formData,
              frequency: e.target.value as
                | "daily"
                | "weekly"
                | "monthly"
                | "yearly",
            })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date (Optional)
        </label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Create Recurring Transaction
      </button>
    </form>
  );
}
