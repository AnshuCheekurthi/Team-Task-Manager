const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("🔥 SERVER FILE IS RUNNING");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 TEST ROUTE (TOP LEVEL)
app.get("/ping", (req, res) => {
  console.log("PING HIT");
  res.send("Server is working");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Start server AFTER DB connection
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });

  } catch (err) {
    console.error("❌ DB Error:", err.message);
  }
}

startServer();