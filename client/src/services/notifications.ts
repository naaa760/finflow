import { toast } from "react-hot-toast";

export const notificationService = {
  showInvestmentAlert: (
    type: "gain" | "loss",
    investment: string,
    percentage: number
  ) => {
    const message =
      type === "gain"
        ? `${investment} has increased by ${percentage.toFixed(2)}%`
        : `${investment} has decreased by ${percentage.toFixed(2)}%`;

    toast(message, {
      icon: type === "gain" ? "📈" : "📉",
      style: {
        background: type === "gain" ? "#dcfce7" : "#fee2e2",
        color: type === "gain" ? "#166534" : "#991b1b",
        border: `1px solid ${type === "gain" ? "#86efac" : "#fecaca"}`,
      },
    });
  },

  showGoalProgress: (goalName: string, percentage: number) => {
    toast(`${goalName} is ${percentage.toFixed(0)}% complete!`, {
      icon: "🎯",
      style: {
        background: "#dbeafe",
        color: "#1e40af",
        border: "1px solid #93c5fd",
      },
    });
  },

  showBudgetAlert: (category: string, percentage: number) => {
    toast(`${category} budget is at ${percentage.toFixed(0)}% usage`, {
      icon: "⚠️",
      style: {
        background: "#fef3c7",
        color: "#92400e",
        border: "1px solid #fcd34d",
      },
    });
  },
};
