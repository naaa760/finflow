"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string | null;
  category: string;
  status: "in_progress" | "completed" | "failed";
}

interface FinancialGoalsProps {
  goals: FinancialGoal[];
  onAddGoal: (goal: Omit<FinancialGoal, "id" | "status">) => Promise<void>;
  onUpdateGoal: (id: string, amount: number) => Promise<void>;
}

export default function FinancialGoals({
  goals,
  onAddGoal,
  onUpdateGoal,
}: FinancialGoalsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    category: "savings",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddGoal({
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount),
        deadline: formData.deadline || null,
      });
      setShowAddForm(false);
      toast.success("Goal added successfully!");
    } catch (error: unknown) {
      console.error("Failed to add goal:", error);
      toast.error("Failed to add goal");
    }
  };

  const handleContribution = async (goalId: string, amount: string) => {
    try {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) return;
      await onUpdateGoal(goalId, numAmount);
      toast.success("Contribution added!");
    } catch (error: unknown) {
      console.error("Failed to update goal:", error);
      toast.error("Failed to update goal");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Financial Goals</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{goal.name}</h3>
                <p className="text-sm text-gray-500">{goal.category}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  goal.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : goal.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {goal.status.replace("_", " ")}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  ${goal.currentAmount.toFixed(2)} / $
                  {goal.targetAmount.toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    goal.status === "completed" ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (goal.currentAmount / goal.targetAmount) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              {goal.deadline && (
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </p>
              )}
            </div>

            {goal.status === "in_progress" && (
              <div className="mt-4 flex gap-2">
                <input
                  type="number"
                  placeholder="Amount"
                  className="flex-1 rounded-md border border-gray-300 p-2"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleContribution(goal.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    handleContribution(goal.id, input.value);
                    input.value = "";
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Goal Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Financial Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal Name
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
                  <option value="savings">Savings</option>
                  <option value="investment">Investment</option>
                  <option value="debt">Debt Repayment</option>
                  <option value="emergency">Emergency Fund</option>
                  <option value="retirement">Retirement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Amount
                </label>
                <input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAmount: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Amount
                </label>
                <input
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, currentAmount: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Create Goal
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
