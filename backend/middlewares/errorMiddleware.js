/*
GLOBAL ERROR HANDLER
- catches errors from controllers
- sends clean response
*/
const errorMiddleware = (err, req, res, next) => {
  console.error("ERROR:", err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorMiddleware;