const taskModel = require("../models/task.model");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");

//to create a task -POST
const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await taskModel.create({
      title,
      description,
      status,
      userId: req.user.id,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update task model
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }
  try {
    const task = await taskModel.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }
    // Update only provided fields
    if (title) task.title = title;
    if (description) task.description = description;
    task.status = status;

    // Save the updated task
    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete task model
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await taskModel.findOne({ _id: id, userId: req.user.id });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }
    // Remove the task from the database
    await taskModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTask = async (req, res) => {
  const userId = req.user.id;
  // const userId = req.params.userId;
  try {
    let allTasks;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      allTasks = await taskModel
        .find({ userId })
        .populate("userId", "name socialLinks.facebook");
      if (!allTasks) {
        return res
          .status(404)
          .json({ message: "No tasks found for this user" });
      }
    } else if (!userId) {
      allTasks = await taskModel.find();
    } else {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask, updateTask, getTask, deleteTask };
