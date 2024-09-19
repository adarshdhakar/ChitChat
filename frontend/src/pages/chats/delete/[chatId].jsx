// pages/chats/delete/[chatId].jsx
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const DeleteChat = () => {
  const router = useRouter();
  const { chatId } = router.query;

  useEffect(() => {
    const deleteChat = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.push('/'); // Redirect after deletion
        } else {
          console.error('Failed to delete chat');
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
      }
    };

    if (chatId) deleteChat();
  }, [chatId]);

  return <p>Deleting chat...</p>;
};

export default DeleteChat;
