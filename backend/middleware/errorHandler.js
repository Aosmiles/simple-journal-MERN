export default (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  const stack = process.env.NODE_ENV === "production" ? null : error.stack;
  console.log(error.stack);
  res.status(statusCode).json({ error: error.message, stack: stack });
};
