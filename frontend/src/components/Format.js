'use client';
import Navbar from './NavBar';
import Footer from './Footer';

import React, { useEffect } from 'react';

const HomePage = ({children}) => {
  useEffect(() => {
    // Import Bootstrap JavaScript
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default HomePage;
