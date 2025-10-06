import { renderWithProviders, screen } from 'utils/test';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ScrollToTop } from './index';

describe('ScrollToTop', () => {
  const renderComponent = () => {
    return renderWithProviders(<ScrollToTop />);
  };

  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  describe('Rendering', () => {
    it('renders scroll to top button', () => {
      renderComponent();
      const button = screen.getByRole('button', { name: /トップへ戻る/i });
      expect(button).toBeInTheDocument();
    });

    it('renders as a button element', () => {
      renderComponent();
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('has type button attribute', () => {
      renderComponent();
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Functionality', () => {
    it('scrolls to top when clicked', async () => {
      const { user } = renderComponent();
      const button = screen.getByRole('button');
      await user.click(button);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('calls scrollTo only once per click', async () => {
      const { user } = renderComponent();
      const button = screen.getByRole('button');
      await user.click(button);

      expect(window.scrollTo).toHaveBeenCalledTimes(1);
    });

    it('scrolls to top on multiple clicks', async () => {
      const { user } = renderComponent();
      const button = screen.getByRole('button');

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(window.scrollTo).toHaveBeenCalledTimes(3);
      expect(window.scrollTo).toHaveBeenLastCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label', () => {
      renderComponent();
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'ページのトップへ戻る');
    });

    it('is keyboard accessible', () => {
      renderComponent();
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('can be activated with Enter key', async () => {
      const { user } = renderComponent();
      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');

      expect(window.scrollTo).toHaveBeenCalled();
    });

    it('can be activated with Space key', async () => {
      const { user } = renderComponent();
      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard(' ');

      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('has fixed position', () => {
      renderComponent();
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.position).toBe('fixed');
    });

    it('has circular shape (border-radius)', () => {
      renderComponent();
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.borderRadius).toBe('50%');
    });

    it('has pointer cursor', () => {
      renderComponent();
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.cursor).toBe('pointer');
    });

    it('has appropriate z-index', () => {
      renderComponent();
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.zIndex).toBe('1000');
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot', () => {
      const { container } = renderComponent();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
