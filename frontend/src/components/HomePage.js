// "use client";
// import HeroSection from "./HeroSection";
// import Features from "./Features";
// import Testimonials from "./Testimonials";
// import HowItWorks from "./HowItWorks";
// import Pricing from "./Pricing";
// import BoilerPlate from "./BoilerPlate";
// import React, { useEffect } from "react";
// import "../styles/HomePage.css";

// const HomePage = () => {
//   useEffect(() => {
//     import("bootstrap/dist/js/bootstrap.bundle.min.js");
//   }, []);

//   return (
//     <>
//       <BoilerPlate>
//         {/* Logo and Title Section */}
//         <br/>
//         <div className="text-center my-5 mt-5">
//           <div className="Title">
//             Welcome to ChitChat...
//           </div>  
//         </div>

//         {/* Content Sections */}
//         <div className="container">
//           <div className="row gy-4">
//             <div className="col-md-6 mb-4">
//               <HeroSection />
//             </div>
//             <div className="col-md-6 mb-4">
//               <Features />
//             </div>
//           </div>
//           <br/>
//           <br/>
//           <div className="row gy-4">
//             <div className="col-12">
//               <Testimonials />
//             </div>
//           </div>
//           <br/>
//           <br/>
//           <div className="row gy-4">
//             <div className="col-12">
//               <HowItWorks />
//             </div>
//           </div>
//           <br/>
//           {/* Chatbot Section */}
//           <div className="chatbot-container text-center my-5">
//             <iframe
//               src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=84de94c1-4eb6-432d-a128-d6c57b44a61e"
//               title="Chatbot"
//               style={{ width: '40%', height: '700px', border: 'none', margin: "auto", borderRadius: "20px"}}
//             ></iframe>
//           </div>
//         </div>
//       </BoilerPlate>
//     </>
//   );
// };

// export default HomePage;


"use client";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import BoilerPlate from "./BoilerPlate";
import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

const HomePage = () => {
  const [isChatbotExpanded, setIsChatbotExpanded] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleChatbotClick = () => {
    setIsChatbotExpanded(!isChatbotExpanded);
  };

  return (
    <>
      <BoilerPlate>
        {/* Logo and Title Section */}
        <br/>
        <div className="text-center my-5 mt-5">
          <div className="Title">
            Welcome to ChitChat...
          </div>  
        </div>

        {/* Content Sections */}
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-6 mb-4">
              <HeroSection />
            </div>
            <div className="col-md-6 mb-4">
              <Features />
            </div>
          </div>
          <br/>
          <br/>
          <div className="row gy-4">
            <div className="col-12">
              <Testimonials />
            </div>
          </div>
          <br/>
          <br/>
          <div className="row gy-4">
            <div className="col-12">
              <HowItWorks />
            </div>
          </div>
          <br/>
        </div>
        {/* Chatbot Section */}
        <div className={`chatbot-container ${isChatbotExpanded ? 'expanded' : ''}`}>
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=84de94c1-4eb6-432d-a128-d6c57b44a61e"
            title="Chatbot"
            className={`chatbot-iframe ${isChatbotExpanded ? 'expanded' : ''}`}
          ></iframe>
        </div>
        <button className="chatbot-float-button" onClick={handleChatbotClick}>
          <img src="bot_icon.png" alt="Chatbot" />
        </button>
      </BoilerPlate>
    </>
  );
};

export default HomePage;
