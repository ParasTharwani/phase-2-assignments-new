import db from '../../database/db.js';

const rolesQueries = {
    // Select all roles
    selectAllRoles: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM roles', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Insert a new role
    insertRole: (role) => {
        const { name } = role;
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO roles (name) VALUES (?)',
                [name],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.insertId);
                    }
                }
            );
        });
    }
};

export default rolesQueries;