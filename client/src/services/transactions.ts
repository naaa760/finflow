import { api } from "@/lib/api";
import { ReactNode } from "react";

export interface Transaction {
  id: string;
  name: ReactNode;
  amount: number;
  category: string;
  description: string;
  type: "income" | "expense";
  date: string;
  icon?: string;
}

export interface RecurringTransactionData {
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
  date: string;
}

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    try {
      const response = await api.get("/api/transactions");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      return [];
    }
  },

  create: async (data: Omit<Transaction, "id">): Promise<Transaction> => {
    const response = await api.post("/api/transactions", data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Transaction>
  ): Promise<Transaction> => {
    const response = await api.put(`/api/transactions/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/transactions/${id}`);
  },

  createRecurring: async (data: RecurringTransactionData) => {
    const response = await api.post("/api/transactions/recurring", data);
    return response.data;
  },

  getRecurring: async () => {
    const response = await api.get("/transactions/recurring");
    return response.data;
  },
};
