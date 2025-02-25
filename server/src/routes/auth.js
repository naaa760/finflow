const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const router = Router();
const prisma = new PrismaClient();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Auth route is working" });
});

router.post("/sync", async (req, res) => {
  try {
    console.log("Received sync request:", req.body);
    const { clerkId, email } = req.body;

    if (!clerkId || !email) {
      console.log("Missing fields:", { clerkId, email });
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify Prisma connection
    await prisma.$connect();
    console.log("Database connected successfully");

    const user = await prisma.user.upsert({
      where: { clerkId },
      update: { email },
      create: { clerkId, email },
    });

    console.log("User synced successfully:", user);
    res.json({ user });
  } catch (error) {
    console.error("Auth sync error:", error);
    res.status(500).json({
      error: "Failed to sync user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
