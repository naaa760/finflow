import { api } from "@/lib/api";

export const plaidService = {
  // Create link token
  createLinkToken: async () => {
    const response = await api.post("/plaid/create-link-token");
    return response.data.link_token;
  },

  // Exchange public token
  exchangeToken: async (publicToken: string) => {
    const response = await api.post("/plaid/exchange-token", { publicToken });
    return response.data;
  },

  // Get transactions
  getTransactions: async () => {
    const response = await api.get("/plaid/transactions");
    return response.data;
  },

  // Get accounts
  getAccounts: async () => {
    const response = await api.get("/plaid/accounts");
    return response.data;
  },

  // Get balances
  getBalances: async () => {
    const response = await api.get("/plaid/balances");
    return response.data;
  },
};
