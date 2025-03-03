const express = require('express');
const mongoose = require('mongoose');

const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//connecting to mongodb
mongoose.connect(process.env.URI)
.then(() => console.log('MongoDB Connected'))
.catch(() => console.log('MongoDb Connection Error'));

//importing Model
const Task = require('./models/Task')

//middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

// setting the ejs
app.set('view engine', 'ejs');


//routes
app.get('/', async (req, res) => {
    try {
      const tasks = await Task.find({}).sort({ createdAt: -1 });
      res.render('index', { tasks });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

//GET
app.get('/tasks/new', (req, res) => {
    console.log('started')
    res.render('create')
})
//POST
app.post('/tasks', async(req, res) => {
    try{
        const {title, description, status} = req.body;
        const newTask = new Task({
            title,
            description,
            status: status || 'pending'
        });
        await newTask.save();
        res.redirect('/')
    } catch(err){
        console.error(err)
        res.status(400).send('error creating task')
    }
})

// get - editing a task
app.get('/tasks/:id/edit', async(req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.render('edit', {task});
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error')
    }
});

//PUT -Update a task
app.put('/tasks/:id', async(req,res) => {
    try{
        const {title, description, status} = req.body;
        await Task.findByIdAndUpdate(req.params.id, {
            title, 
            description,
            status
        });
        res.redirect('/'); 
    } catch(err) {
        console.error(err);
    }
})

//deleting a task
app.delete('/tasks/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(400).send('Error deleting task');
    }
  });

//port
app.listen(PORT, () => {
    console.log(`Server is listening  on port ${PORT}`);
})
