const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection error:", err));

let studentProfile = null;

app.get("/student", (req, res) => {
  res.json(studentProfile);
});

app.put("/student", (req, res) => {
  studentProfile = req.body;
  res.json(studentProfile);
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
