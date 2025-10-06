import { screen } from '@testing-library/react';
import { useAuth } from 'contexts/AuthContext';
import { Navigate } from 'react-router';
import { renderWithProviders } from 'utils/test/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from './index';

// Mock the useAuth hook while preserving other exports
vi.mock('contexts/AuthContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('contexts/AuthContext')>();
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

// Mock Navigate component while preserving other exports
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    Navigate: vi.fn(() => null),
  };
});

describe('ProtectedRoute', () => {
  const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;
  const mockNavigate = Navigate as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('shows loading state when loading', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('redirects to authentication error page when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    const callArgs = mockNavigate.mock.calls[0][0];
    expect(callArgs).toMatchObject({
      to: '/authenticationError',
      replace: true,
    });
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('prioritizes loading state over authentication state', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
