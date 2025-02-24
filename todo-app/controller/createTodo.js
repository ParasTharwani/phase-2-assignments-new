//importing our todo from models 
const todo = require("../models/todo");

 
// defining the route handler

exports.createTodo = async(req,res) => {
    try{
        //extract title and description from request body
        const {title,description} = req.body;
        //create a new todo Object and insert into db
        const response = await todo.create({title, description});
        //send a json response with a success flag
        res.status(200).json(
            {
                success:true,
                data:response,
                message:'Entry Created Successfully'
            }
        )

    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500)
        .json({
            succsess:false,
            data:"internal sever error",
            message:err.message,
        } )
    }
}