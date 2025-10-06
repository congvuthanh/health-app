import { useGetValidateToken } from 'api/generated/default/default';

/**
 * Custom hook to validate the current JWT token
 * Checks if the token is still valid and not expired
 */
export const useTokenValidation = () => {
  return useGetValidateToken({
    query: {
      enabled: !!localStorage.getItem('accessToken'), // Only run if token exists
      retry: false, // Don't retry on token validation failure
    },
  });
};
