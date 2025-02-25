"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetChartProps {
  budgets: Array<{
    category: string;
    amount: number;
    spent: number;
  }>;
}

export default function BudgetChart({ budgets }: BudgetChartProps) {
  const data = {
    labels: budgets.map((budget) => budget.category),
    datasets: [
      {
        label: "Budget Allocation",
        data: budgets.map((budget) => budget.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Budget Distribution",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
