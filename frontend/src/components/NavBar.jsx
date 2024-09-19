// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/NavBar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setCurrUser] = useState(null);
  let currUser;
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);

        if (data.isAuthenticated && data.userId) {
          await findUser(data.userId);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsLoggedIn(false);
    }
  };

  // const findUser = async (userId) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
  //       method: 'GET',
  //       credentials: 'include',
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setCurrUser(data);
  //     } else {
  //       console.log('Failed fetching userdata');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching userdata:', error);
  //   }
  // };
  const findUser = async (userId) => {
    console.log('Finding user with ID:', userId); // Debug line
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      currUser = data;
      // if (response.ok) {
      //   const data = await response.json();
      //   console.log('User data:', data); // Debug line
      //   setCurrUser(data);
      // } else {
      //   console.log('Failed fetching userdata');
      // }
    } catch (error) {
      console.error('Error fetching userdata:', error);
    }
  };
  

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top custom-navbar">
      <div className="container-fluid">
        <Link href="/" passHref className="navbar-brand d-flex align-items-center">
          ChitChat
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
              <Link href="/" passHref className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Features
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/chats/create" passHref className="dropdown-item">Start Chatting</Link>
                </li>
                <li>
                  <Link href="#" passHref className="dropdown-item">Create a Group</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link href="#" passHref className="dropdown-item">Coming Soon</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">AI Assist</a>
            </li>
            <li className="nav-item">
              <Link href="info/about" passHref className="nav-link" aria-current="page">About</Link>
            </li>
            <li className="nav-item">
              <Link href="info/contact" passHref className="nav-link" aria-current="page">Contact</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success custom-search-button" type="submit">Search</button>
          </form>
          <div className="d-flex ms-3">
            <div className="text-light">
              {!isLoggedIn ? (
                <h6>Logged Out</h6>
              ) : (
                <h6>{currUser?.name}</h6>
              )}
            </div>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-user text-light fa-2x"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {!isLoggedIn ? (
                  <>
                    <li><Link href="/auth/signup" passHref className="dropdown-item">Signup</Link></li>
                    <li><Link href="/auth/login" passHref className="dropdown-item">Login</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/auth/logout" passHref className="dropdown-item">Logout</Link></li>
                    {/* <li><Link href={`/users/profile/${currUser._id}`} passHref className="dropdown-item">Profile</Link></li> */}
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
