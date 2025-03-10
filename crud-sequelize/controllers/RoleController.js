import Role from '../models/Role.js';

// GET all roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST a new role
export const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.create({ name });
        res.status(201).json({ id: role.id, message: 'Role created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};