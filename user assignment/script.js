// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy user object
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 17 },
  { id: 3, name: 'Alice Brown', email: 'alice@example.com', age: 19 },
];

// Routes

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    if (user.age < 18) {
      res.status(403).send('Access denied: User is under 18.');
    } else {
      res.json(user);
    }
  } else {
    res.status(404).send('User not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`User management app running at http://localhost:${port}`);
});
