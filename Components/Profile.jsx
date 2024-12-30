import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Styles/Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch user data from backend
        axios.get('http://localhost:5010/api/auth/profile')
            .then(response => setUserData(response.data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        axios.put('http://localhost:5010/api/auth/profile', userData)
            .then(response => {
                setUserData(response.data);
                setIsEditing(false);
                console.log('Profile updated successfully:', response.data);
            })
            .catch(error => {
                setErrorMessage(error.response ? error.response.data.msg : error.message);
                console.error('Error updating profile:', error);
            });
    };

    return (
        <Container className="profile-container">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="profile-card">
                        <Card.Header as="h5">My Profile</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSave}>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                                <Form.Group as={Row} controlId="formFirstName">
                                    <Form.Label column sm={3}>First Name</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={userData.firstName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formLastName">
                                    <Form.Label column sm={3}>Last Name</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formEmail">
                                    <Form.Label column sm={3}>Email</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formMobileNumber">
                                    <Form.Label column sm={3}>Mobile Number</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="mobileNumber"
                                            value={userData.mobileNumber}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <div className="profile-actions">
                                    {isEditing ? (
                                        <>
                                            <Button variant="primary" type="submit">Save</Button>
                                            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                        </>
                                    ) : (
                                        <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
