import React from 'react';
import styles from '../styles/Pricing.module.css';

const Pricing = () => {
    return (
        <section className={styles.pricingContainer}>
            <h2 className={styles.sectionTitle}>Pricing Plans</h2>
            <div className={styles.pricingPlans}>
                <div className={styles.plan}>
                    <h3 className={styles.planTitle}>Basic</h3>
                    <p className={styles.planPrice}>$10 / month</p>
                    <ul className={styles.planFeatures}>
                        <li>Basic Features</li>
                        <li>Limited Support</li>
                        <li>Community Access</li>
                    </ul>
                    <a href="#signup" className={`${styles.button} ${styles.planButton}`}>Sign Up</a>
                </div>
                <div className={styles.plan}>
                    <h3 className={styles.planTitle}>Pro</h3>
                    <p className={styles.planPrice}>$30 / month</p>
                    <ul className={styles.planFeatures}>
                        <li>All Basic Features</li>
                        <li>Priority Support</li>
                        <li>Extended Features</li>
                    </ul>
                    <a href="#signup" className={`${styles.button} ${styles.planButton}`}>Sign Up</a>
                </div>
                <div className={styles.plan}>
                    <h3 className={styles.planTitle}>Enterprise</h3>
                    <p className={styles.planPrice}>$100 / month</p>
                    <ul className={styles.planFeatures}>
                        <li>All Pro Features</li>
                        <li>Dedicated Support</li>
                        <li>Custom Solutions</li>
                    </ul>
                    <a href="#signup" className={`${styles.button} ${styles.planButton}`}>Sign Up</a>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
