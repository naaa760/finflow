const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const router = Router();
const prisma = new PrismaClient();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Auth route is working" });
});

router.post("/sync", async (req, res) => {
  try {
    const { clerkId, email } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { email },
      create: {
        clerkId,
        email,
        // Add any other required fields from your User model
      },
    });

    res.json({ user });
  } catch (error) {
    console.error("Auth sync error:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

module.exports = router;
