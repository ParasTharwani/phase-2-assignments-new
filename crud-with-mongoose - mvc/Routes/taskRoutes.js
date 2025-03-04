const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET all tasks
router.get('/', taskController.getAllTasks);

// GET create task form
router.get('/tasks/new', taskController.showCreateTaskForm);

// POST create task
router.post('/tasks', taskController.createTask);

// GET edit task form
router.get('/tasks/:id/edit', taskController.showEditTaskForm);

// PUT update task
router.put('/tasks/:id', taskController.updateTask);

// DELETE task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;