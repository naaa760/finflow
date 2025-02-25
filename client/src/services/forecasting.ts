import { analyticsService } from "./analytics";

interface ForecastData {
  transactions: Array<{
    amount: number;
    category: string;
    type: "income" | "expense";
    date: string;
  }>;
  recurringTransactions: Array<{
    amount: number;
    type: "income" | "expense";
    frequency: "daily" | "weekly" | "monthly" | "yearly";
  }>;
  budgets: Array<{
    category: string;
    amount: number;
    spent: number;
  }>;
}

export const forecastingService = {
  calculateMonthlyRecurring: (
    recurring: ForecastData["recurringTransactions"]
  ) => {
    return recurring.reduce((total, transaction) => {
      const monthlyAmount =
        transaction.amount *
        {
          daily: 30,
          weekly: 4,
          monthly: 1,
          yearly: 1 / 12,
        }[transaction.frequency];

      return (
        total + (transaction.type === "income" ? monthlyAmount : -monthlyAmount)
      );
    }, 0);
  },

  predictNextMonthBalance: (data: ForecastData) => {
    const trends = analyticsService.calculateMonthlyTrends(data);
    const lastMonth = trends[trends.length - 1];
    const recurringNet = forecastingService.calculateMonthlyRecurring(
      data.recurringTransactions
    );

    return {
      predictedIncome: lastMonth.income,
      predictedExpenses: lastMonth.expenses,
      recurringNet,
      expectedBalance: lastMonth.income - lastMonth.expenses + recurringNet,
    };
  },

  generateBudgetForecast: (data: ForecastData) => {
    const categoryTrends = new Map<string, number[]>();

    // Group transactions by category and calculate monthly totals
    data.transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        if (!categoryTrends.has(transaction.category)) {
          categoryTrends.set(transaction.category, []);
        }

        const monthlyData = categoryTrends.get(transaction.category)!;
        monthlyData.push(transaction.amount);
      }
    });

    // Calculate trend and forecast for each category
    return Array.from(categoryTrends.entries()).map(([category, amounts]) => {
      const average =
        amounts.reduce((sum, amt) => sum + amt, 0) / amounts.length;
      const trend = (amounts[amounts.length - 1] - amounts[0]) / amounts.length;

      return {
        category,
        currentAverage: average,
        predictedNext: average + trend,
        trend: trend > 0 ? "increasing" : trend < 0 ? "decreasing" : "stable",
        recommendedBudget: Math.ceil(average * 1.1), // 10% buffer
      };
    });
  },

  calculateSavingsPotential: (data: ForecastData) => {
    const { expectedBalance } =
      forecastingService.predictNextMonthBalance(data);
    const currentSavingsRate = analyticsService.calculateSavingsRate(data);

    return {
      potentialMonthlySavings: Math.max(
        0,
        expectedBalance * (currentSavingsRate / 100)
      ),
      recommendedEmergencyFund: expectedBalance * 6, // 6 months of expenses
      projectedYearEndSavings:
        expectedBalance * (currentSavingsRate / 100) * 12,
    };
  },
};
