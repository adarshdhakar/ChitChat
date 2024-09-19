import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import styles from '../styles/Footer.css'; // Create this CSS module for styling

const Footer = () => {
  return (
    <footer className={`bg-dark text-light py-4 ${styles.footer}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-7 mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@chitchat.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="col-md-5 mb-3">
            <h5>Newsletter Signup</h5>
            <form>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-md-7 mb-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Privacy Policy</a></li>
              <li><a href="#" className="text-light">Terms of Service</a></li>
            </ul>
          </div>
          <div className="col-md-5 mb-3">
            <h5>About Us</h5>
            <p>ChitChat is your go-to platform for smart messaging and AI-powered assistance. Connect with friends and colleagues seamlessly.</p>
          </div>
        </div>
        <hr/>
        <div className="d-flex flex-column">
        <div className="col-12 text-center">
            <br/>
            <h5>Follow Us</h5>
            <div className = "d-flex justify-content-center">
            <div className="d-flex">
            <a href="#" className="text-light me-2"><FaTwitter size={24} /></a>
            <a href="#" className="text-light me-2"><FaFacebookF size={24} /></a>
            <a href="#" className="text-light"><FaInstagram size={24} /></a>
            </div>
            </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; {new Date().getFullYear()} ChitChat. All rights reserved.</p>
          </div>
        </div>
        <hr/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
