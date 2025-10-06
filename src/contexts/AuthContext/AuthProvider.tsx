import type { PostSignUp200Data } from 'api/generated/schemas';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }
    setIsLoading(false);
  }, []);

  const login = (authData: PostSignUp200Data) => {
    const { accessToken } = authData;
    localStorage.setItem('accessToken', accessToken);
    setAccessToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
  };

  const value = {
    accessToken,
    isAuthenticated: !!accessToken,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
