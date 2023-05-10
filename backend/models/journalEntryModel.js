import mongoose from "mongoose";
const { Schema } = mongoose;

const journalEntrySchema = new Schema(
  {
    text: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("JournalEntry", journalEntrySchema);
