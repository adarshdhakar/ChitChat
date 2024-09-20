import React, { useState, useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/router';
import BoilerPlate from '@/components/BoilerPlate';
import { v4 as uuidv4 } from 'uuid'; // For generating unique chat codes

const CreateChat = () => {
  const router = useRouter();

  // Define necessary states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initially loading

  const [joinCode, setJoinCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Function to check authentication
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
        setCurrUser(data.user || null); // Safely set user
      } else {
        setIsLoggedIn(false);
        setCurrUser(null);
        router.replace('/auth/login'); // Use replace to prevent back navigation
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setError('Failed to verify authentication.');
      setIsLoggedIn(false);
      setCurrUser(null);
      router.replace('/auth/login'); // Redirect on error
    } finally {
      setIsLoading(false);
    }
  };

  // Correct usage of useEffect to check authentication on mount
  useEffect(() => {
    checkAuth();
    if (!currUser && !isLoading) {
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run once on mount

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
        const errorData = await response.json();
        alert(errorData.message || 'Failed to create chat room');
        console.error('Failed to create chat room', errorData);
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
        const errorData = await response.json();
        alert(errorData.message || 'Chat room not found');
        console.error('Chat room not found', errorData);
      }
    } catch (error) {
      alert('Error joining chat room');
      console.error('Error joining chat room:', error);
    }
  };

  // Optionally, handle error state if you want to show something before redirection
  if (error) {
    return (
      <BoilerPlate>
        <div className="container mt-5">
          <p className="text-danger">{error}</p>
        </div>
      </BoilerPlate>
    );
  }

  // If authenticated, render the chat interface
  return (
    <BoilerPlate>
      <div className="container mt-5">
      <br/>
          <br/>
          <br/>
        {/* Welcome Message (Optional) */}
        {currUser && (
          <div className="mb-4">
            <h2>Welcome, {currUser.username || 'User'}!</h2>
          </div>
        )}

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
    </BoilerPlate>
  );
};

export default CreateChat;
