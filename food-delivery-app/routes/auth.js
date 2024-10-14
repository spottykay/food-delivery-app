


import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure the .js extension for ES module import

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Registration attempt for email:', email); // Log the email being registered

    // Validate input
    if (!name || !email || !password) {
        console.log('Missing name, email, or password'); // Log if any required field is missing
        return res.status(400).json({ msg: 'Please provide name, email, and password' });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email: email.trim() });
        if (user) {
            console.log('User already exists for email:', email);
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Original password:', password); // Log original password
        console.log('Hashed password:', hashedPassword); // Log hashed password

        // Create new user
        user = new User({ name, email: email.trim(), password: hashedPassword });
        await user.save();

        // Payload for JWT
        const payload = { user: { id: user.id } };

        // Sign JWT and return the token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Token signing error:', err);
                return res.status(500).json({ msg: 'Token signing error' });
            }
            console.log('Registration successful for email:', email);
            res.json({ token });
        });
    } catch (err) {
        console.error('Server error during registration:', err.message);
        res.status(500).send('Server error');
    }
});







// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    console.log('Login attempt for email:', email); // Log the email being logged in

    // Validate input
    if (!email || !password) {
        console.log('Missing email or password'); // Log if email or password is missing
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: email.trim() });
        
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ msg: 'Email does not exist' });
        }

        console.log('User found, attempting password comparison');
        console.log('Plain password:', password); // Log the input password
        console.log('Hashed password stored:', user.password); // Log the stored hashed password
        
        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch); // Log the comparison result

        if (!isMatch) {
            console.log('Invalid password for email:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT payload
        const payload = { user: { id: user.id } };
        
        // Sign the JWT token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Token generation failed:', err);
                return res.status(500).json({ msg: 'Token generation failed' });
            }

            console.log('Login successful for email:', email);
            res.json({ token });
        });
    } catch (err) {
        console.error('Server error during login:', err);
        res.status(500).send('Server error');
    }
});






export default router;




