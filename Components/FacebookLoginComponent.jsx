import React from 'react';

const FacebookLoginComponent = () => {
    const handleFacebookLogin = () => {
        // Redirect to your backend route for Facebook login
        window.open('http://localhost:5010/auth/facebook', '_self');
    };

    return (
        <button onClick={handleFacebookLogin} className="btn btn-primary">
            Login with Facebook
        </button>
    );
};

export default FacebookLoginComponent;
