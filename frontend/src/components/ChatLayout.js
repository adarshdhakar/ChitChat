// src/components/ChatLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatLayout.css";
import Navbar from "./NavBar";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Update this with your backend server URL

const ChatLayout = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const room = "General"; // Example room name
  const currentUser = "You"; // Replace with actual user data if available
  const currentUserAvatar = "https://i.pravatar.cc/150?img=5"; // Placeholder avatar
  const otherUserAvatar = "https://i.pravatar.cc/150?img=3"; // Placeholder avatar for others

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
    });

    // Join the room
    socketRef.current.emit("join_room", room);

    // Listen for incoming messages
    socketRef.current.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for chat history (optional)
    socketRef.current.on("load_history", (history) => {
      setMessages(history);
    });

    // Clean up on component unmount
    return () => {
      socketRef.current.emit("leave_room", room);
      socketRef.current.disconnect();
    };
  }, [room]);

  useEffect(() => {
    // Scroll to the latest message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "" && socketRef.current) {
      const messageData = { 
        text: currentMessage,
        sender: currentUser, // Replace with actual user data if available
        room: room,
        timestamp: new Date(),
      };
      socketRef.current.emit("send_message", messageData); // Send message to server
      setCurrentMessage("");
      // **Removed the local state update to prevent duplication**
    }
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">
        {/* Conversation List */}
        <div className="conversation-list">
          <h5 className="mb-3">Conversations</h5>
          <ul className="list-group list-group-flush">
            <li
              className={`list-group-item ${room === "General" ? "active" : ""}`}
              onClick={() => {
                /* Handle room change if needed */
              }}
            >
              General
            </li>
            <li className="list-group-item">Harsh Maurya</li>
            <li className="list-group-item">Om Prakash Behera</li>
            <li className="list-group-item">Avik Sarkar</li>
            <li className="list-group-item">AI Bot</li>
          </ul>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {/* Message View */}
          <div className="message-view">
            <div className="messages-container">
              {messages.length === 0 ? (
                <p className="text-muted">No messages yet.</p>
              ) : (
                messages.map((msg, index) => {
                  const isOwnMessage = msg.sender === currentUser;
                  return (
                    <div
                      key={index}
                      className={`message-row ${isOwnMessage ? "own-message" : "other-message"}`}
                    >
                      {!isOwnMessage && (
                        <img
                          src={otherUserAvatar}
                          alt="avatar"
                          className="avatar"
                        />
                      )}
                      <div className={`message-bubble ${isOwnMessage ? "sent" : "received"}`}>
                        <div className="message-content">
                          <strong>{msg.sender}</strong>
                          <p>{msg.text}</p>
                        </div>
                        <span className="message-timestamp">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {isOwnMessage && (
                        <img
                          src={currentUserAvatar}
                          alt="avatar"
                          className="avatar"
                        />
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
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
                  <i className="fas fa-paper-plane"></i> {/* Send Icon */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
