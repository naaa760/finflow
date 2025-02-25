const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Simple auth middleware that checks for user ID in headers
const requireAuth = async (req, res, next) => {
  try {
    // Get user from session/token
    const user = await prisma.user.findFirst({
      where: { clerkId: req.auth?.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = { requireAuth };
