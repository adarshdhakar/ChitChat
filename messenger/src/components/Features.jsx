import React from 'react';
import styles from '../styles/Features.module.css';

const Features = () => {
    return (
        <>
        <div className={styles.featuresContainer}>
            <div className="row gx-4 gy-4"> {/* Added Bootstrap classes for better gap control */}
                <div className={`col-md-5 ${styles.featureBox}`}>
                    <p>Real-Time Chatting</p>
                </div>
                <div className={`col-md-5 ${styles.featureBox}`}>
                    <p>Group Chats</p>
                </div>
            </div>
            <div className="row gx-4 gy-4"> {/* Added horizontal and vertical gaps */}
                <div className={`col-md-5 ${styles.featureBox}`}>
                    <p>Video and Audio Calls</p>
                </div>
                <div className={`col-md-5 ${styles.featureBox}`}>
                    <p>AI Chatbot Assistance</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Features;
