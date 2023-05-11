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
  checkID(id, res);

  const entry = await journalEntryModel.findById(id);

  //check if entry exists
  checkEntry(entry, res);

  res.status(200).json(entry);
};

//create new entry
const createNewEntry = async (req, res, next) => {
  const { text, color, mood } = req.body;

  //check if required fields are present
  checkFields(text, color, mood, res);

  const entry = await journalEntryModel.create({ text, color, mood });
  res.status(200).json(entry);
};

//update entry
const updateEntry = async (req, res, next) => {
  const { id } = req.params;
  const { text, color, mood } = req.body;

  //check if id is valid
  checkID(id, res);

  //check if required fields are present
  checkFields(text, color, mood, res);

  const updatedEntry = { text, color, mood, _id: id };
  const entry = await journalEntryModel.findByIdAndUpdate(id, updatedEntry, {
    new: true,
  });

  //check if entry exists
  checkEntry(entry, res);

  res.status(200).json(entry);
};

//delete entry
const deleteEntry = async (req, res, next) => {
  const { id } = req.params;

  //check if id is valid
  checkID(id, res);
  const entry = await journalEntryModel.findByIdAndRemove(id);

  //check if entry exists
  checkEntry(entry, res);

  res.status(200).json({ message: "Entry deleted successfully" });
};

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
