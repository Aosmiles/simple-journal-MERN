export default (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  const stack = process.env.NODE_ENV === "production" ? null : error.stack;

  //check for cast error and return 404
  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  console.log(error.stack);
  res.status(statusCode).json({ message: message, stack: stack });
};
