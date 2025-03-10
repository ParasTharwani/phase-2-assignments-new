import { Sequelize } from "sequelize";

// create sequelize 
const sequelize = new Sequelize('test', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
})

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;