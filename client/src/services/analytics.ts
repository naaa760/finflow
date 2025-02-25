interface AnalyticsData {
  transactions: Array<{
    amount: number;
    category: string;
    type: "income" | "expense";
    date: string;
  }>;
  budgets: Array<{
    category: string;
    amount: number;
    spent: number;
  }>;
}

export const analyticsService = {
  calculateMonthlyTrends: (data: AnalyticsData) => {
    const monthlyData = new Map<
      string,
      { income: number; expenses: number; savings: number }
    >();

    data.transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { income: 0, expenses: 0, savings: 0 });
      }

      const monthData = monthlyData.get(monthKey)!;
      if (transaction.type === "income") {
        monthData.income += transaction.amount;
      } else {
        monthData.expenses += transaction.amount;
      }
      monthData.savings = monthData.income - monthData.expenses;
    });

    return Array.from(monthlyData.entries()).map(([month, data]) => ({
      month,
      ...data,
    }));
  },

  calculateCategoryBreakdown: (data: AnalyticsData) => {
    const categoryData = new Map<string, number>();

    data.transactions
      .filter((t) => t.type === "expense")
      .forEach((transaction) => {
        const current = categoryData.get(transaction.category) || 0;
        categoryData.set(transaction.category, current + transaction.amount);
      });

    return Array.from(categoryData.entries()).map(([category, amount]) => ({
      category,
      amount,
    }));
  },

  calculateSavingsRate: (data: AnalyticsData) => {
    const totalIncome = data.transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = data.transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome) * 100
      : 0;
  },

  predictFutureExpenses: (data: AnalyticsData) => {
    const monthlyExpenses = analyticsService
      .calculateMonthlyTrends(data)
      .map((m: { expenses: number }) => m.expenses);
    const avgExpense =
      monthlyExpenses.reduce((sum: number, exp: number) => sum + exp, 0) /
      monthlyExpenses.length;

    return {
      nextMonth: avgExpense,
      nextQuarter: avgExpense * 3,
      nextYear: avgExpense * 12,
    };
  },
};
