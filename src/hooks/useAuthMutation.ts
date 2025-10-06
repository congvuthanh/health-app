import { usePostSignUp } from 'api/generated/default/default';
import { useAuth } from 'contexts/AuthContext';

/**
 * Custom hook for handling user authentication (login)
 * Automatically stores the access token in localStorage and context
 */
export const useAuthMutation = () => {
  const { login } = useAuth();

  return usePostSignUp({
    mutation: {
      onSuccess: (res) => {
        // Store auth data in context and localStorage
        login(res.data);
      },
      onError: (error) => {
        console.error('Authentication failed:', error);
      },
    },
  });
};
