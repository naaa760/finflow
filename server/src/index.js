const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const errorHandler = require("./middleware/errorHandler");
const prisma = require("./config/database");
const logger = require("./utils/logger");
const { helmet, limiter } = require("./middleware/security");
const authRoutes = require("./routes/auth");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://finflow-client.vercel.app",
      "https://finflow-git-main-naaa760.vercel.app",
      process.env.NEXT_PUBLIC_CLIENT_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(helmet());
app.use(limiter);

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Initialize routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", require("./api/transactions"));
app.use("/api/budgets", require("./api/budgets"));
app.use("/api/investments", require("./api/investments"));
app.use("/api/plaid", require("./api/plaid"));

// Add error handler after all routes
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
