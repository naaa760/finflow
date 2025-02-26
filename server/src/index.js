const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const errorHandler = require("./middleware/errorHandler");
const prisma = require("./config/database");
const logger = require("./utils/logger");
const { helmet, limiter } = require("./middleware/security");
const authRoutes = require("./routes/auth");
const plaidRoutes = require("./api/plaid");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);
app.use(express.json());
app.use(helmet());
app.use(limiter);

// Add preflight handling
app.options("*", cors());

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Initialize routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", require("./api/transactions"));
app.use("/api/budgets", require("./api/budgets"));
app.use("/api/investments", require("./api/investments"));
app.use("/api/plaid", plaidRoutes);

// Add error handler after all routes
app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    if (error.code === "EADDRINUSE") {
      logger.error(`Port ${PORT} is already in use`);
      process.exit(1);
    }
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
