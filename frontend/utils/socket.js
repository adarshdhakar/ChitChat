import { io } from "socket.io-client";

let socket;

const initiateSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000"); // Replace with your backend URL if different
    console.log("Connecting socket...");
  }
};

const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

const getSocket = () => {
  if (!socket) {
    console.log("Socket not initialized. Initiate the socket first.");
  }
  return socket;
};

export { initiateSocket, disconnectSocket, getSocket };
