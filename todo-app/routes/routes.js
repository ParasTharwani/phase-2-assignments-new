const express = require ("express");
const router = express.Router();
 
//import Controller 
const {createTodo} = require ("../controller/createTodo")

//getTodo
const {getTodo} = require ("../controller/getTodo")
//define API Routes
router.post("/createTodo", createTodo)
router.get("/getTodos", getTodo)
module.exports = router;