const { z } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.errors,
    });
  }
};

// Common validation schemas
const schemas = {
  dateRange: z.object({
    query: z.object({
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
    }),
  }),

  transaction: z.object({
    body: z.object({
      amount: z.number().positive(),
      category: z.string().min(1),
      description: z.string().min(1),
      date: z.string().datetime(),
      type: z.enum(["income", "expense"]),
    }),
  }),
};

module.exports = {
  validate,
  schemas,
};
