// server/routes/tasks.js
const express = require('express');
const Task = require('../models/task');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Middleware for authentication
router.use(authenticateToken);

// Get all tasks for a user
router.get('/', async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});

// Add a new task
router.post('/', async (req, res) => {
    const newTask = new Task({ title: req.body.title, userId: req.user.id });
    await newTask.save();
    res.json(newTask);
});

// Update a task
router.put('/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

// Delete a task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
