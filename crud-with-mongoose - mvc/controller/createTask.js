const createTask = require("../models/Task");

class TaskController {
    // Get all tasks
    async getAllTasks(req, res) {
      try {
        const tasks = await Task.find({}).sort({ createdAt: -1 });
        res.render('index', { 
          tasks,
          pageTitle: 'All Tasks' 
        });
      } catch (err) {
        console.error(err);
        res.status(500).render('error', { 
          message: 'Error fetching tasks',
          error: err 
        });
      }
    }
  
    // Show create task form
    showCreateTaskForm(req, res) {
      res.render('create', { 
        pageTitle: 'Create New Task' 
      });
    }
  
    // Create a new task
    async createTask(req, res) {
      try {
        const { title, description, status } = req.body;
        
        // Validate required fields
        if (!title) {
          return res.status(400).render('error', {
            message: 'Title is required',
            error: new Error('Title cannot be empty')
          });
        }
  
        const newTask = new Task({
          title,
          description,
          status: status || 'pending'
        });
  
        await newTask.save();
        
        // Add flash message (requires express-flash)
        req.flash('success', 'Task created successfully!');
        res.redirect('/');
      } catch (err) {
        console.error(err);
        res.status(400).render('error', { 
          message: 'Error creating task',
          error: err 
        });
      }
    }
  
    // Show edit task form
    async showEditTaskForm(req, res) {
      try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
          return res.status(404).render('error', {
            message: 'Task not found',
            error: new Error('Invalid task ID')
          });
        }
        
        res.render('edit', { 
          task,
          pageTitle: 'Edit Task' 
        });
      } catch (err) {
        console.error(err);
        res.status(500).render('error', { 
          message: 'Error finding task',
          error: err 
        });
      }
    }
  
    // Update a task
    async updateTask(req, res) {
      try {
        const { title, description, status } = req.body;
        
        await Task.findByIdAndUpdate(req.params.id, {
          title,
          description,
          status
        }, { 
          new: true,  // Return the modified document
          runValidators: true  // Run model validations
        });
        
        req.flash('success', 'Task updated successfully!');
        res.redirect('/');
      } catch (err) {
        console.error(err);
        res.status(400).render('error', { 
          message: 'Error updating task',
          error: err 
        });
      }
    }
  
    // Delete a task
    async deleteTask(req, res) {
      try {
        await Task.findByIdAndDelete(req.params.id);
        
        req.flash('success', 'Task deleted successfully!');
        res.redirect('/');
      } catch (err) {
        console.error(err);
        res.status(400).render('error', { 
          message: 'Error deleting task',
          error: err 
        });
      }
    }
  }
  
  module.exports = new TaskController();