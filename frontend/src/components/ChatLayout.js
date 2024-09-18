// // src/components/ChatLayout.jsx
// import React, { useState, useEffect, useRef } from "react";
// import "../styles/ChatLayout.css";
// import Navbar from "./NavBar";
// import io from "socket.io-client";

// const SOCKET_SERVER_URL = "http://localhost:5000"; // Update this with your backend server URL

// const ChatLayout = ({ currentUserId, users }) => {
//   const [messages, setMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [activeRoom, setActiveRoom] = useState(null); // Track the active room
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);
  
//   const getAvatarUrl = (userId) => `https://i.pravatar.cc/150?img=${userId.replace('user', '')}`; // Example avatar URL generator

//   // Get the current user details
//   const currentUser = users.find(user => user.id === currentUserId) || { name: "You", avatar: getAvatarUrl(currentUserId) };

//   useEffect(() => {
//     if (activeRoom) {
//       // Initialize socket connection and join the room
//       socketRef.current = io(SOCKET_SERVER_URL, {
//         transports: ["websocket"],
//       });

//       // Join the room
//       socketRef.current.emit("join_room", activeRoom);

//       // Listen for incoming messages
//       socketRef.current.on("receive_message", (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });

//       // Load chat history for the room (optional)
//       socketRef.current.on("load_history", (history) => {
//         setMessages(history);
//       });

//       // Clean up on room change or component unmount
//       return () => {
//         socketRef.current.emit("leave_room", activeRoom);
//         socketRef.current.disconnect();
//       };
//     }
//   }, [activeRoom]);

//   useEffect(() => {
//     // Scroll to the latest message when new messages arrive
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (currentMessage.trim() !== "" && socketRef.current) {
//       const messageData = {
//         text: currentMessage,
//         sender: currentUser.name,
//         room: activeRoom,
//         timestamp: new Date(),
//       };
//       socketRef.current.emit("send_message", messageData); // Send message to the server
//       setCurrentMessage("");
//     }
//   };

//   const handleRoomChange = (userId) => {
//     const newRoom = [currentUserId, userId].sort().join("_"); // Generate unique room for each pair
//     setActiveRoom(newRoom);
//     setMessages([]); // Clear current messages when switching rooms
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="chat-container">
//         {/* Conversation List */}
//         <div className="conversation-list">
//           <h5 className="mb-3">Conversations</h5>
//           <ul className="list-group list-group-flush">
//             {users.map((user) => (
//               <li
//                 key={user.id}
//                 className={`list-group-item ${activeRoom === [currentUserId, user.id].sort().join("_") ? "active" : ""}`}
//                 onClick={() => handleRoomChange(user.id)}
//               >
//                 <img
//                   src={getAvatarUrl(user.id)}
//                   alt="avatar"
//                   className="avatar"
//                 />
//                 {user.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Chat Area */}
//         <div className="chat-area">
//           {/* Message View */}
//           <div className="message-view">
//             <div className="messages-container">
//               {messages.length === 0 ? (
//                 <p className="text-muted">No messages yet.</p>
//               ) : (
//                 messages.map((msg, index) => {
//                   const isOwnMessage = msg.sender === currentUser.name;
//                   const avatarUrl = users.find(user => user.name === msg.sender)?.avatar || getAvatarUrl('user0'); // Default avatar if not found

//                   return (
//                     <div
//                       key={index}
//                       className={`message-row ${isOwnMessage ? "own-message" : "other-message"}`}
//                     >
//                       {!isOwnMessage && (
//                         <img
//                           src={avatarUrl}
//                           alt="avatar"
//                           className="avatar"
//                         />
//                       )}
//                       <div className={`message-bubble ${isOwnMessage ? "sent" : "received"}`}>
//                         <div className="message-content">
//                           <strong>{msg.sender}</strong>
//                           <p>{msg.text}</p>
//                         </div>
//                         <span className="message-timestamp">
//                           {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                       </div>
//                       {isOwnMessage && (
//                         <img
//                           src={currentUser.avatar}
//                           alt="avatar"
//                           className="avatar"
//                         />
//                       )}
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Message Input */}
//           <form onSubmit={handleSendMessage} className="message-input-form">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Type a message..."
//                 value={currentMessage}
//                 onChange={(e) => setCurrentMessage(e.target.value)}
//                 disabled={!activeRoom} // Disable input if no room is active
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="submit" disabled={!activeRoom}>
//                   <i className="fas fa-paper-plane"></i> {/* Send Icon */}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatLayout;


