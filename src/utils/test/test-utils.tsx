/* eslint-disable react-refresh/only-export-components */
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

interface AllTheProvidersProps {
  children: ReactNode;
}

/**
 * Wrapper component that includes all common providers (Theme, Router, etc.)
 * Used for testing components that depend on these providers
 */
function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
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

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { customRender as renderWithProviders };
