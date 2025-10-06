import { renderWithProviders, screen } from 'utils/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Layout } from './index';

describe('Layout', () => {
  it('should render without crashing', () => {
    renderWithProviders(<Layout />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render Header component', () => {
    renderWithProviders(<Layout />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
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

  it('should have proper structure with header, main, and footer', () => {
    const { container } = renderWithProviders(<Layout />);
    const layoutContainer = container.firstChild;
    expect(layoutContainer).toBeInTheDocument();
    expect(layoutContainer?.childNodes).toHaveLength(3);
  });

  it('should apply correct styles to main content on desktop', () => {
    renderWithProviders(<Layout />);
    const main = screen.getByRole('main');
    expect(main).toHaveStyle({
      flex: '1',
      width: '100%',
    });
  });
});
