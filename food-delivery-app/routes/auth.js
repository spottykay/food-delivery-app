import express from 'express';
import { loginUser, registerUser } from '../controller/user.controller.js';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export default router;




