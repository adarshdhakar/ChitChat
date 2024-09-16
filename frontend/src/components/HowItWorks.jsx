import React from 'react';
import styles from '../styles/HowItWorks.module.css';

const HowItWorks = () => {
    return (
        <section className={styles.howItWorksContainer}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <div className={styles.stepsContainer}>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>1</div>
                    <h3 className={styles.stepTitle}>Sign Up</h3>
                    <p className={styles.stepDescription}>Create an account and set up your profile to get started.</p>
                </div>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>2</div>
                    <h3 className={styles.stepTitle}>Connect</h3>
                    <p className={styles.stepDescription}>Add your contacts and start connecting with others.</p>
                </div>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>3</div>
                    <h3 className={styles.stepTitle}>Enjoy</h3>
                    <p className={styles.stepDescription}>Use our features to enhance your communication and enjoy seamless interactions.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
