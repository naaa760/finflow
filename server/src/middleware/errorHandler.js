const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.type === "PlaidError") {
    return res.status(400).json({
      error: err.message,
      plaidError: true,
      errorCode: err.error_code,
    });
  }

  if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      error: "Database operation failed",
      code: err.code,
    });
  }

  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
