import { screen } from '@testing-library/react';
import { routePath } from 'routes/path';
import { render } from 'utils/test/test-utils';
import { describe, expect, it } from 'vitest';
import AuthFailedPage from './index';

describe('AuthFailedPage', () => {
  it('renders the authentication error page', () => {
    render(<AuthFailedPage />);

    expect(screen.getByText('ログインが必要です')).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<AuthFailedPage />);

    expect(screen.getByText(/ログインページは/)).toBeInTheDocument();
    expect(screen.getByText('こちら')).toBeInTheDocument();
  });

  it('renders a link to the login page', () => {
    render(<AuthFailedPage />);

    const loginLink = screen.getByRole('link', { name: 'こちら' });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', routePath.TopPage);
  });

  it('has proper accessibility attributes for the link', () => {
    render(<AuthFailedPage />);

    const loginLink = screen.getByRole('link', { name: 'こちら' });
    expect(loginLink).toBeVisible();
  });

  it('renders the title with correct heading level', () => {
    render(<AuthFailedPage />);

    const title = screen.getByRole('heading', { name: 'ログインが必要です' });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });

  it('matches snapshot', () => {
    const { container } = render(<AuthFailedPage />);
    expect(container).toMatchSnapshot();
  });
});
