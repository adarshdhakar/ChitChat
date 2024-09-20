// components/ChatLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/ChatLayout.css";
import BoilerPlate2 from "./BoilerPlate2";
import Link from 'next/link';

const SOCKET_SERVER_URL = "http://localhost:5000"; // Update with your backend server URL

const ChatLayout = ({ chatCode, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const room = chatCode; // Use chatCode as room name
  const currentUserAvatar = "https://i.pravatar.cc/150?img=3"; // Placeholder avatar
  const otherUserAvatar = "https://i.pravatar.cc/150?img=5"; // Placeholder avatar for others

  useEffect(() => {
    // Initialize Socket.io connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      query: { room }, // Optionally pass room info in query
    });

    // Join the specified room
    socketRef.current.emit("join_room", room);

    // Listen for incoming messages
    socketRef.current.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Load chat history if available
    socketRef.current.on("load_history", (history) => {
      setMessages(history);
    });

    // Cleanup on component unmount
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
      socketRef.current.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  return (
    <BoilerPlate2>
      <div className="chat-container">
        <div className="conversation-list">
          <h3 className="mb-3">Chat Room</h3>
          <br/>
          <br/> 
          <h5 className="mb-3">Room Id:</h5>
          <h6>{chatCode}</h6>
          <br/>

          <div className="call-buttons">
          {/* /calls/voice/${chatCode} */}
            <Link href='/' passHref className = "call">
            <button type = "button" className="btn btn-outline-primary">
              <i className="fas fa-phone-alt"></i>
            </button>
            </Link>
            
            <Link href='/' passHref className = "call">
            <button className="btn btn-outline-danger">
              <i className="fas fa-video"></i>
            </button>
            </Link>

          </div>
        </div>
        {/* <h1>{currentUser}{chatCode}</h1> */}
        <div className="chat-area">
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
                      className={`message-row ${
                        isOwnMessage ? "own-message" : "other-message"
                      }`}
                    >
                      {!isOwnMessage && (
                        <img
                          src={otherUserAvatar}
                          alt="avatar"
                          className="avatar"
                        />
                      )}
                      <div
                        className={`message-bubble ${
                          isOwnMessage ? "sent" : "received"
                        }`}
                      >
                        <div className="message-content">
                          <strong>{msg.sender}</strong>
                          <p>{msg.text}</p>
                        </div>
                        <span className="message-timestamp">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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

          <form onSubmit={handleSendMessage} className="message-input-form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                required
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BoilerPlate2>
  );
};

export default ChatLayout;
