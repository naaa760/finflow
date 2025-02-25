"use client";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BudgetAnalyticsProps {
  transactions: Array<{
    amount: number;
    date: string;
    type: "income" | "expense";
  }>;
  budgets: Array<{
    category: string;
    amount: number;
    spent: number;
  }>;
}

export default function BudgetAnalytics({
  transactions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  budgets,
}: BudgetAnalyticsProps) {
  const monthlyTrends = useMemo(() => {
    const trends = new Map();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!trends.has(monthKey)) {
        trends.set(monthKey, {
          month: monthKey,
          income: 0,
          expenses: 0,
          savings: 0,
        });
      }

      const monthData = trends.get(monthKey);
      if (transaction.type === "income") {
        monthData.income += transaction.amount;
      } else {
        monthData.expenses += transaction.amount;
      }
      monthData.savings = monthData.income - monthData.expenses;
    });

    return Array.from(trends.values());
  }, [transactions]);

  const chartData: ChartData<"line"> = {
    labels: monthlyTrends.map((t) => t.month),
    datasets: [
      {
        label: "Income",
        data: monthlyTrends.map((t) => t.income),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
      {
        label: "Expenses",
        data: monthlyTrends.map((t) => t.expenses),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
      {
        label: "Savings",
        data: monthlyTrends.map((t) => t.savings),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Trends",
      },
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}
