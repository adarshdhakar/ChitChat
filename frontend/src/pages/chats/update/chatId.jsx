// pages/chats/update/[chatId].jsx
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const UpdateChat = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const [chatDetails, setChatDetails] = useState({ title: '' });

  useEffect(() => {
    // Fetch existing chat details if needed
    const fetchChatDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/chats/${chatId}`);
      const data = await response.json();
      setChatDetails(data);
    };

    if (chatId) fetchChatDetails();
  }, [chatId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatDetails),
      });

      if (response.ok) {
        router.push(`/chats/person/${chatId}`);
      } else {
        console.error('Failed to update chat');
      }
    } catch (error) {
      console.error('Error updating chat:', error);
    }
  };

  return (
    <div>
      <h2>Update Chat</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Chat Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={chatDetails.title}
            onChange={(e) => setChatDetails({ ...chatDetails, title: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Chat</button>
      </form>
    </div>
  );
};

export default UpdateChat;
