"use client";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import BoilerPlate from "./BoilerPlate";
import React, { useEffect } from "react";
import Image from "next/image"; // If using Next.js for image optimization
import "../styles/HomePage.module.css";

const HomePage = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <BoilerPlate>
        {/* Logo and Title Section */}
        <br/>
        <div className="text-center my-5 mt-5">
          {/* <h1 className="display-4 fw-bold mb-4 text-light">Welcome to ChitChat...</h1> */}
          <div className="Title">
          <h1 className="d-flex">
            <div>Welcome to ChitChat...</div>
          </h1>
        </div>
          {/* <Image 
            src="/logo.png" 
            alt="ChitChat Logo" 
            width={150} 
            height={150} 
            className="img-fluid rounded-circle" 
          /> */}
        </div>

        {/* Content Sections */}
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-6 mb-4">
              <HeroSection />
            </div>
            <div className="col-md-6 mb-4">
              <Features />
            </div>
          </div>
          <br/>
          <br/>
          <div className="row gy-4">
            <div className="col-12">
              <Testimonials />
            </div>
          </div>
            <br/>
            <br/>
          <div className="row gy-4">
            <div className="col-12">
              <HowItWorks />
            </div>
            <div className="col-12">
              <Pricing />
            </div>
          </div>
        </div>
      </BoilerPlate>
    </>
  );
};

export default HomePage;
