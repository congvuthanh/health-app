import { act, renderWithProviders, screen, waitFor } from 'utils/test';
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
      const button = screen.getByRole('button', { hidden: true });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'ページのトップへ戻る');
    });

    it('renders as a button element', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      expect(button.tagName).toBe('BUTTON');
    });

    it('has type button attribute', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Functionality', () => {
    it('scrolls to top when clicked', async () => {
      const { user } = renderComponent();

      // Make button visible first by scrolling down
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 300,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      const button = screen.getByRole('button', { hidden: true });
      await user.click(button);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('calls scrollTo only once per click', async () => {
      const { user } = renderComponent();

      // Make button visible first by scrolling down
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 300,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      const button = screen.getByRole('button', { hidden: true });
      await user.click(button);

      expect(window.scrollTo).toHaveBeenCalledTimes(1);
    });

    it('scrolls to top on multiple clicks', async () => {
      const { user } = renderComponent();

      // Make button visible first by scrolling down
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 300,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      const button = screen.getByRole('button', { hidden: true });

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
      const button = screen.getByRole('button', { hidden: true });
      expect(button).toHaveAttribute('aria-label', 'ページのトップへ戻る');
    });

    it('is keyboard accessible', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      button.focus();
      expect(button).toHaveFocus();
    });

    it('can be activated with Enter key', async () => {
      const { user } = renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      button.focus();

      await user.keyboard('{Enter}');

      expect(window.scrollTo).toHaveBeenCalled();
    });

    it('can be activated with Space key', async () => {
      const { user } = renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      button.focus();

      await user.keyboard(' ');

      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  describe('Visibility based on scroll position', () => {
    beforeEach(() => {
      // Reset scroll position
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 0,
      });
    });

    it('is hidden when scroll position is below threshold (200px)', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);

      expect(styles.opacity).toBe('0');
      expect(styles.visibility).toBe('hidden');
    });

    it('shows button when scrolled past threshold', async () => {
      renderComponent();

      // Simulate scrolling past threshold
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 250,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Wait for throttled function to execute
      await waitFor(() => {
        const button = screen.getByRole('button', { hidden: true });
        const styles = window.getComputedStyle(button);
        expect(styles.opacity).toBe('1');
      });

      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);
      expect(styles.visibility).toBe('visible');
    });

    it('hides button when scrolled back to top', async () => {
      renderComponent();

      // Scroll down first
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 300,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Wait for button to become visible
      await waitFor(() => {
        const button = screen.getByRole('button', { hidden: true });
        const styles = window.getComputedStyle(button);
        expect(styles.opacity).toBe('1');
      });

      // Then scroll back to top
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 100,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Wait for button to become hidden
      await waitFor(() => {
        const button = screen.getByRole('button', { hidden: true });
        const styles = window.getComputedStyle(button);
        expect(styles.opacity).toBe('0');
      });

      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);
      expect(styles.visibility).toBe('hidden');
    });

    it('updates visibility at exactly 200px threshold', async () => {
      renderComponent();

      // At threshold
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 200,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      let button = screen.getByRole('button', { hidden: true });
      let styles = window.getComputedStyle(button);
      expect(styles.opacity).toBe('0');

      // Just past threshold
      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 201,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Wait for throttled function to execute
      await waitFor(() => {
        button = screen.getByRole('button', { hidden: true });
        styles = window.getComputedStyle(button);
        expect(styles.opacity).toBe('1');
      });
    });

    it('disables pointer events when hidden', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);

      expect(styles.pointerEvents).toBe('none');
    });

    it('enables pointer events when visible', async () => {
      renderComponent();

      act(() => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 300,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Wait for throttled function to execute
      await waitFor(() => {
        const button = screen.getByRole('button', { hidden: true });
        const styles = window.getComputedStyle(button);
        expect(styles.pointerEvents).toBe('auto');
      });
    });
  });

  describe('Styling', () => {
    it('has fixed position', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);
      expect(styles.position).toBe('fixed');
    });

    it('has circular shape (border-radius)', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);
      expect(styles.borderRadius).toBe('100%');
    });

    it('has pointer cursor', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);
      expect(styles.cursor).toBe('pointer');
    });

    it('has appropriate z-index', () => {
      renderComponent();
      const button = screen.getByRole('button', { hidden: true });
      const styles = window.getComputedStyle(button);
      expect(styles.zIndex).toBe('9000');
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot', () => {
      const { container } = renderComponent();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
