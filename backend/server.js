import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
