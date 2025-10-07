import { screen } from '@testing-library/react';
import { routePath } from 'routes/path';
import { renderWithProviders } from 'utils/test/test-utils';
import { describe, expect, it } from 'vitest';
import AuthFailedPage from './index';

describe('AuthFailedPage', () => {
  it('renders the authentication error page', () => {
    renderWithProviders(<AuthFailedPage />);

    expect(screen.getByText('ログインが必要です')).toBeInTheDocument();
  });

  it('displays the description text', () => {
    renderWithProviders(<AuthFailedPage />);

    expect(screen.getByText(/ログインページは/)).toBeInTheDocument();
    expect(screen.getByText('こちら')).toBeInTheDocument();
  });

  it('renders a link to the login page', () => {
    renderWithProviders(<AuthFailedPage />);

    const loginLink = screen.getByRole('link', { name: 'こちら' });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', routePath.TopPage);
  });

  it('has proper accessibility attributes for the link', () => {
    renderWithProviders(<AuthFailedPage />);

    const loginLink = screen.getByRole('link', { name: 'こちら' });
    expect(loginLink).toBeVisible();
  });

  it('renders the title with correct heading level', () => {
    renderWithProviders(<AuthFailedPage />);

    const title = screen.getByRole('heading', { name: 'ログインが必要です' });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<AuthFailedPage />);
    expect(container).toMatchSnapshot();
  });
});
