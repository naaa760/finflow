import api from "./api";

export const budgetService = {
  // Get all budgets
  getAll: async () => {
    const response = await api.get("/budgets");
    return response.data;
  },

  // Create new budget
  create: async (budgetData) => {
    const response = await api.post("/budgets", budgetData);
    return response.data;
  },

  // Update budget spent amount
  updateSpent: async (id, spent) => {
    const response = await api.patch(`/budgets/${id}/spent`, { spent });
    return response.data;
  },
};
