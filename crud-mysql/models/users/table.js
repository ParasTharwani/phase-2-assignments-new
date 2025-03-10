import db from '../../database/db';

const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
`;

db.query(createUserTable, (err) => {
    if (err) {
        console.error('Error creating user table:', err);
    } else {
        console.log('User table created or already exists');
    }
});

export default createUserTable;