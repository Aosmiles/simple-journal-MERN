import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

//routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
