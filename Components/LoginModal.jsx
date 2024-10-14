// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const LoginModal = ({ show, handleClose }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     // Placeholder for login handling (e.g., make API request)
//     const [error, setError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5010/api/auth/login', {
//                 email,
//                 password,
//             });
//             console.log('Login successful:', response.data);
//             handleClose(); // Close the modal after successful login
//         } catch (error) {
//             setError(error.response ? error.response.data.message : 'Login error. Please try again.');
//             console.error('Login error:', error.response ? error.response.data : error.message);
//         }
//     };
    
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Login</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//     {error && <div className="alert alert-danger">{error}</div>}
//     <Form onSubmit={handleLogin}>
//         <Form.Group controlId="formEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//         </Form.Group>

//         <Form.Group controlId="formPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//         </Form.Group>
//         <Button variant="primary" type="submit">Login</Button>
//     </Form>
// </Modal.Body>

//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default LoginModal;




































import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Ensure axios is imported

// Set the app element for accessibility
Modal.setAppElement('#root');

const LoginModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log('Logging in with:', { email, password });
        const response = await axios.post('http://localhost:5010/api/auth/login', {
            email,
            password,
        });
        
        
        localStorage.setItem('token', response.data.token);
        handleClose();
    } catch (error) {
        setError(error.response?.data?.msg || 'Login error. Please try again.');
    } finally {
        setLoading(false);
    }
};

    
    

    return (
        <Modal
            isOpen={show}
            onRequestClose={handleClose}
            contentLabel="Login Modal"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    maxWidth: '400px',
                    width: '100%',
                    zIndex: 1000,
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 999,
                },
            }}
        >
            {/* Header with custom close button (X) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Login</h2>
                <button
                    onClick={handleClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        lineHeight: 1,
                    }}
                >
                    &times;
                </button>
            </div>

            {/* Display error message if there's any */}
            {error && <div className="alert alert-danger">{error}</div>}

            <Form onSubmit={handleLogin}>
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
                <Button variant="primary" type="submit" disabled={loading}>
    {loading ? 'Logging in...' : 'Login'}
</Button>
            </Form>
        </Modal>
    );
};

export default LoginModal;