// // src/components/ChatLayout.jsx
// import React, { useState, useEffect, useRef } from "react";
// import "../styles/ChatLayout.css";
// import Navbar from "./NavBar";
// import io from "socket.io-client";

// const SOCKET_SERVER_URL = "http://localhost:5000"; // Update this with your backend server URL

// const ChatLayout = ({ currentUserId, users }) => { // Add props for authenticated user and other users
//   const [messages, setMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [activeRoom, setActiveRoom] = useState(null); // Track the active room
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const currentUser = users.find(user => user.id === currentUserId); // Find the current user from the users list
//   const currentUserAvatar = currentUser ? currentUser.avatar : "https://i.pravatar.cc/150?img=5"; // Replace with authenticated user's avatar

//   useEffect(() => {
//     if (activeRoom) {
//       // Initialize socket connection and join the room
//       socketRef.current = io(SOCKET_SERVER_URL, {
//         transports: ["websocket"],
//       });

//       // Join the room
//       socketRef.current.emit("join_room", activeRoom);

//       // Listen for incoming messages
//       socketRef.current.on("receive_message", (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });

//       // Load chat history for the room (optional)
//       socketRef.current.on("load_history", (history) => {
//         setMessages(history);
//       });

//       // Clean up on room change or component unmount
//       return () => {
//         socketRef.current.emit("leave_room", activeRoom);
//         socketRef.current.disconnect();
//       };
//     }
//   }, [activeRoom]);

//   useEffect(() => {
//     // Scroll to the latest message when new messages arrive
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (currentMessage.trim() !== "" && socketRef.current) {
//       const messageData = {
//         text: currentMessage,
//         sender: currentUser ? currentUser.name : "Anonymous", // Replace with actual authenticated user data
//         room: activeRoom,
//         timestamp: new Date(),
//       };
//       socketRef.current.emit("send_message", messageData); // Send message to the server
//       setCurrentMessage("");
//     }
//   };

//   const handleRoomChange = (userId) => {
//     const newRoom = [currentUserId, userId].sort().join("_"); // Generate unique room for each pair
//     setActiveRoom(newRoom);
//     setMessages([]); // Clear current messages when switching rooms
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="chat-container">
//         {/* Conversation List */}
//         <div className="conversation-list">
//           <h5 className="mb-3">Conversations</h5>
//           <ul className="list-group list-group-flush">
//             {users
//               .filter(user => user.id !== currentUserId) // Exclude the current user from the list
//               .map((user) => (
//                 <li
//                   key={user.id}
//                   className={`list-group-item ${activeRoom === [currentUserId, user.id].sort().join("_") ? "active" : ""}`}
//                   onClick={() => handleRoomChange(user.id)}
//                 >
//                   <img src={user.avatar || "https://i.pravatar.cc/150?img=3"} alt="avatar" className="avatar" />
//                   {user.name}
//                 </li>
//               ))}
//           </ul>
//         </div>

//         {/* Chat Area */}
//         <div className="chat-area">
//           {/* Message View */}
//           <div className="message-view">
//             <div className="messages-container">
//               {messages.length === 0 ? (
//                 <p className="text-muted">No messages yet.</p>
//               ) : (
//                 messages.map((msg, index) => {
//                   const isOwnMessage = msg.sender === (currentUser ? currentUser.name : "Anonymous");
//                   const senderAvatar = users.find(user => user.name === msg.sender)?.avatar || "https://i.pravatar.cc/150?img=3";
//                   return (
//                     <div
//                       key={index}
//                       className={`message-row ${isOwnMessage ? "own-message" : "other-message"}`}
//                     >
//                       {!isOwnMessage && (
//                         <img
//                           src={senderAvatar}
//                           alt="avatar"
//                           className="avatar"
//                         />
//                       )}
//                       <div className={`message-bubble ${isOwnMessage ? "sent" : "received"}`}>
//                         <div className="message-content">
//                           <strong>{msg.sender}</strong>
//                           <p>{msg.text}</p>
//                         </div>
//                         <span className="message-timestamp">
//                           {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                       </div>
//                       {isOwnMessage && (
//                         <img
//                           src={currentUserAvatar}
//                           alt="avatar"
//                           className="avatar"
//                         />
//                       )}
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Message Input */}
//           <form onSubmit={handleSendMessage} className="message-input-form">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Type a message..."
//                 value={currentMessage}
//                 onChange={(e) => setCurrentMessage(e.target.value)}
//                 disabled={!activeRoom} // Disable input if no room is active
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="submit" disabled={!activeRoom}>
//                   <i className="fas fa-paper-plane"></i> {/* Send Icon */}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatLayout;




