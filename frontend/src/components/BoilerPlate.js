// src/components/BoilerPlate.js
import React from 'react';
import Head from 'next/head';
import '../styles/global.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BoilerPlate = ({ children }) => {
  return (
    <>
      <Head>
        <title>Chit Chat</title>
        <meta name="description" content="Your messaging service" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="main-content">
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js" integrity="sha512-KyZXEAg3QhqLMpG8r+Knujsl5+Qk1krvBhj8soB5H5Qnh0AY0sQ0F+ilwKn2r+e1ZZt7mYjKt5xZT/IlZ+HV3A==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script> */}
      {children}
      </main>
    </>
  );
};

export default BoilerPlate;
