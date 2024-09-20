// components/withAuth.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import BoilerPlate from '@/components/BoilerPlate';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { isAuthenticated, isLoading, error } = useAuth();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.replace('/auth/login');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <BoilerPlate>
          <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Verifying your session...</p>
          </div>
        </BoilerPlate>
      );
    }

    if (error) {
      return (
        <BoilerPlate>
          <div className="container mt-5">
            <p className="text-danger">{error}</p>
          </div>
        </BoilerPlate>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
