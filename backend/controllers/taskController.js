const Task = require("../models/Task");

// ➕ Create Task
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      status: req.body.status,
      deadline: req.body.deadline,
      user: req.user.id
    });

    await task.save();

    // ✅ IMPORTANT FIX
    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑 Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};