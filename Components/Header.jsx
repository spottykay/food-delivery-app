// // import {Link} from 'react-router-dom'
// import React, {useState, useEffect} from 'react'
// import {Navbar, Nav, Container, Button} from 'react-bootstrap'
// import {useLocation} from 'react-router-dom'
// import "./Styles/Header.css"
// import RegisterModal from './RegisterModal'
// import LoginModal from './LoginModal'



// function Header(){

//     const location = useLocation();
//     const [backgroundStyle, setBackgroundStyle] = useState('transparent-header');//home initial style state
//     const [showLogo, setShowLogo] = useState(true);


//     const setHeaderStyle = () => {
//         if (location.pathname === '/'){
//             setBackgroundStyle('transparent-header');
//             setShowLogo(false)

//         }

//         else if (location.pathname.startsWith('/filter') || location.pathname === '/details'){
//             setBackgroundStyle('red-header');
//             setShowLogo(true);
//         }

   









//     } 

       


// //useEffect changes
// useEffect(() => {
//     setHeaderStyle();//call and must be only when location.pathname changes
//     }, [location.pathname])




//     const [showRegisterModal, setShowRegisterModal] = useState(false);
//     const handleShow = (e) => setShowRegisterModal(true);
//     const handleClose = () => setShowRegisterModal(false);


//     // Login Modal State
//     const [showLoginModal, setShowLoginModal] = useState(false);
//     const handleShowLogin = () => setShowLoginModal(true);
//     const handleCloseLogin = () => setShowLoginModal(false);


// return(


// <header className={backgroundStyle}>
// <Navbar>
// <Container className="d-flex justify-content-space-between">
    

//     {showLogo && (
// <Navbar.Brand href="/">
// <img src="../src/assets/edureka-logo.jpg" 
// alt="Welcome to Zomato"
// width="100"
// height="auto"
// className="logo-img"
// />
// </Navbar.Brand>
//     )}


// <Navbar.Toggle/>
// <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-end'>

// {/* <Nav className="me-auto">
//     <Nav.Link href="/">Home</Nav.Link>
//     <Nav.Link href="/filter">Home</Nav.Link>
//     <Nav.Link href="/details">Home</Nav.Link>
// </Nav> */}


// <div className="header-buttons">
// <Button variant="outline-light" href="#" className="me-2" onClick ={handleShowLogin}>Login</Button>

// <Button variant="light" href="#" className="" onClick={handleShow}>Create an Account</Button>
// <RegisterModal show={showRegisterModal} handleClose={handleClose}/>
// <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />


// </div>

// </Navbar.Collapse>

// </Container>

// </Navbar>
// </header>


// )





// }



// // function Header(){
// //     return(
// //         <nav className='navBar'>
// //             <ul>
// //                 <li>
// //                 <Link to= '/'>Home</Link>
// //                 <Link to= '/filter'>Filter</Link>
// //                 </li>
// //             </ul>
// //         </nav>
// //     )
// // }


// export default Header;

















import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "./Styles/Header.css";
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

function Header() {
  const location = useLocation();
  const [backgroundStyle, setBackgroundStyle] = useState('transparent-header');
  const [showLogo, setShowLogo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');

  // Update header style based on location
  useEffect(() => {
    const setHeaderStyle = () => {
      if (location.pathname === '/') {
        setBackgroundStyle('transparent-header');
        setShowLogo(false);
      } else if (location.pathname.startsWith('/filter') || location.pathname === '/details') {
        setBackgroundStyle('red-header');
        setShowLogo(true);
      }
    };
    setHeaderStyle();
  }, [location.pathname]);

  // Check for user login status on component mount
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user')); // Retrieve user info from localStorage
    if (userInfo) {
      setIsLoggedIn(true);
      setFullName(`${userInfo.firstName} ${userInfo.lastName}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    setIsLoggedIn(false);
    setFullName('');
  };

  // State and handlers for Modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const handleShowRegister = () => setShowRegisterModal(true);
  const handleCloseRegister = () => setShowRegisterModal(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  return (
    <header className={backgroundStyle}>
      <Navbar>
        <Container className="d-flex justify-content-between">
          {showLogo && (
            <Navbar.Brand href="/">
              <img
                src="../src/assets/edureka-logo.jpg"
                alt="Welcome to Zomato"
                width="100"
                height="auto"
                className="logo-img"
              />
            </Navbar.Brand>
          )}

          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
            <div className="header-buttons">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="user-name-link me-2">
                    {fullName}
                  </Link>
                  <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="outline-light" onClick={handleShowLogin} className="me-2">Login</Button>
                  <Button variant="light" onClick={handleShowRegister}>Create an Account</Button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <RegisterModal show={showRegisterModal} handleClose={handleCloseRegister} />
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
    </header>
  );
}

export default Header;
