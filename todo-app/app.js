const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 3000;

//middleware to parse
app.use(bodyParser.json())

//our list
let todos = [];

//get to fetch all the todos
app.get('/todos', (req,res) => {
    res.json({
        success:true,
        data:todos
    })
})

//Getting todo by Id
app.get("/todos/:id", (req,res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);

    if(!todo){
        return res.status(404).json({
            success: false,
            message: 'Todo Not Found'
        })
     }
    
     res.json({
        success:true,
        data:todo
     })

})


// post to create a new todo
app.post('/todos', (req,res) => {
    const {title,description} = req.body;

    //validate request body
    if(!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        })
    }

    // new Todo

const newTodo = {
    id: todos.length + 1,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
}

todos.push(newTodo);

res.status(201).json({
    success:true,
    data: newTodo
})

})

//start the server
app.listen(port, () => {
    console.log(`Todo API server running at http://localhost:${port}`);
});


