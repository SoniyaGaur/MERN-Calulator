const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const calcRoutes = require("./routes/calcRoutes");
app.use("/api/calc", calcRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/calculator")
.then(() => {
  console.log("MongoDB Connected Successfully");
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err);
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running with DB");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});