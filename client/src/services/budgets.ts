import { api } from "@/lib/api";

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
}

export const budgetService = {
  getAll: async (): Promise<Budget[]> => {
    try {
      const response = await api.get("/api/budgets");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
      return [];
    }
  },

  create: async (data: Omit<Budget, "id" | "spent">): Promise<Budget> => {
    const response = await api.post("/api/budgets", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Budget>): Promise<Budget> => {
    const response = await api.put(`/api/budgets/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/budgets/${id}`);
  },
};
