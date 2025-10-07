import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Test utilities
import { server } from 'utils/test/server';
import { createTestWrapper } from 'utils/test/test-utils';

// Component
import TopPage from './index';

// Mock navigation
const mockNavigate = vi.fn();
vi.mock('hooks/useAppNavigate', () => ({
  useAppNavigate: () => mockNavigate,
}));

describe('TopPage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    mockNavigate.mockClear();
  });

  describe('Rendering', () => {
    it('should render the login form with all required elements', () => {
      render(<TopPage />, { wrapper: createTestWrapper() });

      // Check for logo
      expect(screen.getByAltText('Health App Logo')).toBeInTheDocument();

      // Check for password input
      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Check for submit button
      expect(
        screen.getByRole('button', { name: /ログイン/i })
      ).toBeInTheDocument();
    });

    it('should render without footer (TopPage is standalone)', () => {
      render(<TopPage />, { wrapper: createTestWrapper() });

      // TopPage doesn't use Layout component, so no footer should be present
      expect(
        screen.queryByRole('navigation', { name: /Footer navigation/i })
      ).not.toBeInTheDocument();
    });

    it('should have proper accessibility attributes on password input', () => {
      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      expect(passwordInput).toHaveAttribute('aria-label', 'パスワード');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Form Validation - Client-side (Zod)', () => {
    it('should show validation error when password is empty', async () => {
      const user = userEvent.setup();
      render(<TopPage />, { wrapper: createTestWrapper() });

      const submitButton = screen.getByRole('button', { name: /ログイン/i });
      await user.click(submitButton);

      // Wait for validation error to appear
      await waitFor(() => {
        expect(
          screen.getByText('パスワードを入力してください')
        ).toBeInTheDocument();
      });

      // Check aria-invalid is set to true
      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
      expect(passwordInput).toHaveAttribute(
        'aria-describedby',
        'password-error'
      );
    });

    it('should show validation error when password is too short (less than 4 characters)', async () => {
      const user = userEvent.setup();
      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      const submitButton = screen.getByRole('button', { name: /ログイン/i });

      // Enter password with less than 4 characters
      await user.type(passwordInput, 'abc');
      await user.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        expect(
          screen.getByText('パスワードは4文字以上である必要があります')
        ).toBeInTheDocument();
      });
    });

    it('should not call API when validation fails', async () => {
      const user = userEvent.setup();
      const apiSpy = vi.fn();

      server.use(
        http.post('*/signUp', async () => {
          apiSpy();
          return HttpResponse.json({
            success: true,
            data: { accessToken: 'test-token' },
          });
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const submitButton = screen.getByRole('button', { name: /ログイン/i });
      await user.click(submitButton);

      // Wait a bit to ensure API isn't called
      await waitFor(() => {
        expect(
          screen.getByText('パスワードを入力してください')
        ).toBeInTheDocument();
      });

      expect(apiSpy).not.toHaveBeenCalled();
    });
  });

  describe('Authentication - Successful Login', () => {
    it('should successfully authenticate with correct password', async () => {
      const user = userEvent.setup();

      server.use(
        http.post('*/signUp', async () => {
          return HttpResponse.json({
            status: 'ok',
            code: 200,
            message: 'Authentication successful',
            data: {
              accessToken: 'test-access-token-123',
              tokenType: 'Bearer',
              expiresIn: 3600,
            },
          });
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      const submitButton = screen.getByRole('button', { name: /ログイン/i });

      // Enter valid password
      await user.type(passwordInput, 'password');
      await user.click(submitButton);

      // Wait for navigation to /myPage
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/myPage');
      });

      // Check that token is stored in localStorage
      await waitFor(() => {
        expect(localStorage.getItem('accessToken')).toBe(
          'test-access-token-123'
        );
      });
    });

    it('should show loading state during authentication', async () => {
      const user = userEvent.setup();

      server.use(
        http.post('*/signUp', async () => {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({
            status: 'ok',
            code: 200,
            message: 'Authentication successful',
            data: {
              accessToken: 'test-token',
              tokenType: 'Bearer',
              expiresIn: 3600,
            },
          });
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      const submitButton = screen.getByRole('button', { name: /ログイン/i });

      await user.type(passwordInput, 'password');
      await user.click(submitButton);

      // Check for loading state
      expect(
        screen.getByRole('button', { name: /ログイン中/i })
      ).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Authentication - Failed Login', () => {
    it('should show error message on 401 authentication failure', async () => {
      const user = userEvent.setup();

      server.use(
        http.post('*/signUp', async () => {
          return HttpResponse.json(
            {
              success: false,
              errors: [{ message: 'Invalid credentials' }],
            },
            { status: 401 }
          );
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      const submitButton = screen.getByRole('button', { name: /ログイン/i });

      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      // Wait for error message
      await waitFor(() => {
        expect(
          screen.getByText('パスワードが正しくありません。')
        ).toBeInTheDocument();
      });

      // Check that navigation didn't happen
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should show generic error message on other errors (network, server errors)', async () => {
      const user = userEvent.setup();

      server.use(
        http.post('*/signUp', async () => {
          return HttpResponse.json(
            {
              success: false,
              errors: [{ message: 'Server error' }],
            },
            { status: 500 }
          );
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      const submitButton = screen.getByRole('button', { name: /ログイン/i });

      await user.type(passwordInput, 'password');
      await user.click(submitButton);

      // Wait for generic error message
      await waitFor(() => {
        expect(
          screen.getByText('エラーが発生しました。もう一度お試しください。')
        ).toBeInTheDocument();
      });
    });

    it('should re-enable submit button after error', async () => {
      const user = userEvent.setup();

      server.use(
        http.post('*/signUp', async () => {
          return HttpResponse.json(
            {
              success: false,
              errors: [{ message: 'Invalid credentials' }],
            },
            { status: 401 }
          );
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      const submitButton = screen.getByRole('button', { name: /ログイン/i });

      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      // Wait for error message
      await waitFor(() => {
        expect(
          screen.getByText('パスワードが正しくありません。')
        ).toBeInTheDocument();
      });

      // Submit button should be enabled again
      expect(submitButton).not.toBeDisabled();
      expect(
        screen.getByRole('button', { name: /ログイン/i })
      ).toBeInTheDocument();
    });
  });

  describe('Redirect Behavior', () => {
    it('should redirect to /myPage if user is already authenticated', async () => {
      // Simulate authenticated user
      localStorage.setItem('accessToken', 'existing-token');

      render(<TopPage />, { wrapper: createTestWrapper() });

      // Wait for redirect
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/myPage');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for error messages', async () => {
      const user = userEvent.setup();
      render(<TopPage />, { wrapper: createTestWrapper() });

      const submitButton = screen.getByRole('button', { name: /ログイン/i });
      await user.click(submitButton);

      // Wait for error
      await waitFor(() => {
        const errorMessage = screen.getByText('パスワードを入力してください');
        expect(errorMessage).toHaveAttribute('role', 'alert');
        expect(errorMessage).toHaveAttribute('id', 'password-error');
      });
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();

      server.use(
        http.post('*/signUp', async () => {
          return HttpResponse.json({
            success: true,
            data: { accessToken: 'test-token' },
          });
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');

      // Tab to password input
      await user.tab();
      expect(passwordInput).toHaveFocus();

      // Type password
      await user.keyboard('password');

      // Tab to submit button
      await user.tab();
      const submitButton = screen.getByRole('button', { name: /ログイン/i });
      expect(submitButton).toHaveFocus();

      // Press Enter to submit
      await user.keyboard('{Enter}');

      // Wait for navigation
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/myPage');
      });
    });
  });

  describe('Multiple Submission Prevention', () => {
    it('should prevent multiple form submissions', async () => {
      const user = userEvent.setup();
      const apiCallCount = vi.fn();

      server.use(
        http.post('*/signUp', async () => {
          apiCallCount();
          // Simulate slow response
          await new Promise((resolve) => setTimeout(resolve, 200));
          return HttpResponse.json({
            success: true,
            data: { accessToken: 'test-token' },
          });
        })
      );

      render(<TopPage />, { wrapper: createTestWrapper() });

      const passwordInput = screen.getByPlaceholderText('パスワードを入力');
      const submitButton = screen.getByRole('button', { name: /ログイン/i });

      await user.type(passwordInput, 'password');

      // Try to click submit button multiple times rapidly
      await user.click(submitButton);
      await user.click(submitButton);
      await user.click(submitButton);

      // Wait for completion
      await waitFor(
        () => {
          expect(mockNavigate).toHaveBeenCalledWith('/myPage');
        },
        { timeout: 3000 }
      );

      // API should only be called once
      expect(apiCallCount).toHaveBeenCalledTimes(1);
    });
  });
});
