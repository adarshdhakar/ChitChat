import React from 'react';
import styles from '../styles/Testimonials.module.css';

const Testimonials = () => {
  return (
    <div id="carouselExampleAutoplaying" className={`carousel slide ${styles.carouselContainer}`} data-bs-ride="carousel">
      <div className="carousel-inner">
      <div className="carousel-item active">
          <img src="https://img.freepik.com/free-vector/work-chat-concept-illustration_114360-1071.jpg?t=st=1726386041~exp=1726389641~hmac=8d75bd52fcb199821ea87ae1e91b936bb1dff5b657e0d549bc65e58047dfe069&w=996" className={`d-block ${styles.carouselImage}`} alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://marketplace.canva.com/EAFxVILyAMI/1/0/1600w/canva-blue-and-white-digitalism-testimonial-instagram-post-qnPvVbnYCQg.jpg" className={`d-block ${styles.carouselImage}`} alt="..."/>
        </div>
        
        <div className="carousel-item">
          <img src="https://www.canva.com/p/templates/EAFUdYqHyx0-green-modern-customer-testimonials-instagram-post/#" className={`d-block ${styles.carouselImage}`} alt="..."/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Testimonials;
