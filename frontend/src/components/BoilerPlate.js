// src/components/BoilerPlate.js
'use client';
import Navbar from './NavBar';
import Footer from './Footer';
import React, { useEffect } from "react";
import Head from 'next/head';
import '../styles/global.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BoilerPlate = ({ children }) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Head>
        <title>Chit Chat</title>
        <meta name="description" content="Your messaging service" />
      </Head>
      <main className="main-content">
      <Navbar />
      {children}
      <Footer />
      </main>
    </>
  );
};

export default BoilerPlate;


