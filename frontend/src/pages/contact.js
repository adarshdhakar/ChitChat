import React from 'react';
import BoilerPlate from '../components/BoilerPlate';

const Contact = () => {
    return (
        <BoilerPlate>
            <div className="container mt-5">
            <h1 className="mb-4">Contact Us</h1>
            <p>If you have any questions or feedback, feel free to reach out to us. We're here to help!</p>
            <form action="mailto:your-email@example.com" method="post" enctype="text/plain">
                
                <div className="mb-3 col-md-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required />
                </div>
                <div className="mb-3 col-md-12">
                    <label className="form-label">Subject</label>
                    <input type="text" className="form-control" name="subject" required />
                </div>
                <div className="mb-3  col-md-12">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" name="message" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
            <h2 className="mt-5 text-light">Alternative Contact</h2>
            <div>
                <p className="text-light">Email: <a href="mailto:support@example.com">support@example.com</a></p>
            <p className="text-light">Phone: +1-234-567-890</p>
            </div>
            <div>
                
            </div>
        </div>
        </BoilerPlate>
    );
};

export default Contact;


