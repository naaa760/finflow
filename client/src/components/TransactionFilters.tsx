"use client";
import { useState } from "react";

type FilterType = {
  type?: "income" | "expense";
  category?: string;
  dateRange?: "all" | "today" | "week" | "month" | "year";
};

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterType) => void;
}

export default function TransactionFilters({
  onFilterChange,
}: TransactionFiltersProps) {
  const [filters, setFilters] = useState<{
    type: "income" | "expense" | "";
    category: string;
    dateRange: "all" | "today" | "week" | "month" | "year";
  }>({
    type: "",
    category: "",
    dateRange: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(
      Object.fromEntries(Object.entries(newFilters).filter(([, v]) => v !== ""))
    );
  };

  return (
    <div className="flex gap-4 mb-6">
      <select
        value={filters.type}
        onChange={(e) => handleFilterChange("type", e.target.value)}
        className="rounded-md border border-gray-300 p-2"
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        className="rounded-md border border-gray-300 p-2"
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Salary">Salary</option>
      </select>

      <select
        value={filters.dateRange}
        onChange={(e) => handleFilterChange("dateRange", e.target.value)}
        className="rounded-md border border-gray-300 p-2"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
    </div>
  );
}
