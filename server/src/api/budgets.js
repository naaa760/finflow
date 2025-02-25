const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const prisma = new PrismaClient();

// Get all budgets for a user
router.get("/", requireAuth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

// Create new budget
router.post("/", requireAuth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { category, amount, startDate, endDate } = req.body;

    const budget = await prisma.budget.create({
      data: {
        userId,
        category,
        amount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        spent: 0,
      },
    });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: "Failed to create budget" });
  }
});

// Update budget spent amount
router.patch("/:id/spent", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { spent } = req.body;

    const budget = await prisma.budget.update({
      where: { id },
      data: { spent },
    });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: "Failed to update budget" });
  }
});

module.exports = router;
