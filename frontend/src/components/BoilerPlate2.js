// src/components/BoilerPlate.js
'use client';
import Navbar from './NavBar';
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
      </Head>
      <main className="main-content">
      <Navbar />
      {children}
      </main>
    </>
  );
};

export default BoilerPlate;
