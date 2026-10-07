# Food Delivery App

A full-stack MERN food ordering app, built as my capstone project during the Full Stack Web Development Internship at Edureka (2024). Users can browse restaurants by meal type and location, filter results, view restaurant details and menus, and sign in with email/password, Google or Facebook.

## Tech Stack

**Frontend:** React 18, Vite, React Router, React Bootstrap, Axios
**Backend:** Node.js, Express, MongoDB with Mongoose
**Auth:** JWT, bcrypt password hashing, Google OAuth, Facebook login (Passport.js)
**Security:** Helmet, CORS restricted to the client URL, secrets loaded from environment variables

## Features

- Browse restaurants by meal type (breakfast, lunch, dinner, drinks, desserts and more)
- Search restaurants by location
- Filter results on the listing page
- Restaurant detail pages with menu items and an image gallery
- Register and log in with email and password (JWT), Google or Facebook
- REST API structured around models, routes and controllers

## Project Structure

```
├── Components/            # React components and styles
├── src/assets/            # Images
├── index.html             # Vite entry
└── food-delivery-app/     # Express API
    ├── controller/
    ├── middleware/
    ├── models/
    ├── routes/
    └── index.js
```

## Getting Started

### Backend

```bash
cd food-delivery-app
npm install
cp .env.example .env   # then fill in your own values
npm run dev
```

The API runs on `http://localhost:5010`.

### Frontend

```bash
npm install
cp .env.example .env   # add your Google OAuth client ID
npm run dev
```

The app runs on `http://localhost:5173`.

## API Endpoints

| Route | Description |
| --- | --- |
| `/api/auth` | Register, login and social login |
| `/api/mealtypes` | Meal type categories |
| `/api/restaurants` | Restaurant listing, filtering and details |
| `/api/locations` | Locations for search |
| `/api/menuitems` | Restaurant menu items |

## Author

**David Ogunbola**, WordPress & web developer
[caniondigitals.com](https://caniondigitals.com) · [LinkedIn](https://linkedin.com/in/david-olaoluwa-18bb41137)
