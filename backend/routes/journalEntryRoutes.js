import express from "express";
import journalEntryController from "../controllers/journalEntryController.js";

const router = express.Router();

//get all entries
router.get("/", journalEntryController.getAllEntries);

//get single entry
router.get("/:id", journalEntryController.getSingleEntry);

//create new entry
router.post("/", journalEntryController.createNewEntry);

//update entry
router.put("/:id", journalEntryController.updateEntry);

//delete entry
router.delete("/:id", journalEntryController.deleteEntry);

export default router;
