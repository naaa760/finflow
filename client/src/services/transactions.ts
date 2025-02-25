import { api } from "@/lib/api";

export interface TransactionData {
  amount: number;
  category: string;
  description: string;
  type: "income" | "expense";
  date: string;
}

interface RecurringTransactionData extends TransactionData {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
}

export const transactionService = {
  // Get all transactions
  getAll: async () => {
    const response = await api.get("/transactions");
    return response.data;
  },

  // Create new transaction
  create: async (data: TransactionData) => {
    const response = await api.post("/transactions", {
      ...data,
      date: new Date(data.date).toISOString(),
    });
    return response.data;
  },

  // Update transaction
  update: async (id: string, data: Partial<TransactionData>) => {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  },

  // Delete transaction
  delete: async (id: string) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

  // Add new methods
  createRecurring: async (recurringData: RecurringTransactionData) => {
    const response = await api.post("/transactions/recurring", recurringData);
    return response.data;
  },

  getRecurring: async () => {
    const response = await api.get("/transactions/recurring");
    return response.data;
  },
};
