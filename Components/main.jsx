import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../Components/App.jsx'
// import './index.css'


//Google oauth2 integration
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = "530605452580-8bmv8e4ujruj5vhniiot4e20798ppdun.apps.googleusercontent.com"; // Replace with your actual Client ID


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    <App />
    </GoogleOAuthProvider>

  </StrictMode>,
)
