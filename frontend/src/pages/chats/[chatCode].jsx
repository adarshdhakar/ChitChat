import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BoilerPlate2 from '@/components/BoilerPlate2';
import ChatLayout from '@/components/ChatLayout.jsx';

const ChatRoom = () => {
  const router = useRouter();
  const { chatCode } = router.query;
  const [chat, setChat] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
        setCurrUser(data.user || null);
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
  }, []);

  useEffect(() => {
    if (chatCode) {
      const fetchChat = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/chats/${chatCode}`);
          if (response.ok) {
            const data = await response.json();
            setChat(data);
          } else {
            alert('Chat room not found');
            router.push('/chats/create');
          }
        } catch (error) {
          console.error('Error fetching chat:', error);
          alert('Error fetching chat details');
        }
      };

      fetchChat();
    }
  }, [chatCode, router]);

  if (isLoading) {
    return (
      <BoilerPlate2>
        <div className="container mt-5">
          <p>Loading chat room...</p>
        </div>
      </BoilerPlate2>
    );
  }

  return (
    <BoilerPlate2>
      {currUser ? (
        <ChatLayout chatCode={chatCode} currentUser={currUser.username} />
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
  <div className="text-center">
    <p className="text-white mb-3" style={{ fontSize: '1.5rem' }}>
      User not authenticated. Please log in.
    </p>
    <button 
      type="button" 
      className="btn btn-dark btn-lg"
      onClick={() => router.push('/auth/login')} // Adjust the route as needed
    >
      Login &#8594;
    </button>
  </div>
</div>

      )}
    </BoilerPlate2>
  );
};

export default ChatRoom;
