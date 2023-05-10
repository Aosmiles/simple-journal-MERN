import journalEntryModel from "../models/journalEntryModel.js";
import mongoose from "mongoose";

//get all entries
const getAllEntries = async (req, res) => {
  try {
    const entries = await journalEntryModel.find({});
    res.status(200).json(entries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single entry
const getSingleEntry = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const entry = await journalEntryModel.findById(id);
    if (entry) {
      res.status(200).json(entry);
    } else {
      res.status(404).json({ error: "Entry not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create new entry
const createNewEntry = async (req, res) => {
  try {
    const { text, color, mood } = req.body;
    const entry = await journalEntryModel.create({ text, color, mood });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update entry
const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { text, color, mood } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const updatedEntry = { text, color, mood, _id: id };

  try {
    await journalEntryModel.findByIdAndUpdate(id, updatedEntry, { new: true });
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete entry
const deleteEntry = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await journalEntryModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getAllEntries,
  getSingleEntry,
  createNewEntry,
  updateEntry,
  deleteEntry,
};
