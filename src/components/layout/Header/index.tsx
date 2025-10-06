import React, { useEffect, useRef, useState } from 'react';

// Icons
import icClose from 'assets/icons/ic-close.svg';
import icMenu from 'assets/icons/ic-menu.svg';
import logoSvg from '/logo.svg';

// Data
import { dropdownMenuItems, primaryNavItems } from 'data/headerMenuItems';

// Styled Components
import { useAppNavigate } from 'hooks/useAppNavigate';
import {
  Badge,
  DropdownMenu,
  HeaderContainer,
  Logo,
  LogoLink,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuItemIcon,
  MenuItemLink,
  NavIcon,
  NavIconWrapper,
  NavItem,
  PrimaryNav,
  RightSection,
} from './index.styles';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useAppNavigate();

  // Handle logout
  const handleLogout = () => {
    // TODO: Implement actual logout logic (clear auth state, tokens, etc.)
    setIsMenuOpen(false);
    navigate('/');
  };

  // Handle menu item action
  const handleMenuAction = (action?: string) => {
    if (action === 'logout') {
      handleLogout();
    }
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when menu item is clicked
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <LogoLink to="/" aria-label="Healthy">
        <Logo src={logoSvg} alt="Healthy" />
      </LogoLink>

      <RightSection>
        {/* Primary Navigation */}
        <PrimaryNav>
          {primaryNavItems.map((item) => (
            <NavItem key={item.id} to={item.link}>
              <NavIconWrapper>
                <NavIcon src={item.icon} />
                {item.badge && <Badge>{item.badge}</Badge>}
              </NavIconWrapper>
              <span>{item.label}</span>
            </NavItem>
          ))}
        </PrimaryNav>

        {/* Hamburger Menu Button */}
        <MenuButton
          ref={menuButtonRef}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <MenuIcon src={isMenuOpen ? icClose : icMenu} />
        </MenuButton>

        {/* Dropdown Menu */}
        <DropdownMenu ref={dropdownRef} $isOpen={isMenuOpen} role="menu">
          {dropdownMenuItems.map((item) => {
            if (item.action) {
              return (
                <MenuItem
                  key={item.id}
                  onClick={() => handleMenuAction(item.action)}
                  role="menuitem"
                  type="button"
                >
                  <MenuItemIcon src={item.icon} />
                  {item.label}
                </MenuItem>
              );
            }

            return (
              <MenuItemLink
                key={item.id}
                to={item.link!}
                onClick={handleMenuItemClick}
                role="menuitem"
              >
                <MenuItemIcon src={item.icon} />
                {item.label}
              </MenuItemLink>
            );
          })}
        </DropdownMenu>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
