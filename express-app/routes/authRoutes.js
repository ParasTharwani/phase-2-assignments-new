import express from 'express';
const router = express.Router();


// log-in  get
router.get('/login', (req,res) => {
    res.render('login')
})

//login post
router.post('/login', (req, res) => {
    const { username } = req.body;
    if (username) {
        req.session.user = username;
        return res.redirect('/profile');
    }
    res.redirect('/login')
})

//profile veiw Route

router.get('/profile', (req, res) => {
    res.render('profile', { user: req.session.user });
})

//logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});
export default router;
