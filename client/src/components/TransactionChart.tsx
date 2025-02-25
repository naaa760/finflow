"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionChartProps {
  transactions: Array<{
    amount: number;
    type: "income" | "expense";
    date: string;
  }>;
}

export default function TransactionChart({
  transactions,
}: TransactionChartProps) {
  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }

    if (transaction.type === "income") {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expense += transaction.amount;
    }

    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const labels = Object.keys(monthlyData);
  const incomeData = labels.map((month) => monthlyData[month].income);
  const expenseData = labels.map((month) => monthlyData[month].expense);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
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
        text: "Monthly Income vs Expenses",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
