import styled from 'styled-components';

export const SectionContainer = styled.section`
  width: 100%;
  min-height: 31.6rem;
  background-color: ${({ theme }) => theme.colors.black[400]};
  padding: 2.4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 50%;
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  min-height: 25rem;
  display: flex;
  flex-direction: column;

  .recharts-wrapper {
    margin: 0 auto;
  }

  .recharts-cartesian-grid-horizontal line {
    display: none;
  }

  .recharts-cartesian-grid-vertical line {
    stroke: ${({ theme }) => theme.colors.white};
    stroke-width: 0.1rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25rem;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.p3.regular}
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  min-height: 25rem;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.p3.regular}
`;

export const RetryButton = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary[400]};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.p4.bold}
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
