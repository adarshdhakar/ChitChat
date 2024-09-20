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
  // const [currentUser, setCurrentUser] = useState("You"); // Replace with actual user data

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [error, setError] = useState(null); // Define error state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
        setCurrUser(data.user || null); // Safely set user

        if (data.isAuthenticated && data.userId) {
          // Optionally, you can fetch additional user data here
        }
      } else {
        setIsLoggedIn(false);
        setCurrUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setError('Failed to check authentication.');
      setIsLoggedIn(false);
      setCurrUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  },[]);
  
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
      <ChatLayout chatCode={chatCode} currentUser={currUser.username} />
  );
};

export default ChatRoom;

