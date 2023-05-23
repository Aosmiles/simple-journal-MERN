import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utility/generateToken.js";

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

  //check if user was created
  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check if user exists and password is correct
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  //get user
  const user = await User.findById(req.user._id);

  //check if user exists
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  //update user
  user.username = req.body.username || user.username; //if username is not provided, use the existing username
  user.email = req.body.email || user.email; //if email is not provided, use the existing email
  if (req.body.password) {
    user.password = req.body.password;
  }

  //save user
  const updatedUser = await user.save();

  //check if user was updated
  if (!updatedUser) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  generateToken(res, updatedUser._id);
  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
  });
});

export default {
  registerUser,
  authUser,
  logout,
  getUserProfile,
  updateUserProfile,
};
