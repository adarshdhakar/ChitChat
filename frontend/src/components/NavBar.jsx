import React from 'react';
import Link from 'next/link'; // Import Next.js Link component
import '../styles/NavBar.module.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top custom-navbar">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">ChitChat</Link>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Features
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/chat">Start Chatting</a></li>
                <li><a className="dropdown-item" href="#">Create a Group</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Coming Soon</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">AI Assist</a>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link" aria-current="page">About</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link" aria-current="page">Contact</Link>
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
                <i className="fas fa-user"></i> {/* FontAwesome Profile Icon */}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link href="/signup" className="dropdown-item">Signup</Link></li>
                <li><Link href="/login" className="dropdown-item">Login</Link></li>
                <li><Link href="/logout" className="dropdown-item">Logout</Link></li>
                <li><a className="dropdown-item" href="#">Edit Profile</a></li>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
