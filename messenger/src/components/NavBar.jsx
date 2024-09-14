// components/Navbar.jsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">toggler</span>
      </button>

      <div className="" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    </div>
  );
};

export default Navbar;



/*
<nav classNameName="navbar navbar-expand-lg navbar-dark bg-light">
      <a classNameName="navbar-brand" href="#">Chit Chat</a>
      <button classNameName="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span classNameName="navbar-toggler-icon"></span>
      </button>
      <div classNameName="collapse navbar-collapse" id="navbarNav">
        <ul classNameName="navbar-nav">
          <li classNameName="nav-item">
            <Link href="/" passHref classNameName="nav-link">Home</Link>
          </li>
          <li classNameName="nav-item">
            <Link href="/features" passHref classNameName="nav-link">Features</Link>
          </li>
          <li classNameName="nav-item">
            <Link href="/about" passHref classNameName="nav-link">About</Link>
          </li>
          <li classNameName="nav-item">
            <Link href="/contact" passHref classNameName="nav-link">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
*/