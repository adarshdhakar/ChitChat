import React, { useState } from "react";
import "../styles/ChatLayout.css"; // Import your custom CSS file
import Navbar from "./NavBar";

const ChatLayout = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "") {
      setMessages([...messages, { text: currentMessage, sender: "You" }]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      {/* Space for Navbar */}
      <Navbar/>
      <div className="navbar-space"></div>

      {/* Conversation List - Fixed */}
      <div className="conversation-list">
        <h5 className="mb-3">Conversations</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item active">John Doe</li>
          <li className="list-group-item">Jane Smith</li>
          <li className="list-group-item">Team Alpha</li>
          <li className="list-group-item">AI Bot</li>
        </ul>
      </div>

      {/* Message View - Scrollable */}
      <div className="message-view">
        <div className="messages-container">
          {messages.length === 0 ? (
            <p className="text-muted">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Input Form - Fixed */}
      <form onSubmit={handleSendMessage} className="message-input-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatLayout;
