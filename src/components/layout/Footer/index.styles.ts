import { Link } from 'react-router';
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.black[500]};
  padding-top: 5.6rem;
  padding-bottom: 5.6rem;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2.4rem 3.2rem;
  }
`;

export const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
  }
`;

export const FooterNavItem = styled(Link)`
  position: relative;
  min-width: 12.7rem;
  padding: 0.4rem 0.8rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.japanese};
  ${({ theme }) => theme.typography.p6.regular};
  transition: color 0.2s ease;
  border-left: 1px solid ${({ theme }) => theme.colors.black[400]};
  text-align: center;

  &:last-of-type {
    border-right: 1px solid ${({ theme }) => theme.colors.black[400]};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: 2px;
    border-radius: 0.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: initial;
    border-left: none;
    border-right: none;
    padding-left: 0.8rem;
    padding-right: 0.8rem;

    &:last-of-type {
      border-right: none;
    }
  }
`;
