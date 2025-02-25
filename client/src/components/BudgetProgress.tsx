"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface BudgetProgressProps {
  category: string;
  spent: number;
  amount: number;
  onWarning?: (message: string) => void;
}

export default function BudgetProgress({
  category,
  spent,
  amount,
  onWarning,
}: BudgetProgressProps) {
  const percentage = Math.min((spent / amount) * 100, 100);
  const isOverBudget = spent > amount;
  const isNearLimit = percentage >= 80 && percentage < 100;

  useEffect(() => {
    if (isNearLimit && onWarning) {
      onWarning(`Warning: ${category} budget is at ${percentage.toFixed(1)}%`);
    }
  }, [isNearLimit, category, percentage, onWarning]);

  return (
    <div
      className={`p-4 border rounded-lg ${
        isNearLimit ? "border-yellow-500" : ""
      }`}
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium">{category}</span>
        <span className={isOverBudget ? "text-red-600" : "text-green-600"}>
          ${spent.toFixed(2)} / ${amount.toFixed(2)}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${isOverBudget ? "bg-red-500" : "bg-green-500"}`}
        />
      </div>
      <div className="mt-1 text-sm text-gray-500">
        {percentage.toFixed(1)}% used
      </div>
      {isNearLimit && (
        <p className="text-sm text-yellow-600 mt-2">
          Warning: Approaching budget limit
        </p>
      )}
    </div>
  );
}
