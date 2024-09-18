// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/NavBar.module.css';

const Navbar = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch authentication status from API
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth', { // Updated URL
        method: 'GET',
        credentials: 'include', // Ensure cookies are sent
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Authentication Data:', data); // Debugging
        setIsLoggedIn(data.isAuthenticated);
      } else {
        console.log('Failed to fetch authentication status'); // Debugging
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top custom-navbar">
      <div className="container-fluid">
        <Link href="/" passHref>
          <span className="navbar-brand d-flex align-items-center">
            ChitChat
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" passHref>
                <span className="nav-link" aria-current="page">Home</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Features
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/chat/history" passHref>
                    <span className="dropdown-item">Start Chatting</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    <span className="dropdown-item">Create a Group</span>
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link href="#" passHref>
                    <span className="dropdown-item">Coming Soon</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">AI Assist</a>
            </li>
            <li className="nav-item">
              <Link href="/about" passHref>
                <span className="nav-link" aria-current="page">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" passHref>
                <span className="nav-link" aria-current="page">Contact</span>
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success custom-search-button" type="submit">Search</button>
          </form>
          {/* Profile Dropdown as an Icon */}
          <div className="d-flex ms-3">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-user text-light fa-2x"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {!isLoggedIn ? (
                  <>
                    <li><Link href="/signup" passHref><span className="dropdown-item">Signup</span></Link></li>
                    <li><Link href="/login" passHref><span className="dropdown-item">Login</span></Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/logout" passHref><span className="dropdown-item">Logout</span></Link></li>
                    <li><Link href="/profile" passHref><span className="dropdown-item">Edit Profile</span></Link></li>
                  </>
                )}
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
