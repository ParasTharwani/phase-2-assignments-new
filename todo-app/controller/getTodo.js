//importing our todo from models 
const todo = require("../models/todo");

// defining the route handler

exports.getTodo = async(req,res) => {
    try{
      // fetch all todo items from database
      const todos = await todo.find({});
      
      //update the Response
      res.status(200)
      .json(
        {
            success:true,
            data:todos,
            message:"entire todo data is fetched"
        }
      )
    }
    catch(err){
      console.error(err);
      res.status(500)
      .json({
        success:false,
        error:err.message,
        message:'server error'
      })
    }
}
