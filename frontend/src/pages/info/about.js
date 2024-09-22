import React from 'react';
import BoilerPlate from '../../components/BoilerPlate';

const About = () => {
    return (
        <BoilerPlate>
                <div className="container mt-5 bg p-4 rounded shadow-sm">
                    <h1 className="mb-4 text-dark">About Us</h1>
                    <p className="text-dark">Welcome to Chat Forge, the ultimate messaging service designed to connect people effortlessly. Our mission is to provide a seamless and engaging communication experience through our platform.</p>
                    
                    <h2 className="text-dark">Our Team</h2>
                    <p className="text-dark">Meet the talented individuals behind Chat Forge:</p>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card p-3 shadow-sm">
                                <h3 className="card-title">Adarsh Dhakar</h3>
                                <p className="card-text">Founder & Lead Developer</p>
                            </div>
                        </div>
                        {/* Add more team members here */}
                    </div>
                    <h2 className="text-secondary">Our Story</h2>
                    <p className="text-secondary">Chat Forge was created with the vision of bringing people closer through innovative messaging solutions. Our journey began with a simple idea and has evolved into a comprehensive platform used by thousands.</p>
                    <h2 className="text-secondary">What's Next</h2>
                    <p className="text-secondary">We are continuously working on enhancing our platform with new features and improvements. Stay tuned for updates!</p>
                </div>
        </BoilerPlate>
    );
};

export default About;
