import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //check if user exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  //create user
  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  res.send("login");
});

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.send("logout");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("profile");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update");
});

export default {
  registerUser,
  authUser,
  logout,
  getUserProfile,
  updateUserProfile,
};
