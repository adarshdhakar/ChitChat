// pages/users/profile/[userId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BoilerPlate from '@/components/BoilerPlate';
import "@/styles/UserProfile.css";

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query; // Extract userId from the URL
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

  const fetchUserProfile = async (userId) => {
    if (!userId) return; // Wait until userId is available

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setCurrUser(userData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('An error occurred while fetching user data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId]);

  return (
    <BoilerPlate>
      <div className="profile-container">
        {error && <p className="error-message">{error}</p>}
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : currUser ? (
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={currUser.profileImageUrl} // Fallback image
                alt="Profile Picture"
                className="profile-pic"
              />
              <h1 className="profile-username">{currUser.username}</h1>
            </div>
            <div className="profile-info">
              <p><strong>Email:</strong> {currUser.email}</p>
              {/* Add more user details as needed */}
            </div>
          </div>
        ) : (
          <p>User not found or you are not authorized to view this profile.</p>
        )}
      </div>
    </BoilerPlate>
  );
};

export default UserProfile;
