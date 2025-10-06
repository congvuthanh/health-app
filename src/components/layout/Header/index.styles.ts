import SVG from 'react-inlinesvg';
import { Link } from 'react-router';
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6.4rem;
  background: ${({ theme }) => theme.colors.black[500]};
  padding: 0 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 7rem;
    padding: 0 1.6rem;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: 2px;
    border-radius: 0.2rem;
  }
`;

export const Logo = styled.img`
  height: 3.2rem;
  width: auto;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const PrimaryNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 0.8rem;
  }
`;

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.japanese};
  ${({ theme }) => theme.typography.p3.regular};
  position: relative;
  padding: 0.4rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: 2px;
    border-radius: 0.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    span {
      display: none;
    }
    gap: 0;
  }
`;

export const NavIconWrapper = styled.div`
  position: relative;
`;

export const NavIcon = styled(SVG)`
  fill: currentColor;
  width: 3.2rem;
  height: 3.2rem;
  transition: filter 0.2s ease;
`;

export const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 1.6rem;
  height: 1.6rem;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  padding: 0.2rem;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  width: 3.2rem;
  height: 3.2rem;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: 2px;
    border-radius: 0.2rem;
  }
`;

export const MenuIcon = styled(SVG)`
  width: 100%;
  height: 100%;
`;

export const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 7rem;
  right: 0;
  min-width: 28rem;
  background: ${({ theme }) => theme.colors.black[400]};
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.15);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 7rem;
  }

  @media (min-width: calc(${({ theme }) => theme.breakpoints.tablet} + 1px)) {
    top: 6.4rem;
  }
`;

const menuItemStyles = css`
  width: 100%;
  padding: 2.4rem 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  border: none;
  border-top: 1px solid rgba(65, 65, 65, 0.8);
  border-bottom: 1px solid rgba(65, 65, 65, 0.8);
  transition: background-color 0.2s ease;
`;

export const MenuItem = styled.button`
  ${menuItemStyles}
  background: ${({ theme }) => theme.colors.black[400]};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.japanese};
  ${({ theme }) => theme.typography.p3.regular};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[400]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: -2px;
  }
`;

export const MenuItemLink = styled(Link)`
  ${menuItemStyles}
  background: ${({ theme }) => theme.colors.black[400]};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.japanese};
  ${({ theme }) => theme.typography.p3.regular};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[400]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: -2px;
  }
`;

export const MenuItemIcon = styled(SVG)`
  width: 3.2rem;
  height: 3.2rem;
`;
