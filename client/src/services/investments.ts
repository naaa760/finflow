import { api } from "@/lib/api";
import { notificationService } from "./notifications";

export interface InvestmentData {
  type: string;
  amount: number;
  name: string;
  purchaseDate: string;
  currentValue: number;
}

export const investmentService = {
  getAll: async () => {
    const response = await api.get("/investments");
    return response.data;
  },

  create: async (data: InvestmentData) => {
    const response = await api.post("/investments", data);
    return response.data;
  },

  update: async (id: string, data: Partial<InvestmentData>) => {
    const response = await api.put(`/investments/${id}`, data);
    const investment = response.data;

    // Calculate percentage change
    const percentageChange =
      ((investment.currentValue - investment.amount) / investment.amount) * 100;

    // Show notification if change is significant (>5%)
    if (Math.abs(percentageChange) > 5) {
      notificationService.showInvestmentAlert(
        percentageChange > 0 ? "gain" : "loss",
        investment.name,
        Math.abs(percentageChange)
      );
    }

    return investment;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/investments/${id}`);
    return response.data;
  },

  getPerformanceMetrics: async () => {
    const investments = await investmentService.getAll();

    return {
      totalInvested: investments.reduce(
        (sum: number, inv: InvestmentData) => sum + inv.amount,
        0
      ),
      currentValue: investments.reduce(
        (sum: number, inv: InvestmentData) => sum + inv.currentValue,
        0
      ),
      bestPerforming: investments.reduce(
        (best: InvestmentData, current: InvestmentData) => {
          const currentReturn =
            ((current.currentValue - current.amount) / current.amount) * 100;
          const bestReturn =
            ((best.currentValue - best.amount) / best.amount) * 100;
          return currentReturn > bestReturn ? current : best;
        },
        investments[0]
      ),
    };
  },
};
