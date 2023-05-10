import express from "express";
import JournalEntry from "../models/journalEntryModel.js";

const router = express.Router();

//get all entries
router.get("/", (req, res) => {
  res.json({ message: "GET all entries" });
});

//get single entry
router.get("/:id", (req, res) => {
  res.json({ message: "GET single entry with id" });
});

//create new entry
router.post("/", async (req, res) => {
  const { text, color } = req.body;
  try {
    const entry = await JournalEntry.create({ text, color });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({ message: "POST new entry" });
});

//update entry
router.put("/:id", (req, res) => {
  res.json({ message: `PUT update entry with id ${req.params.id}` });
});

//delete entry
router.delete("/:id", (req, res) => {
  res.json({ message: `DELETE entry with id ${req.params.id}` });
});

export default router;
