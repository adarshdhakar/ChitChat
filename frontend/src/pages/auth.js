import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CheckAuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth'); // Call the API route
        const data = await response.json();
        
        if (data.isAuthenticated) {
          router.push('/dashboard'); // Redirect to the authenticated page
        } else {
          router.push('/login'); // Redirect to the login page
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/login'); // Redirect to login on error
      }
    };

    checkAuth();
  }, [router]);

  return null; // No UI to render
};

export default CheckAuthPage;
