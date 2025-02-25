const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

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

    // Add your user sync logic here
    // For example:
    // await db.user.upsert({
    //   where: { clerkId },
    //   update: { email },
    //   create: { clerkId, email }
    // });

    res.json({ success: true });
  } catch (error) {
    console.error("User sync error:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

module.exports = router;
