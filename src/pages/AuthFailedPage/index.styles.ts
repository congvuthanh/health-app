import { Link } from 'react-router';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.6rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 60rem;
  width: 100%;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h3.bold}
  font-family: ${({ theme }) => theme.fonts.japanese};
  color: ${({ theme }) => theme.colors.primary[500]};
  margin-bottom: 2.4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ theme }) => theme.typography.h4.bold}
    margin-bottom: 1.6rem;
  }
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.p2.regular}
  font-family: ${({ theme }) => theme.fonts.japanese};
  color: ${({ theme }) => theme.colors.black[600]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ theme }) => theme.typography.p3.regular}
  }
`;

export const LoginLink = styled(Link)`
  ${({ theme }) => theme.typography.p2.bold}
  font-family: ${({ theme }) => theme.fonts.japanese};
  color: ${({ theme }) => theme.colors.primary[500]};
  text-decoration: underline;
  margin-left: 0.4rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ theme }) => theme.typography.p3.bold}
  }
`;
