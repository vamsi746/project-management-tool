const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Create a task
const createTask = async (req, res) => {
  const { title, description, status, assignee, dueDate } = req.body;
  const newTask = new Task({ title, description, status, assignee, dueDate });
  await newTask.save();
  res.status(201).json(newTask);
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedTask);
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

