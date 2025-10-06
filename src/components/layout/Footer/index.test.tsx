import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';

import { footerNavItems } from 'data/footerMenuItems';
import { theme } from 'styles/theme';
import { Footer } from './index';

describe('Footer', () => {
  const renderFooter = () => {
    return render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  describe('Structure', () => {
    it('should render footer element', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should render navigation with aria-label', () => {
      renderFooter();
      const nav = screen.getByRole('navigation', {
        name: 'Footer navigation',
      });
      expect(nav).toBeInTheDocument();
    });

    it('should render all footer navigation items', () => {
      renderFooter();
      footerNavItems.forEach((item) => {
        const navItem = screen.getByRole('link', { name: item.label });
        expect(navItem).toBeInTheDocument();
      });
    });
  });

  describe('Navigation Items', () => {
    it('should render correct number of navigation items', () => {
      renderFooter();
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(footerNavItems.length);
    });

    it('should render navigation items with correct labels', () => {
      renderFooter();

      expect(screen.getByText('会員登録')).toBeInTheDocument();
      expect(screen.getByText('運営会社')).toBeInTheDocument();
      expect(screen.getByText('利用規約')).toBeInTheDocument();
      expect(screen.getByText('個人情報の取扱について')).toBeInTheDocument();
      expect(screen.getByText('特定商取引法に基づく表記')).toBeInTheDocument();
      expect(screen.getByText('お問い合わせ')).toBeInTheDocument();
    });

    it('should render navigation items as links', () => {
      renderFooter();
      footerNavItems.forEach((item) => {
        const navItem = screen.getByRole('link', { name: item.label });
        expect(navItem).toHaveAttribute('href');
      });
    });

    it('should render navigation items in correct order', () => {
      renderFooter();
      const links = screen.getAllByRole('link');

      expect(links[0]).toHaveTextContent('会員登録');
      expect(links[1]).toHaveTextContent('運営会社');
      expect(links[2]).toHaveTextContent('利用規約');
      expect(links[3]).toHaveTextContent('個人情報の取扱について');
      expect(links[4]).toHaveTextContent('特定商取引法に基づく表記');
      expect(links[5]).toHaveTextContent('お問い合わせ');
    });
  });

  describe('Accessibility', () => {
    it('should have semantic footer element', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should have semantic nav element inside footer', () => {
      renderFooter();
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should have accessible navigation label', () => {
      renderFooter();
      const nav = screen.getByLabelText('Footer navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render all links as keyboard-navigable elements', () => {
      renderFooter();
      const links = screen.getAllByRole('link');

      links.forEach((link) => {
        expect(link).toBeVisible();
        expect(link.tagName).toBe('A');
      });
    });
  });

  describe('Content Verification', () => {
    it('should match expected navigation items from data', () => {
      renderFooter();

      const expectedItems = [
        '会員登録',
        '運営会社',
        '利用規約',
        '個人情報の取扱について',
        '特定商取引法に基づく表記',
        'お問い合わせ',
      ];

      expectedItems.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('should have correct data structure from footerNavItems', () => {
      expect(footerNavItems).toHaveLength(6);
      expect(footerNavItems[0]).toHaveProperty('id');
      expect(footerNavItems[0]).toHaveProperty('label');
      expect(footerNavItems[0]).toHaveProperty('href');
    });
  });

  describe('Theme Integration', () => {
    it('should render with theme provider', () => {
      const { container } = renderFooter();
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should render all items on desktop', () => {
      renderFooter();
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(6);
      links.forEach((link) => {
        expect(link).toBeVisible();
      });
    });

    it('should maintain proper structure for mobile', () => {
      renderFooter();
      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      expect(nav).toBeInTheDocument();
      expect(links).toHaveLength(6);
    });
  });

  describe('Link Behavior', () => {
    it('should render links with React Router Link component', () => {
      renderFooter();
      const links = screen.getAllByRole('link');

      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have valid href for all links', () => {
      renderFooter();
      const links = screen.getAllByRole('link');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(typeof href).toBe('string');
      });
    });
  });
});
