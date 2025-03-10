import rolesQueries from "../query/roles/query";
// GET all roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesQueries.selectAllRoles();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST a new role
export const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const roleId = await rolesQueries.insertRole({ name });
        res.status(201).json({ id: roleId, message: 'Role created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
