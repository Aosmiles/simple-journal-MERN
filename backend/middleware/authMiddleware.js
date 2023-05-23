import jsonWebToken from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
    // add user to request object
    req.user = await User.findById(decoded.id).select("-password"); // -password means don't return the password
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});
