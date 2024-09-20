// // pages/users/profile/[userId].js
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import BoilerPlate2 from '@/components/BoilerPlate2';

// const UserProfile = () => {
//   const router = useRouter();
//   const { userId } = router.query;
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currUser, setCurrUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const checkAuth = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth', {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setIsLoggedIn(data.isAuthenticated);
//         setCurrUser(data.user || null);
//       } else {
//         setIsLoggedIn(false);
//         setCurrUser(null);
//       }
//     } catch (error) {
//       console.error('Error checking authentication:', error);
//       setError('Failed to check authentication.');
//       setIsLoggedIn(false);
//       setCurrUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchUserProfile = async (userId) => {
//     if (!userId) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setCurrUser(userData);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to fetch user data.');
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       setError('An error occurred while fetching user data.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserProfile(userId);
//     }
//   }, [userId]);

//   return (
//     <BoilerPlate2>
//       <div className="profile-container">
//         {error && <p className="error-message">{error}</p>}
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : currUser ? (
//           <div className="profile-card">
//             <h1 className="profile-heading">{currUser.username}'s Profile</h1>
//             <div className="profile-details">
//               <div className="profile-image">
//                 <img
//                   src={currUser.profileImageUrl || '/default_profile.png'} // Fallback image
//                   alt="Profile Picture"
//                   className="profile-pic"
//                 />
//               </div>
//               <div className="profile-info">
//                 <p><strong>Email:</strong> {currUser.email}</p>
//                 {/* Add more user details */}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>User not found or you are not authorized to view this profile.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .profile-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
//         }

//         .profile-card {
//           background-color: #f8f9fa;
//           border-radius: 10px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           padding: 20px;
//           width: 80%;
//           max-width: 600px;
//           text-align: center;
//         }

//         .profile-heading {
//           font-size: 2em;
//           color: #333;
//           margin-bottom: 20px;
//         }

//         .profile-details {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }

//         .profile-image {
//           margin-bottom: 20px;
//         }

//         .profile-pic {
//           border-radius: 50%;
//           width: 150px;
//           height: 150px;
//           object-fit: cover;
//         }

//         .profile-info p {
//           font-size: 1.2em;
//           color: #666;
//           margin: 5px 0;
//         }

//         .error-message {
//           color: red;
//         }
//       `}</style>
//     </BoilerPlate2>
//   );
// };

// export default UserProfile;

// pages/users/profile/[userId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BoilerPlate from '@/components/BoilerPlate';

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

      <style jsx>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 20px;
          min-height: 80vh;
          background-color: #f0f2f5;
        }

        .error-message {
          color: red;
          margin-bottom: 20px;
          text-align: center;
        }

        .loader {
          font-size: 1.5em;
          color: #555;
        }

        .profile-card {
          background-color: #fff;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          padding: 30px;
          max-width: 500px;
          width: 100%;
          text-align: center;
        }

        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .profile-pic {
          border-radius: 50%;
          width: 150px;
          height: 150px;
          object-fit: cover;
          margin-bottom: 15px;
          border: 4px solid #4CAF50;
        }

        .profile-username {
          font-size: 2em;
          color: #333;
          margin: 0;
        }

        .profile-info p {
          font-size: 1.1em;
          color: #555;
          margin: 10px 0;
        }

        @media (max-width: 600px) {
          .profile-card {
            padding: 20px;
          }

          .profile-pic {
            width: 120px;
            height: 120px;
          }

          .profile-username {
            font-size: 1.5em;
          }

          .profile-info p {
            font-size: 1em;
          }
        }
      `}</style>
    </BoilerPlate>
  );
};

export default UserProfile;
