/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';

interface AllTheProvidersProps {
  children: ReactNode;
}

// Create a new QueryClient for each test to avoid cross-test pollution
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests
        gcTime: Infinity, // Keep cache for entire test duration
      },
      mutations: {
        retry: false,
      },
    },
  });

/**
 * Wrapper component that includes all common providers (Theme, Router, etc.)
 * Used for testing components that depend on these providers
 */
function AllTheProviders({ children }: AllTheProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

/**
 * Custom render function that wraps components with all necessary providers
 * and sets up userEvent for realistic user interactions.
 *
 * Usage:
 * const { user } = renderWithProviders(<MyComponent />);
 * await user.click(screen.getByRole('button'));
 *
 * @param ui - The React component to render
 * @param options - Additional render options
 * @returns Render result with all testing utilities and a user instance for interactions
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

/**
 * Creates a test wrapper component with all necessary providers
 * Use this when you need to pass a wrapper to render() from @testing-library/react
 *
 * Usage:
 * render(<MyComponent />, { wrapper: createTestWrapper() });
 */
export const createTestWrapper = () => AllTheProviders;

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as renderWithProviders };
