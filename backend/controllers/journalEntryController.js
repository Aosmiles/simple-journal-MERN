import journalEntryModel from "../models/journalEntryModel.js";
import mongoose from "mongoose";

//get all entries
const getAllEntries = async (req, res, next) => {
  const entries = await journalEntryModel.find({});
  res.status(200).json(entries);
};

//get single entry
const getSingleEntry = async (req, res, next) => {
  const { id } = req.params;

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  const entry = await journalEntryModel.findById(id);
  //check if entry exists
  if (entry) {
    res.status(200).json(entry);
  } else {
    res.status(404);
    throw new Error("Entry not found");
  }
};

//create new entry
const createNewEntry = async (req, res, next) => {
  const { text, color, mood } = req.body;

  //check if required fields are present
  if (!text || !color || !mood) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const entry = await journalEntryModel.create({ text, color, mood });
  res.status(200).json(entry);
};

//update entry
const updateEntry = async (req, res, next) => {
  const { id } = req.params;
  const { text, color, mood } = req.body;

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  //check if required fields are present
  if (!text || !color || !mood) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const updatedEntry = { text, color, mood, _id: id };

  await journalEntryModel.findByIdAndUpdate(id, updatedEntry, { new: true });
  res.status(200).json(updatedEntry);
};

//delete entry
const deleteEntry = async (req, res, next) => {
  const { id } = req.params;

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }
  await journalEntryModel.findByIdAndRemove(id);
  res.status(200).json({ message: "Entry deleted successfully" });
};

export default {
  getAllEntries,
  getSingleEntry,
  createNewEntry,
  updateEntry,
  deleteEntry,
};
