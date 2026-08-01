const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET /api/tasks - list all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: 1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// POST /api/tasks - create a new task
router.post("/", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ error: "Task title is required" });
        }

        const task = new Task({ title: title.trim() });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

// PATCH /api/tasks/:id - update a task (e.g. toggle completed)
router.patch("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to update task" });
    }
});

// DELETE /api/tasks/:id - delete a task
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});

module.exports = router;
