import mysql from 'mysql';
//creating Connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mydb'
})
//connecting
db.connect((err) => {
    if (err) {
        console.error('Error connecting to mySQL:', err)
        return;
    }
    console.log('Connected to MySQL database')
})

export default db;