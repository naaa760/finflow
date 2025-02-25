"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
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

interface BudgetForecastProps {
  transactions: Array<{
    amount: number;
    category: string;
    type: "income" | "expense";
    date: string;
  }>;
  recurringTransactions: Array<{
    amount: number;
    type: "income" | "expense";
    frequency: "daily" | "weekly" | "monthly" | "yearly";
  }>;
}

export default function BudgetForecast({
  transactions,
  recurringTransactions,
}: BudgetForecastProps) {
  const forecastData = useMemo(() => {
    // Calculate monthly totals
    const monthlyData = new Map<string, { income: number; expenses: number }>();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { income: 0, expenses: 0 });
      }

      const data = monthlyData.get(monthKey)!;
      if (transaction.type === "income") {
        data.income += transaction.amount;
      } else {
        data.expenses += transaction.amount;
      }
    });

    // Calculate recurring totals
    const recurringMonthly = recurringTransactions.reduce(
      (total, transaction) => {
        const monthlyAmount =
          transaction.amount *
          {
            daily: 30,
            weekly: 4,
            monthly: 1,
            yearly: 1 / 12,
          }[transaction.frequency];

        if (transaction.type === "income") {
          total.income += monthlyAmount;
        } else {
          total.expenses += monthlyAmount;
        }
        return total;
      },
      { income: 0, expenses: 0 }
    );

    // Project next 6 months
    const sortedMonths = Array.from(monthlyData.entries()).sort();
    const lastMonth = sortedMonths[sortedMonths.length - 1];
    const projection = [];

    for (let i = 1; i <= 6; i++) {
      const [year, month] = lastMonth[0].split("-").map(Number);
      const nextDate = new Date(year, month + i - 1);
      const monthKey = `${nextDate.getFullYear()}-${nextDate.getMonth() + 1}`;

      projection.push({
        month: monthKey,
        income: lastMonth[1].income + recurringMonthly.income,
        expenses: lastMonth[1].expenses + recurringMonthly.expenses,
      });
    }

    return {
      historical: Array.from(monthlyData.entries()).map(([month, data]) => ({
        month,
        ...data,
      })),
      projected: projection,
    };
  }, [transactions, recurringTransactions]);

  const chartData: ChartData<"line"> = {
    labels: [
      ...forecastData.historical.map((d) => d.month),
      ...forecastData.projected.map((d) => `${d.month} (Projected)`),
    ],
    datasets: [
      {
        label: "Income",
        data: [
          ...forecastData.historical.map((d) => d.income),
          ...forecastData.projected.map((d) => d.income),
        ],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
      {
        label: "Expenses",
        data: [
          ...forecastData.historical.map((d) => d.expenses),
          ...forecastData.projected.map((d) => d.expenses),
        ],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Budget Forecast</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: "6-Month Forecast",
              },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium mb-2">Projected Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ${forecastData.projected[0].income.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Next Month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium mb-2">Projected Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            ${forecastData.projected[0].expenses.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Next Month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium mb-2">Projected Savings</h3>
          <p className="text-2xl font-bold text-blue-600">
            $
            {(
              forecastData.projected[0].income -
              forecastData.projected[0].expenses
            ).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Next Month</p>
        </motion.div>
      </div>
    </div>
  );
}
