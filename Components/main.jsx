import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../Components/App.jsx'
// import './index.css'


//Google oauth2 integration
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    <App />
    </GoogleOAuthProvider>

  </StrictMode>,
)
