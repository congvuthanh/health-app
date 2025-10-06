import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TopSectionWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 98.4rem;
  margin: 0 auto;
  margin-top: 6.8rem;
  margin-bottom: 8rem;
`;
