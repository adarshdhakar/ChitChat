import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BoilerPlate from '@/components/BoilerPlate';
import { v4 as uuidv4 } from 'uuid'; // For generating unique chat codes

const CreateChat = () => {
  const [chatCode, setChatCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const router = useRouter();

  // Function to create a new chat room
  const handleCreateChat = async (e) => {
    e.preventDefault();

    try {
      const newChatCode = uuidv4(); // Generate a unique chat code

      const response = await fetch('http://localhost:5000/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatCode: newChatCode }),
      });

      if (response.ok) {
        setGeneratedCode(newChatCode); // Display the generated code
      } else {
        alert('Failed to create chat room');
        console.error('Failed to create chat room');
      }
    } catch (error) {
      alert('Error creating chat room');
      console.error('Error creating chat room:', error);
    }
  };

  // Function to join an existing chat room
  const handleJoinChat = async (e) => {
    e.preventDefault();

    if (!joinCode.trim()) {
      alert('Please enter a valid chat code');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/chats/${joinCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push(`/chats/${joinCode}`); // Redirect to the chat room
      } else {
        alert('Chat room not found');
        console.error('Chat room not found');
      }
    } catch (error) {
      alert('Error joining chat room');
      console.error('Error joining chat room:', error);
    }
  };

  return (
    <BoilerPlate>
      <br />
      <br />
      <br />
      <div className="container mt-5">
        {/* Create Chat Room Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Create a New Chat Room</h2>
            <form onSubmit={handleCreateChat}>
              <button type="submit" className="btn btn-primary">
                Create Chat Room
              </button>
            </form>

            {generatedCode && (
              <div className="mt-3">
                <h4>Share this Chat Code:</h4>
                <p className="alert alert-success">{generatedCode}</p>
              </div>
            )}
          </div>
        </div>

        {/* Join Chat Room Section */}
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Join a Chat Room</h2>
            <form onSubmit={handleJoinChat}>
              <div className="mb-3">
                <label htmlFor="joinCode" className="form-label">
                  Chat Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="joinCode"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="Enter chat code"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Join Chat
              </button>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </BoilerPlate>
  );
};

export default CreateChat;

