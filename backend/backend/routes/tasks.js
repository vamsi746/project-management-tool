const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyToken = require('../middleware/authMiddleware');

// 🔒 Protect all routes that require a logged-in user

// Create a new task (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate, assignee, priority, team } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      assignee,
      priority,
      team,
      createdBy: req.user.userId // Track who created it
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find(); // Optional: .find({ createdBy: req.user.userId })
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single task by ID (protected)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
        assignee: req.body.assignee,
        priority: req.body.priority,
        team: req.body.team
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
});

// Delete a task (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Add comment to a task (protected)
router.post('/:id/comments', verifyToken, async (req, res) => {
  try {
    const { text, user } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const comment = {
      text,
      user: user || 'Anonymous',
      timestamp: new Date()
    };

    task.comments.push(comment);
    await task.save();

    res.status(201).json({ message: 'Comment added', comment });
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// Get analytics summary (protected)
router.get('/analytics/summary', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find();

    const summary = {
      total: tasks.length,
      status: {
        todo: tasks.filter(t => t.status === 'To Do').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        done: tasks.filter(t => t.status === 'Done').length,
      },
      priority: {
        low: tasks.filter(t => t.priority === 'Low').length,
        medium: tasks.filter(t => t.priority === 'Medium').length,
        high: tasks.filter(t => t.priority === 'High').length,
      },
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load analytics data' });
  }
});

module.exports = router;
