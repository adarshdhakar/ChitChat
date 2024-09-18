import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page on component mount
    router.push('/');
  }, [router]);

  return null; // No need to render anything
};

export default LogoutPage;
