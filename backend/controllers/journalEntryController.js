import journalEntryModel from "../models/journalEntryModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// @desc    Get all entries
// @route   GET /api/journal-entries
// @access  Private
const getAllEntries = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const entries = await journalEntryModel
    .find({ userId })
    .sort({ createdAt: -1 });
  res.status(200).json(entries);
});

// @desc    Create new entry
// @route   POST /api/journal-entries
// @access  Private
const createNewEntry = asyncHandler(async (req, res, next) => {
  const { text, color, mood } = req.body;

  //check if required fields are present
  checkFields(text, color, mood, res);

  const entry = await journalEntryModel.create({
    text,
    color,
    mood,
    userId: req.user._id,
  });
  res.status(200).json(entry);
});

// @desc    Get single entry
// @route   GET /api/journal-entries/:id
// @access  Private
const getSingleEntry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  //check if id is valid
  checkID(id, res);

  const entry = await journalEntryModel.findById(id);

  //check if user is authorized to view entry
  if (entry.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to view this entry");
  }

  //check if entry exists
  checkEntry(entry, res);

  res.status(200).json(entry);
});

// @desc    Update entry
// @route   PUT /api/journal-entries/:id
// @access  Private
const updateEntry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  //check if id is valid
  checkID(id, res);

  const entryToUpdate = await journalEntryModel.findById(id);

  //check if user is authorized to update entry
  if (entryToUpdate.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this entry");
  }

  //check if entry exists
  checkEntry(entryToUpdate, res);

  const { text, color, mood } = req.body;
  entryToUpdate.text = text ?? entryToUpdate.text;
  entryToUpdate.color = color ?? entryToUpdate.color;
  entryToUpdate.mood = mood ?? entryToUpdate.mood;

  const updatedEntry = await entryToUpdate.save();

  res.status(200).json(updatedEntry);
});

//  @desc   Delete entry
//  @route  DELETE /api/journal-entries/:id
//  @access Private
const deleteEntry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  //check if id is valid
  checkID(id, res);

  const entry = await journalEntryModel.findById(id);

  //check if entry exists
  checkEntry(entry, res);

  //check if user is authorized to delete entry
  if (entry.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this entry");
  }

  await entry.deleteOne();

  res.status(200).json({ message: "Entry deleted successfully", id: id });
});

export default {
  getAllEntries,
  getSingleEntry,
  createNewEntry,
  updateEntry,
  deleteEntry,
};

function checkEntry(entry, res) {
  if (!entry) {
    res.status(404);
    throw new Error("Entry not found");
  }
}

function checkFields(text, color, mood, res) {
  if (!text || !color || !mood) {
    res.status(400);
    throw new Error("Missing required fields");
  }
}

function checkID(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }
}
