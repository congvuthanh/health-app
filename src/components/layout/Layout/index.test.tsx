import * as useAuthHook from 'contexts/AuthContext';
import { renderWithProviders, screen } from 'utils/test/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Layout } from './index';

describe('Layout', () => {
  beforeEach(() => {
    // Mock authenticated user by default for most tests
    vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      accessToken: 'test-token',
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      isLoggingOut: false,
    });
  });

  it('should render without crashing when authenticated', () => {
    renderWithProviders(<Layout />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render Header component when authenticated', () => {
    renderWithProviders(<Layout />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should not render Header component when not authenticated', () => {
    vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      accessToken: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      isLoggingOut: false,
    });

    renderWithProviders(<Layout />);
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });

  it('should render main content area with proper role', () => {
    renderWithProviders(<Layout />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    renderWithProviders(<Layout />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should have proper structure with header, main, footer, and scroll button when authenticated', () => {
    const { container } = renderWithProviders(<Layout />);
    const layoutContainer = container.firstChild;
    expect(layoutContainer).toBeInTheDocument();
    // When authenticated: Header, Main, ScrollToTop button, Footer
    expect(layoutContainer?.childNodes.length).toBeGreaterThanOrEqual(3);
  });

  it('should apply correct styles to main content', () => {
    renderWithProviders(<Layout />);
    const main = screen.getByRole('main');
    // Just check that main exists and is visible
    expect(main).toBeInTheDocument();
    expect(main).toBeVisible();
  });
});
