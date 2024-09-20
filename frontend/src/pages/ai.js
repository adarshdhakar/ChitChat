import BoilerPlate from '../components/BoilerPlate';
import '../styles/AI.css'; // Create this CSS file for specific styles if not already present

const AI = () => {
  return (
    <BoilerPlate>
      <div className="chatbot-container">
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=84de94c1-4eb6-432d-a128-d6c57b44a61e"
          title="Chatbot"
          className="chatbot-iframe"
        ></iframe>
      </div>
    </BoilerPlate>
  );
};

export default AI;
