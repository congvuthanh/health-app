import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  margin-top: 6.4rem;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 7rem;
  }
`;
