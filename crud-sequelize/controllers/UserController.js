import User from '../models/User.js';

// GET all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, phone, address, role_id } = req.body;
        const user = await User.create({ name, email, phone, address, role_id });
        res.status(201).json({ id: user.id, message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};