const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const users = [
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 17, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 30, email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', age: 16, email: 'alice@example.com' }
];

app.get('/users', (req, res) => {
    // Filter out users under 18
    const allowedUsers = users.filter(user => user.age >= 18);
    res.render('users', { users: allowedUsers });
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).render('error', { 
            message: 'User not found' 
        });
    }

    if (user.age < 18) {
        return res.status(403).render('error', { 
            message: 'Access denied: User is under 18' 
        });
    }

    res.render('userDetail', { user });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});