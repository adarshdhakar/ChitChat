// pages/chats/person/[username].jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ChatLayout from '@/components/ChatLayout';

const ChatWithPerson = () => {
  const router = useRouter();
  const { username } = router.query; // Get recipient username from the URL

  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    // Fetch recipient's user details if needed
    const fetchRecipient = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${username}`);
        const data = await response.json();
        setRecipient(data);
      } catch (error) {
        console.error('Error fetching recipient data:', error);
      }
    };

    if (username) fetchRecipient();
  }, [username]);

  if (!recipient) return <p>Loading...</p>;

  return (
    <div>
      <h2>Chat with {recipient.username}</h2>
      <ChatLayout recipientUsername={username} /> {/* Pass recipientUsername to ChatLayout */}
    </div>
  );
};

export default ChatWithPerson;