// // src/components/ChatLayout.jsx
// import React, { useState, useEffect, useRef } from "react";
// import "../styles/ChatLayout.css";
// import Navbar from "./NavBar";
// import io from "socket.io-client";

// const SOCKET_SERVER_URL = "http://localhost:5000"; // Update this with your backend server URL

// const ChatLayout = ({ currentUserId, users }) => { // Add props for authenticated user and other users
//   const [messages, setMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [activeRoom, setActiveRoom] = useState(null); // Track the active room
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);
  
//   const currentUser = "You"; // Replace with actual authenticated user data
//   const currentUserAvatar = "https://i.pravatar.cc/150?img=5"; // Replace with authenticated user's avatar
  
//   // Other users data (simulated for now)
//   const otherUserAvatar = "https://i.pravatar.cc/150?img=3"; // Replace with real avatar from user data

//   useEffect(() => {
//     if (activeRoom) {
//       // Initialize socket connection and join the room
//       socketRef.current = io(SOCKET_SERVER_URL, {
//         transports: ["websocket"],
//       });

//       // Join the room
//       socketRef.current.emit("join_room", activeRoom);

//       // Listen for incoming messages
//       socketRef.current.on("receive_message", (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });

//       // Load chat history for the room (optional)
//       socketRef.current.on("load_history", (history) => {
//         setMessages(history);
//       });

//       // Clean up on room change or component unmount
//       return () => {
//         socketRef.current.emit("leave_room", activeRoom);
//         socketRef.current.disconnect();
//       };
//     }
//   }, [activeRoom]);

//   useEffect(() => {
//     // Scroll to the latest message when new messages arrive
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (currentMessage.trim() !== "" && socketRef.current) {
//       const messageData = {
//         text: currentMessage,
//         sender: currentUser, // Replace with actual authenticated user data
//         room: activeRoom,
//         timestamp: new Date(),
//       };
//       socketRef.current.emit("send_message", messageData); // Send message to the server
//       setCurrentMessage("");
//     }
//   };

//   const handleRoomChange = (userId) => {
//     const newRoom = [currentUserId, userId].sort().join("_"); // Generate unique room for each pair
//     setActiveRoom(newRoom);
//     setMessages([]); // Clear current messages when switching rooms
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="chat-container">
//         {/* Conversation List */}
//         <div className="conversation-list">
//           <h5 className="mb-3">Conversations</h5>
//           <ul className="list-group list-group-flush">
//             {users.map((user) => (
//               <li
//                 key={user.id}
//                 className={`list-group-item ${activeRoom === [currentUserId, user.id].sort().join("_") ? "active" : ""}`}
//                 onClick={() => handleRoomChange(user.id)}
//               >
//                 {user.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Chat Area */}
//         <div className="chat-area">
//           {/* Message View */}
//           <div className="message-view">
//             <div className="messages-container">
//               {messages.length === 0 ? (
//                 <p className="text-muted">No messages yet.</p>
//               ) : (
//                 messages.map((msg, index) => {
//                   const isOwnMessage = msg.sender === currentUser;
//                   return (
//                     <div
//                       key={index}
//                       className={`message-row ${isOwnMessage ? "own-message" : "other-message"}`}
//                     >
//                       {!isOwnMessage && (
//                         <img
//                           src={otherUserAvatar}
//                           alt="avatar"
//                           className="avatar"
//                         />
//                       )}
//                       <div className={`message-bubble ${isOwnMessage ? "sent" : "received"}`}>
//                         <div className="message-content">
//                           <strong>{msg.sender}</strong>
//                           <p>{msg.text}</p>
//                         </div>
//                         <span className="message-timestamp">
//                           {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                       </div>
//                       {isOwnMessage && (
//                         <img
//                           src={currentUserAvatar}
//                           alt="avatar"
//                           className="avatar"
//                         />
//                       )}
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Message Input */}
//           <form onSubmit={handleSendMessage} className="message-input-form">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Type a message..."
//                 value={currentMessage}
//                 onChange={(e) => setCurrentMessage(e.target.value)}
//                 disabled={!activeRoom} // Disable input if no room is active
//               />
//               <div className="input-group-append">
//                 <button className="btn btn-primary" type="submit" disabled={!activeRoom}>
//                   <i className="fas fa-paper-plane"></i> {/* Send Icon */}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatLayout;



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
