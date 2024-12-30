

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';

// Facebook-passportjs integration
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';





// Load environment variables
dotenv.config();

const app = express();/*this must be called here before any route will be added, if not it will return error. 
I cannot use app method eg app.use() before declaring so I'm declaring it here before importing any route
*/




// Import auth routes
import authRoutes from './routes/auth.js';
import mealtypeRoutes from './routes/mealtypes.js';

import restaurantRoutes from './routes/restaurants.js';

//import location model
import Location from './models/Location.js';
Location;//I added this Location; to just force it so vscode will not give me location is declared but it's value is never read

import MenuItem from './models/MenuItem.js';
MenuItem; // Force registration



//Import profile




// Serve static files from the "src/assets" folder
app.use('/src/assets', express.static(path.join(process.cwd(), 'src/assets')));

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Temporarily allow all origins
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

// Session middleware (Must be added before passport.session())
app.use(session({
  secret: 'your_secret_key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user (used for maintaining login sessions)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Facebook strategy
passport.use(new FacebookStrategy({
  clientID: '564337422663123',
  clientSecret: 'e4b761a12af5db689760ef702c3a36ed',
  callbackURL: "http://localhost:5010/api/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
},
  function (accessToken, refreshToken, profile, done) {
    // You can return the profile or save it to your database
    return done(null, profile);
  }
));

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use the auth routes with the correct path prefix
app.use('/api/auth', authRoutes); 
app.use('/api/mealtypes', mealtypeRoutes);

app.use('/api/restaurants', restaurantRoutes);


//import location routes
import locationRoutes from './routes/location.js';
app.use('/api/locations', locationRoutes);


//import menuitems route
import menuItemRoutes from './routes/menuitems.js';
app.use('/api/menuitems', menuItemRoutes);




<<<<<<< HEAD



// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));
=======
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
>>>>>>> 25841ca302ba3c7a5837e68c343b35eb16a7f541

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
