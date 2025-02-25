const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const prisma = new PrismaClient();

// Get all investments for a user
router.get("/", requireAuth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const investments = await prisma.investment.findMany({
      where: { userId },
      orderBy: { purchaseDate: "desc" },
    });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch investments" });
  }
});

// Create new investment
router.post("/", requireAuth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { type, amount, name, purchaseDate, currentValue } = req.body;

    const investment = await prisma.investment.create({
      data: {
        userId,
        type,
        amount,
        name,
        purchaseDate: new Date(purchaseDate),
        currentValue,
      },
    });
    res.json(investment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create investment" });
  }
});

// Update investment current value
router.patch("/:id/value", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { currentValue } = req.body;

    const investment = await prisma.investment.update({
      where: { id },
      data: { currentValue },
    });
    res.json(investment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update investment value" });
  }
});

module.exports = router;
