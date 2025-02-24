// this file's purpose is to connect application with database
const mongoose = require('mongoose');
require('dotenv').config()
// it's function is to establish the connection
//WHEN did we feed our databaseurl into process... we need to feed otherwise it won't work

const dbConnect = () => {
mongoose.connect (process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => {
    console.log('db connection successful');
})
.catch((error) => {
    console.log("Issue in Db Connection");
    console.error(error.message);
    process.exit(1);
})
}

module.exports = dbConnect;
