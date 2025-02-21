import express from 'express';
import mongoose from 'mongoose';
const app = express()
import "dotenv/config"
const PORT = 3000;
app.use(express.json())
mongoose.connect(process.env.URI)
const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    createdAt :{
        type: Date,
        default: Date.now
    }

})

//post schema with ref
const postSchema = new mongoose.Schema({
   title: String,
   content: String,
   author :{
    type: Schema.Types.ObjectId,
    ref: 'user'
   },
   createdAt: {
    type:Date,
    default: Date.now
   }
})
const user = mongoose.model('user', userSchema)
const post = mongoose.model('post', postSchema)

app.post('/users', async(req, res) => {
    try {
        const {name, email} = req.body;
        const newUser = new user({name,email})
        await newUser.save();
        res.status(201).json({message:'post created', post:newUser})
    }
   catch(error){
    res.status(500).json({ error : error.message})
   }
})

// post route
app.post('/posts', async(req, res) => {
    try{
        const {title, content, userId} = req.body;
        const userExists = await user.findById(userId);
        if (!userExists) {
          return res.status(404).json({ message: 'User not found' });
        }
        //new post
        const newPost = new post({
            title,
            content,
            author: userId  // Store the user's ObjectId as reference
          });

          await newPost.save();
          res.status(201).json({
            message: 'Post created successfully',
            post: newPost
          });
    }catch (error) {
        res.status(500).json({ error: error.message });
      }
})

app.listen(PORT, () => {
    console.log(`app is listening on http://localhost:${PORT}`);
})