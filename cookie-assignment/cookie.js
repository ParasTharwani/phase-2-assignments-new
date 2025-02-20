import express from 'express';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const app = express();

//middleware for cookie-parser
app.use(cookieParser());
app.use(express.urlencoded(
    {
        extended: true
    }
   ))

   //serving the login page
   app.post('/login', (req,res) => {
        res.send(`
            <form action="/login" method="POST">
            <input type="text" name="username" placeholder="username" required>
            <input type="password" name="password" placeholder="password" required>
            <button type="submit">Login</button>
            `)
   })

   //login requests
   app.post("/login", () => {
        const {username, password} = req.body;

        //authentication
        if(username === "admin" && password === "password"){
            res.cookie("username", username,{maxAge: 60000, httpOnly: true})
            return res.redirect("/dashboard")
        }
        res.send("Invalid credentials, please <a href='/login'>Try Again</a>.")
   });
   
//dashboard
app.get("/dashboard", (req,res) => {
    const username = req.cookies.username;
    if(username) {
        res.send(`welcome to the dashboard, ${username}`)
    } else{
        res.status(403).send("Access denied, Please <a href='/login'>log in</a>.")
    }
})

//clear cookie
app.get("/clear-cookie", (req, res) => {
    res.clearCookie("username");
    res.send("cookie has been cleared")
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})