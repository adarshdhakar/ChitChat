import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  return (
    <div id="carouselExampleAutoplaying" className="carousel slide carousel-container" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="work-chat-concept-illustration_114360-1071.avif" className="d-block carousel-image" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://marketplace.canva.com/EAFxVILyAMI/1/0/1600w/canva-blue-and-white-digitalism-testimonial-instagram-post-qnPvVbnYCQg.jpg" className="d-block carousel-image" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="hero_section_img.jpg" className="d-block carousel-image" alt="..."/>
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
