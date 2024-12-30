// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// const RestaurantSearch = () => {
//   const [locations, setLocations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [restaurants, setRestaurants] = useState([]);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     // Fetch locations for dropdown
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get('/api/location');
//         setLocations(response.data);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };
//     fetchLocations();

//     // Check URL for query parameters
//     const locationId = searchParams.get('location');
//     const term = searchParams.get('term');
//     if (locationId) setSelectedLocation(locationId);
//     if (term) setSearchTerm(term);

//     if (locationId || term) fetchRestaurants(locationId, term);
//   }, [searchParams]);

//   const fetchRestaurants = async (locationId, term) => {
//     try {
//       const response = await axios.get('/api/restaurant/search', {
//         params: { locationId, searchTerm: term },
//       });
//       setRestaurants(response.data);
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//     }
//   };

//   const handleSearch = () => {
//     // Update URL with query parameters
//     navigate(`/search?location=${selectedLocation}&term=${searchTerm}`);
//   };

//   return (
//     <div>
//       <select
//         value={selectedLocation}
//         onChange={(e) => setSelectedLocation(e.target.value)}
//       >
//         <option value="">Select Location</option>
//         {locations.map((location) => (
//           <option key={location._id} value={location._id}>
//             {location.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="text"
//         placeholder="Search by name or cuisine"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <button onClick={handleSearch}>Search</button>

//       <div>
//         <h3>Results:</h3>
//         <ul>
//           {restaurants.map((restaurant) => (
//             <li key={restaurant._id}>
//               {restaurant.name} - {restaurant.cuisines.join(', ')}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default RestaurantSearch;
