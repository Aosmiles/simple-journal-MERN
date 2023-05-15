import asyncHandler from "express-async-handler";

// Register a new user
const registerUser = asyncHandler(async (req, res) => {});

// Authenticates a user and generates a token
const authUser = asyncHandler(async (req, res) => {});

// logout user
const logout = asyncHandler(async (req, res) => {});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {});

export default {
  registerUser,
  authUser,
  logout,
  getUserProfile,
  updateUserProfile,
};
