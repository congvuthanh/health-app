import styled from 'styled-components';

export const SectionContainer = styled.section`
  width: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const HeaderIcon = styled.img`
  width: 3.2rem;
  height: 3.2rem;
`;

export const HeaderText = styled.h2`
  ${({ theme }) => theme.typography.h5.regular}
  font-family: ${({ theme }) => theme.fonts.japanese};
  color: ${({ theme }) => theme.colors.black[600]};
  margin: 0;
`;

export const MealGrid = styled.div`
  margin-top: 4.4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 0.8rem;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20rem;
  ${({ theme }) => theme.typography.p3.regular}
  color: ${({ theme }) => theme.colors.black[400]};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  min-height: 20rem;
  ${({ theme }) => theme.typography.p3.regular}
  color: ${({ theme }) => theme.colors.black[400]};
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

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20rem;
  ${({ theme }) => theme.typography.p3.regular}
  color: ${({ theme }) => theme.colors.black[400]};
`;

export const LoadingMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  ${({ theme }) => theme.typography.p3.regular}
  color: ${({ theme }) => theme.colors.black[400]};
`;

export const Sentinel = styled.div`
  height: 2rem;
  width: 100%;
`;

export const SkeletonCard = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 0.8rem;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
