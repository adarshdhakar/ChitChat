// pages/_app.js
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
// import '../styles/globals.css'; // Import global styles if needed

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
