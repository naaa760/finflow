const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["error", "warn"],
  errorFormat: "minimal",
});

// Handle connection events
prisma.$on("connect", () => {
  console.log("Successfully connected to database");
});

prisma.$on("error", (e) => {
  console.error("Database connection error:", e);
});

module.exports = prisma;
