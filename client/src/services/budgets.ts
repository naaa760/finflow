import { api } from "@/lib/api";

export interface BudgetData {
  category: string;
  amount: number;
  startDate: string;
  endDate: string;
}

export const budgetService = {
  getAll: async () => {
    const response = await api.get("/budgets");
    return response.data;
  },

  create: async (data: BudgetData) => {
    const response = await api.post("/budgets", data);
    return response.data;
  },

  update: async (id: string, data: Partial<BudgetData>) => {
    const response = await api.put(`/budgets/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  },
};
