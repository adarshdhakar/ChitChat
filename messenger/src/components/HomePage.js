// src/components/HomePage.js
import React from 'react';
import Navbar from './NavBar'; // Import Navbar component

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="container">
      <h1>Welcome to Chit Chat</h1>
      <p>Your messaging service platform</p>
      <button className = "btn btn-dark">Hello</button>
    </div>
    </>
  );
};

export default HomePage;
