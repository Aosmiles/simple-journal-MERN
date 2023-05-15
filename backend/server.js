import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./db/connectDB.js";
import journalEntryRoutes from "./routes/journalEntryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

connectDB();

const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/journal", journalEntryRoutes);
app.use("/api/users", userRoutes);

//error handler
app.use(errorHandler);

//start server on db connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
