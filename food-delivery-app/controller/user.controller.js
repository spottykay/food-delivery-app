// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, mobileNumber, } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobileNumber) {
        return res.status(400).json({ msg: 'Please provide name, email, and password' });
    }

    // Check if the user already exists
    let user = await User.findOne({ email: email.trim() });

    if (user) {
       return res.status(400).json({ msg: 'User already exists' });
    }



    if (password !== confirmPassword){
        return res.status(400).json({msg: 'Passwords do not match'})
    }




    try {

      
        user = new User({ firstName, lastName,  email: email.trim(), mobileNumber, password, });
        await user.save();



        // Payload for JWT
        const payload = { user: { id: user.id } };

        // Sign JWT and return the token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Token signing error:', err);
                return res.status(500).json({ msg: 'Token signing error' });
            }
            res.json({ token, user });
        });
    } catch (err) {
        console.error('Server error during registration:', err.message, err.stack);
        res.status(500).send('Server error');
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if ( !email || !password  ) {
        return res.status(400).json({ msg: 'Please provide both email and password' });
    }


    try {
        // Find the user by email
        const user = await User.findOne({ email: email.trim() });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials _' });
        }
        // Compare the provided password with the stored hash
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
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
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
}



export {
    registerUser,
    loginUser
  }