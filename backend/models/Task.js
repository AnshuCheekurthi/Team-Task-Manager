const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  projectId: String,
  assignedTo: String,
  status: { type: String, default: "todo" },
  deadline: Date
});

module.exports = mongoose.model("Task", taskSchema);