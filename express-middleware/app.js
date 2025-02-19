const express = require('express');
const url = require('url');
const app = express();
const port = 8000;

// middleware to check access control

const checkAccessControl = (req, res, next) => {
    try {
        const {pwd, role} = req.query;
        if(!pwd || !role){
          return  res.status(403).send('Forbidden');
        }
        //check admin details
        if (role.toLowerCase() === "admin" && pwd === 'hello@1234'){
            req.userRole = 'admin'
            return next();
        }

        //check user details
        if(role.toLowerCase() === 'user' && pwd === 'user@1234'){
            req.userRole = 'user';
            return next();
        }

        //invalid details 
        return res.status(403).send('Forbidden')

      } catch (error){
        console.error('Access control access :', error)
        return res.status(403).send('Forbidden');
      }
};

// route handler for /users/id

app.get('/users/:id', (req, res) => {

    if(Object.keys(req.query).length === 0){
        return res.status(403).send('Forbidden')
    }

      // If middleware passed, req.userRole will be set
      if (req.userRole) {
        return res.send(`welcome ${req.userRole}`);
    }
     // Fallback forbidden response
     return res.status(403).send('forbidden');
})

// Apply middleware to users route
app.use('/users/:id', checkAccessControl);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.use((error, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})
