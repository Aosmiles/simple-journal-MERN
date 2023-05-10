import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import journalEntryRoutes from "./routes/journalEntryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/journal", journalEntryRoutes);

//error handler
app.use(errorHandler);

//connect to db
const connectonOptions = {
  dbname: process.env.MONGO_DBNAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.MONGO_URI, connectonOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
