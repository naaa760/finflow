const express = require("express");
const router = express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(plaidConfig);

// Create link token for Plaid Link
router.post("/create-link-token", async (req, res) => {
  try {
    const configs = {
      user: { client_user_id: "user-id" },
      client_name: "FinFlow",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    };

    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    res.json(createTokenResponse.data);
  } catch (error) {
    console.error("Error creating link token:", error);
    res.status(500).json({ error: "Failed to create link token" });
  }
});

// Exchange public token for access token
router.post("/exchange-token", async (req, res) => {
  try {
    const { publicToken } = req.body;
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    // Store accessToken securely for the user

    res.json({ success: true });
  } catch (error) {
    console.error("Error exchanging token:", error);
    res.status(500).json({ error: "Failed to exchange token" });
  }
});

// Get transactions
router.get("/transactions", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Get transactions from Plaid
    const request = {
      access_token: process.env.PLAID_ACCESS_TOKEN,
      start_date: startDate || "2023-01-01",
      end_date: endDate || new Date().toISOString().split("T")[0],
    };

    const response = await plaidClient.transactionsGet(request);
    const transactions = response.data.transactions;

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Get accounts
router.get("/accounts", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const request = {
      access_token: process.env.PLAID_ACCESS_TOKEN,
    };

    const response = await plaidClient.accountsGet(request);
    const accounts = response.data.accounts;

    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

module.exports = router;
