import { api } from "@/lib/api";

export const plaidService = {
  // Create link token
  createLinkToken: async () => {
    try {
      const response = await api.post("/api/plaid/create-link-token");
      return response.data.link_token;
    } catch (error) {
      console.error("Failed to create link token:", error);
      throw error;
    }
  },

  // Exchange public token
  exchangeToken: async (publicToken: string) => {
    const response = await api.post("/api/plaid/exchange-token", {
      publicToken,
    });
    return response.data;
  },

  // Get transactions
  getTransactions: async () => {
    const response = await api.get("/api/plaid/transactions");
    return response.data;
  },

  // Get accounts
  getAccounts: async () => {
    const response = await api.get("/api/plaid/accounts");
    return response.data;
  },

  // Get balances
  getBalances: async () => {
    const response = await api.get("/api/plaid/accounts");
    return response.data;
  },
};
