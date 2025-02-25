const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const router = Router();
const prisma = new PrismaClient();

// Get all transactions for a user
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Create new transaction
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, category, description, date, type } = req.body;

    // Validate required fields
    if (!amount || !category || !type || !date) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        amount: parseFloat(amount),
        category,
        description: description || "",
        date: new Date(date),
        type,
      },
    });

    res.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      error: "Failed to create transaction",
      details: error.message,
    });
  }
});

// Delete transaction
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify transaction belongs to user
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await prisma.transaction.delete({ where: { id } });
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

module.exports = router;
