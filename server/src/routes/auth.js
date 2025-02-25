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
    console.log("Sync attempt for:", { clerkId, email });

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { email },
      create: {
        clerkId,
        email,
      },
    });

    console.log("User synced successfully:", user);
    res.json({ user });
  } catch (error) {
    console.error("Auth sync error:", error);
    res.status(500).json({
      error: "Failed to sync user",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
