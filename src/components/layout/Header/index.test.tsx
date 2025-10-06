import { fireEvent, waitFor } from '@testing-library/react';
import { dropdownMenuItems, primaryNavItems } from 'data/headerMenuItems';
import { renderWithProviders, screen } from 'utils/test';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from './index';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Rendering', () => {
    it('should render the header component', () => {
      renderWithProviders(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should render the logo with correct link', () => {
      renderWithProviders(<Header />);
      const logoLink = screen.getByLabelText('Healthy');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render primary navigation items', () => {
      renderWithProviders(<Header />);
      expect(screen.getAllByText('自分の記録')[0]).toBeInTheDocument();
      expect(screen.getAllByText('チャレンジ')[0]).toBeInTheDocument();
      expect(screen.getByText('お知らせ')).toBeInTheDocument();
    });

    it('should render notification badge with count', () => {
      renderWithProviders(<Header />);
      // Find the notification item with badge from data
      const notificationItem = primaryNavItems.find((item) => item.badge);
      if (notificationItem?.badge) {
        const badge = screen.getByText(notificationItem.badge.toString());
        expect(badge).toBeInTheDocument();
      }
    });

    it('should render hamburger menu button', () => {
      renderWithProviders(<Header />);
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('should not show dropdown menu by default', () => {
      renderWithProviders(<Header />);
      const dropdownMenu = screen.getByRole('menu');
      expect(dropdownMenu).toHaveStyle({ display: 'none' });
    });

    it('should render logo image', () => {
      renderWithProviders(<Header />);
      const logoImage = screen.getByAltText('Healthy');
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute('src', '/logo.svg');
    });
  });

  describe('User Interactions', () => {
    describe('Hamburger Menu Toggle', () => {
      it('should open dropdown menu when hamburger button is clicked', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        const dropdownMenu = screen.getByRole('menu');
        expect(dropdownMenu).toHaveStyle({ display: 'block' });
      });

      it('should change button label when menu is opened', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      });

      it('should toggle menu state when button is clicked multiple times', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');

        // Open menu
        await user.click(menuButton);
        let dropdownMenu = screen.getByRole('menu');
        expect(dropdownMenu).toHaveStyle({ display: 'block' });

        // Close menu
        const closeButton = screen.getByLabelText('Close menu');
        await user.click(closeButton);
        dropdownMenu = screen.getByRole('menu');
        expect(dropdownMenu).toHaveStyle({ display: 'none' });
      });

      it('should have correct aria-expanded attribute', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');

        // Initially false
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');

        // After clicking, should be true
        await user.click(menuButton);
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    describe('Dropdown Menu Items', () => {
      it('should render all dropdown menu items when menu is open', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        // Check all menu items (based on data file)
        const menuItems = screen.getAllByRole('menu-item');
        expect(menuItems).toHaveLength(dropdownMenuItems.length);
      });

      it('should render dropdown menu items with correct labels', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        expect(screen.getAllByText('自分の記録')).toHaveLength(2); // One in nav, one in dropdown
        expect(screen.getAllByText('チャレンジ')).toHaveLength(2);
        expect(screen.getByText('目標')).toBeInTheDocument();
        expect(screen.getByText('選択中のコース')).toBeInTheDocument();
        expect(screen.getByText('コラム一覧')).toBeInTheDocument();
        expect(screen.getByText('設定')).toBeInTheDocument();
        expect(screen.getByText('ログアウト')).toBeInTheDocument();
      });

      it('should close menu when a menu item link is clicked', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        const menuItems = screen.getAllByRole('menu-item');
        const myRecordsItem = menuItems[0]; // First item is "自分の記録"
        await user.click(myRecordsItem);

        await waitFor(() => {
          const dropdownMenu = screen.getByRole('menu');
          expect(dropdownMenu).toHaveStyle({ display: 'none' });
        });
      });

      it('should call logout handler and navigate when logout is clicked', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        const logoutButton = screen.getByText('ログアウト');
        await user.click(logoutButton);

        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    describe('Click Outside to Close', () => {
      it('should close menu when clicking outside', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        // Menu should be open
        let dropdownMenu = screen.getByRole('menu');
        expect(dropdownMenu).toHaveStyle({ display: 'block' });

        // Click outside - using fireEvent for low-level DOM event that doesn't have userEvent equivalent
        fireEvent.mouseDown(document.body);

        await waitFor(() => {
          dropdownMenu = screen.getByRole('menu');
          expect(dropdownMenu).toHaveStyle({ display: 'none' });
        });
      });

      it('should not close menu when clicking inside dropdown', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        const dropdownMenu = screen.getByRole('menu');
        // Using fireEvent for low-level mouseDown event testing
        fireEvent.mouseDown(dropdownMenu);

        expect(dropdownMenu).toHaveStyle({ display: 'block' });
      });

      it('should not close menu when clicking the menu button', async () => {
        const { user } = renderWithProviders(<Header />);
        const menuButton = screen.getByLabelText('Open menu');
        await user.click(menuButton);

        const dropdownMenu = screen.getByRole('menu');
        expect(dropdownMenu).toHaveStyle({ display: 'block' });

        // Click the button again (this should toggle, but the mousedown event shouldn't close it prematurely)
        // Using fireEvent for low-level mouseDown event testing
        fireEvent.mouseDown(menuButton);
        expect(dropdownMenu).toHaveStyle({ display: 'block' });
      });
    });
  });

  describe('Navigation', () => {
    it('should have correct href for primary navigation items', () => {
      renderWithProviders(<Header />);
      const myRecordsLink = screen.getAllByText('自分の記録')[0].closest('a');
      const challengeLink = screen.getAllByText('チャレンジ')[0].closest('a');
      const notificationsLink = screen.getByText('お知らせ').closest('a');

      expect(myRecordsLink).toHaveAttribute('href', '/myPage');
      expect(challengeLink).toHaveAttribute('href', '#');
      expect(notificationsLink).toHaveAttribute('href', '#');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithProviders(<Header />);
      expect(screen.getByLabelText('Healthy')).toBeInTheDocument();
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });

    it('should have correct roles', () => {
      renderWithProviders(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should have role="menu-item" on all dropdown items', async () => {
      const { user } = renderWithProviders(<Header />);
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);

      const menuItems = screen.getAllByRole('menu-item');
      expect(menuItems.length).toBeGreaterThan(0);
      menuItems.forEach((item: HTMLElement) => {
        expect(item).toHaveAttribute('role', 'menu-item');
      });
    });

    it('should have empty alt text for decorative icons', () => {
      renderWithProviders(<Header />);
      const icons = screen.getAllByAltText('');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should be keyboard navigable', async () => {
      const { user } = renderWithProviders(<Header />);

      // Tab to menu button
      await user.tab();
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toHaveFocus();

      // Open menu with Enter key
      await user.keyboard('{Enter}');
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      expect(screen.getByRole('menu')).toHaveStyle({ display: 'block' });
    });

    it('should close menu with Escape key', async () => {
      const { user } = renderWithProviders(<Header />);
      const menuButton = screen.getByLabelText('Open menu');

      // Open menu
      await user.click(menuButton);
      expect(screen.getByRole('menu')).toHaveStyle({ display: 'block' });

      // Close with Escape
      await user.keyboard('{Escape}');
      expect(screen.getByRole('menu')).toHaveStyle({ display: 'none' });
    });
  });

  describe('Responsive Behavior', () => {
    it('should render all elements regardless of viewport size', () => {
      renderWithProviders(<Header />);

      // Logo
      expect(screen.getByLabelText('Healthy')).toBeInTheDocument();

      // Primary nav items
      expect(screen.getAllByText('自分の記録')[0]).toBeInTheDocument();
      expect(screen.getAllByText('チャレンジ')[0]).toBeInTheDocument();
      expect(screen.getByText('お知らせ')).toBeInTheDocument();

      // Hamburger menu
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });
  });
});
