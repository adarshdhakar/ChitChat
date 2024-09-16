import React from 'react';
import styles from '../styles/HeroSection.module.css';

const HeroSection = () => {
    return (
        <>
            <div className={`row ${styles.cardContainer}`}>
                <div className={`card ${styles.cardStyle}`}>
                    <div className={styles.cardOverlay}>
                        <p className={styles.cardText}>
                            "Smart Messaging, AI-Powered Assistance, and Seamless Video Calling - Revolutionize Your Conversations!"
                        </p>
                    </div>
                    <div className={styles.buttonContainer}>
                            <a href="#get-started" className={`${styles.button} ${styles.getStarted}`}>Get Started</a>
                            <a href="#learn-more" className={`${styles.button} ${styles.learnMore}`}>Learn More</a>
                        </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
