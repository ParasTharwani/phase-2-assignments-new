import userQueries from '../query/users/query.js';

// GET all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userQueries.selectAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, phone, address, role_id } = req.body;
        const userId = await userQueries.insertUser({ name, email, phone, address, role_id });
        res.status(201).json({ id: userId, message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};