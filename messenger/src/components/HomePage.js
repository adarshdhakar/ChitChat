'use client';
import Navbar from './NavBar';
import HeroSection from './HeroSection';
import Features from './Features';
import Testimonials from './Testimonials';
import Footer from './Footer';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';

import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    // Import Bootstrap JavaScript
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <>
      <Navbar />
      <div className="Title">
        <h1>Welcome to ChitChat...</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 section">
            <HeroSection />
          </div>
          <div className="col-md-6 section">
            <Features />
          </div>
        </div>

        <div className="row Testimonials">
          <Testimonials />
        </div>
        <div>
          <HowItWorks/>
          <br/>
          <Pricing/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
