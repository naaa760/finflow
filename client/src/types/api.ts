export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  type: string;
  name: string;
  amount: number;
  currentValue: number;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string | null;
  category: string;
  status: "in_progress" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface RecurringTransaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  type: "income" | "expense";
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate: string | null;
  lastProcessed: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
