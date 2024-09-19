// pages/users/edit.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import BoilerPlate from '../../components/BoilerPlate';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth'); // Adjust if needed
        const userData = response.data.user;
        setUsername(userData.username || '');
        setEmail(userData.email || '');
        setProfileImageUrl(userData.profileImageUrl || '');
      } catch (err) {
        setError('Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      formData.append('username', username);
      formData.append('email', email);

      const response = await axios.put(`/api/users/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProfileImageUrl(response.data.profileImageUrl);
      setIsLoading(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <BoilerPlate>
      <div className="profile-edit-container">
        <h2>Edit Profile</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              className="form-control"
              onChange={handleImageChange}
            />
            {profileImageUrl && (
              <div className="profile-image-preview">
                <img
                  src={profileImageUrl}
                  alt="Profile Preview"
                  width="100"
                  height="100"
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>  
    </BoilerPlate>
  );
};

export default EditProfile;
