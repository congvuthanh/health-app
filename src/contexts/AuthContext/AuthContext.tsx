import type { PostSignUp200Data } from 'api/generated/schemas';
import { createContext } from 'react';

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (authData: PostSignUp200Data) => void;
  logout: () => void;
  isLoading: boolean;
  isLoggingOut: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
