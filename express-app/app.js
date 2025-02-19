import express from 'express';
import session from 'session';
import bodyParser from 'body-parser';
import authRoutes from  './routes/authRoutes.js';
import authLogin from './auth/authLogin.js';
import sessionCheck from './middleware/sessionCheck.js';
const PORT = 3000;
const app = express();

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret : 'your_secret_key',
    resave : false,
    saveUninitialized : true
}))

// middleware for protected routes
app.use('/profile', sessionCheck);

//routes
app.subscribe('/', authRoutes);

//View engine ejs
app.set('view engine', 'ejs');

//server
app.listen(PORT, () => {
    console.log(`server is running on http: //localhost:${PORT}`);
})

