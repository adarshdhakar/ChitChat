// frontend/src/pages/logout.jsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          credentials: 'include', // Important for sending cookies
        });

        if (response.ok) {
          router.push('/'); // Redirect after successful logout
        } else {
          alert('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout.');
      }
    };

    logout();
  }, [router]);

  return null; // No UI to render
};

export default Logout;
