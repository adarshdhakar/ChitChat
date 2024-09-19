import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoilerPlate from '../../components/BoilerPlate';

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/users/${userId}`);
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user data.');
        }
      };

      fetchUser();
    }
  }, [userId]);

  return (
    <BoilerPlate>
      <div className="profile-container">
        {error && <p className="error-message">{error}</p>}
        {user ? (
          <div>
            <h1>{user.username}'s Profile</h1>
            <p>Email: {user.email}</p>
            {user.profileImageUrl && (
              <img
                src={user.profileImageUrl}
                alt="Profile Picture"
                width="100"
                height="100"
              />
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </BoilerPlate>
  );
};

export default UserProfile;
