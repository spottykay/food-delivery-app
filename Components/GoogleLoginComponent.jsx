import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = () => {
    const handleLoginSuccess = (credentialResponse) => {
        console.log('Login Success:', credentialResponse);
        // Here you can send the credentialResponse to your backend for verification
    };

    const handleLoginError = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginError}
                cookiePolicy="single_host_origin"
            />
        </div>
    );
};

export default GoogleLoginComponent;
