// middleware/authMiddleware.js
//@ts-ignore
import jwt from 'jsonwebtoken';

import session from 'express-session';


const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};





// Session middleware (Make sure this comes before passport.session())
app.use(session({
  secret: 'e4b761a12af5db689760ef702c3a36ed', // You can use any secure string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set this to true if you're using HTTPS
}));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());



export default authMiddleware;