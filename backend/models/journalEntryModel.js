import mongoose from "mongoose";
const { Schema } = mongoose;

const journalEntrySchema = new Schema(
  {
    userId: { type: String, required: true },
    text: { type: String, required: true },
    color: { type: String, required: true },
    mood: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("JournalEntry", journalEntrySchema);
