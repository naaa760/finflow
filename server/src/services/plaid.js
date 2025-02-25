const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const plaidClient = require("../config/plaid");
const logger = require("../utils/logger");
const prisma = require("../config/database");

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const createLinkToken = async (userId) => {
  try {
    const configs = {
      user: { client_user_id: userId },
      client_name: "PFM App",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    };

    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    return createTokenResponse.data;
  } catch (error) {
    logger.error("Error creating link token:", error);
    throw error;
  }
};

const exchangePublicToken = async (publicToken) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return response.data;
  } catch (error) {
    logger.error("Error exchanging public token:", error);
    throw error;
  }
};

const getTransactions = async (accessToken, startDate, endDate) => {
  try {
    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });
    return response.data;
  } catch (error) {
    logger.error("Error fetching transactions:", error);
    throw error;
  }
};

module.exports = {
  createLinkToken,
  exchangePublicToken,
  getTransactions,
};
