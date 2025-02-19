const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

const users = [
  { name: 'sam', password: '1234' },
  { name: 'john', password: 'abcd' },
];

// Login GET route
app.get('/users/login', (req, res) => {
  res.render('users/login', { error: null });
});

// Login POST route
app.post('/users/login', (req, res) => {
  const { username, password } = req.body;

  let user = null;

  users.forEach(function (userItem) {
    if (userItem.name === username && userItem.password === password) {
      user = userItem;
    }
  });

  if (user) {
    res.send(`Welcome ${user.name}`);
  } else {
    console.log('Login failed: Invalid username or password');
    res.render('users/login', { error: 'Invalid username or password' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
 