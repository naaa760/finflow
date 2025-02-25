const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const plaidService = require("../services/plaid");

// Create link token for Plaid Link
router.post("/create-link-token", requireAuth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const linkToken = await plaidService.createLinkToken(userId);
    res.json(linkToken);
  } catch (error) {
    res.status(500).json({ error: "Failed to create link token" });
  }
});

// Exchange public token for access token
router.post("/exchange-token", requireAuth, async (req, res) => {
  try {
    const { public_token } = req.body;
    const exchangeResponse = await plaidService.exchangePublicToken(
      public_token
    );
    res.json(exchangeResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to exchange token" });
  }
});

// Get transactions
router.get("/transactions", requireAuth, async (req, res) => {
  try {
    const { accessToken, startDate, endDate } = req.query;
    const transactions = await plaidService.getTransactions(
      accessToken,
      startDate,
      endDate
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

module.exports = router;
