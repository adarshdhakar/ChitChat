// pages/chats/[chatCode].jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BoilerPlate from '@/components/BoilerPlate';
import ChatLayout from '@/components/ChatLayout.jsx'; // Import the updated ChatLayout
// import { getCurrentUser } from '@/utils/auth'; // Example function to get current user

const ChatRoom = () => {
  const router = useRouter();
  const { chatCode } = router.query;
  const [chat, setChat] = useState(null);
  const [currentUser, setCurrentUser] = useState("You"); // Replace with actual user data

  // useEffect(() => {
  //   // Fetch current user data (replace with your auth logic)
  //   const fetchUser = async () => {
  //     const user = await getCurrentUser(); // Implement this function based on your auth setup
  //     if (user) {
  //       setCurrentUser(user.username); // Adjust based on your user object
  //     } else {
  //       setCurrentUser("You"); // Fallback or redirect to login
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    if (chatCode) {
      // Fetch chat details
      const fetchChat = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/chats/${chatCode}`);
          if (response.ok) {
            const data = await response.json();
            setChat(data);
            // Additional logic if needed
          } else {
            alert('Chat room not found');
            router.push('/chats/create'); // Redirect if chat not found
          }
        } catch (error) {
          console.error('Error fetching chat:', error);
          alert('Error fetching chat details');
        }
      };

      fetchChat();
    }
  }, [chatCode, router]);

  if (!chat) {
    return (
      <BoilerPlate>
        <div className="container mt-5">
          <p>Loading chat room...</p>
        </div>
      </BoilerPlate>
    );
  }

  return (
      <ChatLayout chatCode={chatCode} currentUser={currentUser} />
  );
};

export default ChatRoom;

