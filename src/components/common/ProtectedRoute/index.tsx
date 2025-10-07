import { useAuth } from 'contexts/AuthContext';
import { Navigate } from 'react-router';
import { routePath } from '../../../routes/path';
import { LoadingContainer, LoadingSpinner, LoadingText } from './index.styles';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isLoggingOut } = useAuth();

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  // Don't redirect if user is logging out (navigation is in progress)
  if (!isAuthenticated && !isLoggingOut) {
    return <Navigate to={routePath.AuthFailedPage} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
