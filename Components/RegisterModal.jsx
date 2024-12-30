import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import axios from 'axios'; // Commented out axios import

import {Container, Row,  Col} from 'react-bootstrap';


import GoogleLoginComponent from './GoogleLoginComponent.jsx';

import FacebookLoginComponent from './FacebookLoginComponent.jsx';



const RegisterModal = ({ show, handleClose }) => {
    // const [name, setName] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages


    // Commented out the async function for axios request
    const handleRegister = async (e) => {
        e.preventDefault();

        setErrorMessage(''); // Reset error message before each registration attempt
        try {
            const response = await axios.post('http://localhost:5010/api/auth/register', {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                mobileNumber,
            });

            console.log('Registration successful:', response.data);
            handleClose(); // Close the modal after successful registration

        }  
        
        catch (error) {
            // Set the error message to display on the frontend
            setErrorMessage(error.response ? error.response.data.msg : error.message);
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}
        style={{
         
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '30px 20px',
                maxWidth: '700px',
                width: '100%',
                zIndex: 1000,
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                zIndex: 999,
            },
            
           }
           
           }>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
                <Row>
                    <Col>
                    <GoogleLoginComponent/>
                    <FacebookLoginComponent />
                    </Col>



                    <Col>
                      {/* Display error message if there's any */}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

<Form onSubmit={handleRegister}>
         

        
        <Form.Group controlId="formfirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required
            />
        </Form.Group>


        <Form.Group controlId="formlastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                required
            />
        </Form.Group>




        <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </Form.Group>



        <Form.Group controlId="formmobileNumber">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter your phone number"
                value={mobileNumber}
                onChange={(e) => setmobileNumber(e.target.value)}
                required
            />
        </Form.Group>

        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </Form.Group>
        <Form.Group controlId="formconfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Confirm your password by re-entering here"
                value={confirmPassword}//this is where you call the state functions created in the controller js
                onChange={(e) => setconfirmPassword(e.target.value)}
                required
            />
        </Form.Group>
        <Button variant="primary" type="submit">Register</Button>
    </Form>
                    </Col>
                </Row>
            </Container>


              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegisterModal;
