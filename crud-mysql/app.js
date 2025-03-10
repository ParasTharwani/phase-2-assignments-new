import express from 'express';
import db from './database/db';
import createUserTable from './models/users/table';
import createRolesTable from './model/roles/table.js';
import { getAllUsers, createUser } from './controllers/userController';
import { getAllRoles, createRole } from './controllers/roleController';

createUserTable;
createRolesTable;

// Creating an Express app
const app = express();
const PORT = 3000;

//JSON middleware 
app.use(express.json());



// User routes
app.get('/users', getAllUsers);
app.post('/users', createUser);

// Role routes
app.get('/roles', getAllRoles);
app.post('/roles', createRole);

// Example usage of queries
(async () => {
    try {

        // Inserting a role
        const roleId = await rolesQueries.insertRole({ name: 'Admin' });
        console.log('Inserted role with ID:', roleId);

        // Inserting a user
        const userId = await userQueries.insertUser({
            name: 'Paras',
            email: 'paras@ymail.com',
            phone: '292929292992',
            address: 'st 14 b-1',
            role_id: roleId
        });
        console.log('Inserted user with ID:', userId);

        // Fetch all users
        const users = await userQueries.selectAllUsers();
        console.log('All users:', users);

        // Fetch all roles
        const roles = await rolesQueries.selectAllRoles();
        console.log('All roles:', roles);
    } catch (err) {
        console.error('Error:', err);
    }

    
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

})();