import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import journalEntryRoutes from "./routes/journalEntryRoutes.js";

const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/journal", journalEntryRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
