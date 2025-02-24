const express = require('express');
const app = express();

//server instantiate or activated

//load config from env #bestPractice
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//import routes for TODO API

const todoRoutes = require("./routes/routes")

//mount the todo API routes //add //append
app.use("/api/v1", todoRoutes);

//START SERVER
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})

//CONNECT TO THE DATABASE
    const dbConnect = require ("./config/dataBase");
    dbConnect();

//default route
app.get("/", (req,res) => {
    res.send(`<h1>This is homepage </h1>`)
})