import styled from 'styled-components';

export const LayoutContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-top: 6.4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 7rem;
  }
`;
