import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

// Import auth routes with .js extension
import authRoutes from './routes/auth.js';

//import mealtypes.js route
import mealtypeRoutes from './routes/mealtypes.js';



// Load environment variables
dotenv.config();

const app = express();

//images-folder
app.use('/src/assets', express.static(path.join(process.cwd(), 'src/assets'))); // Use process.cwd() for ES modules


// Middleware
app.use(express.json());
app.use(cors({
  // origin: 'http://localhost:5173', // Your frontend URL
  origin: '*', // Temporarily allow all origins
}));
app.use(helmet());
app.use(morgan('dev'));


// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Use the auth routes with the correct path prefix
app.use('/api/auth', authRoutes); 

app.use('/api/mealtypes', mealtypeRoutes);






// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Base route for health check or testing
app.get('/', (req, res) => {
  res.send('Welcome to the food delivery app!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server start
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


