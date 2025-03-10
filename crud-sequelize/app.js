import express from 'express';
import sequelize from './database/db.js';
import { getAllUsers, createUser } from './controllers/UserController.js';
import { getAllRoles, createRole } from './controllers/Rolecontroller.js';

// Create an Express app
const app = express();
const PORT = 3000;

// Use built-in JSON middleware
app.use(express.json());

// Define routes

// User routes
app.get('/users', getAllUsers);
app.post('/users', createUser);

// Role routes
app.get('/roles', getAllRoles);
app.post('/roles', createRole);

// Sync Sequelize models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((err) => {
        console.error('Unable to sync database:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});