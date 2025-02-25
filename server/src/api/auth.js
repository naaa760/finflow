const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const prisma = new PrismaClient();

// Create or update user after Clerk authentication
router.post("/sync", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    // Get the authenticated user's Clerk ID from the request
    const clerkId = req.auth.userId;
    const { email } = req.body;

    console.log("Syncing user:", { clerkId, email }); // Debug log

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { email },
      create: {
        clerkId,
        email,
        // Add default data for new users if needed
        transactions: {
          create: [
            {
              amount: 1000,
              category: "Salary",
              description: "Monthly Salary",
              date: new Date(),
              type: "income",
            },
          ],
        },
        budgets: {
          create: [
            {
              category: "General",
              amount: 1000,
              spent: 0,
              startDate: new Date(),
              endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            },
          ],
        },
      },
      // Include related data in the response
      include: {
        transactions: true,
        budgets: true,
      },
    });

    console.log("User synced:", user); // Debug log
    res.json(user);
  } catch (error) {
    console.error("Auth sync error:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

module.exports = router;
