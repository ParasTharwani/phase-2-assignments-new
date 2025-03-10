import db from '../../database/db'

const createRolesTable = `
CREATE TABLE IF NOT EXIST roles(
id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL);`
    db.query(createRolesTable, (err) => {
        if (err) {
            console.error('Error creating roles table:', err);
        } else {
            console.log('Roles table created or already exists');
        }
    })
    export default createRolesTable;
    