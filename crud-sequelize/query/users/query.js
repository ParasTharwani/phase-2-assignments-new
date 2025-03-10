import db from '../../database/db.js';

const userQueries = {
    // Select all users
    selectAllUsers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    // Insert a new user
    insertUser: (user) => {
        const { name, email, phone, address, role_id } = user;
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO user (name, email, phone, address, role_id) VALUES (?, ?, ?, ?, ?)',
                [name, email, phone, address, role_id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.insertId);
                    }
                }
            );
        });
    },

    // Delete a user by ID
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM user WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }
};

export default userQueries;