import express from "express";
import asyncHandler from "express-async-handler";
import journalEntryController from "../controllers/journalEntryController.js";

const router = express.Router();

//get all entries
router.get("/", asyncHandler(journalEntryController.getAllEntries));

//get single entry
router.get("/:id", asyncHandler(journalEntryController.getSingleEntry));

//create new entry
router.post("/", asyncHandler(journalEntryController.createNewEntry));

//update entry
router.put("/:id", asyncHandler(journalEntryController.updateEntry));

//delete entry
router.delete("/:id", asyncHandler(journalEntryController.deleteEntry));

export default router;
