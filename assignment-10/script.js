const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy user object
let users = [
  { id: 1, name: 'Paras', email: 'paras@example.com', age: 24 },
  { id: 2, name: 'bushra', email: 'bushra@example.com', age: 24 },
  { id: 3, name: 'namra', email: 'namra@example.com', age: 27 },
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

