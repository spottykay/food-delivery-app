import express from 'express';
import { loginUser, registerUser } from '../controller/user.controller.js';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);




import passport from 'passport';

// Route for Facebook authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook callback route
router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond with data
    res.redirect('/'); // Redirect to your desired route on success
  }
);
    







export default router;




