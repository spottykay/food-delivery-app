import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home.jsx';
import Filter from './Filter.jsx';
import Details from './Details.jsx';
// import LightboxGallery from './LightboxGallery.jsx';
import Header from './Header.jsx';
import RegisterModal from './RegisterModal.jsx';
import LoginModal from './LoginModal.jsx';
import Profile from './profile.jsx';
// import RestaurantSearch from './RestaurantSearch.jsx';

function App() {






  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/gallery" element={<LightboxGallery />} /> */}
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/filter/:category" element={<Filter />} />
        {/* { <Route path="/search" element={<RestaurantSearch />} /> } */}

      </Routes>
    </Router>
  );
}

export default App;
