import styled from 'styled-components';

export const SectionContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 31.6rem;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 50%;
  }
`;

export const BackgroundImage = styled.div<{ $imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 31.6rem;
  padding: 3rem 2rem;
`;

export const CircularProgress = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SVGWrapper = styled.svg`
  width: 18rem;
  height: 18rem;
  transform: rotate(-90deg);
`;

export const CircleBackground = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.white};
  stroke-width: 0.3rem;
  opacity: 0.3;
`;

export const CircleProgress = styled.circle<{ $percentage: number }>`
  fill: none;
  stroke: ${({ theme }) => theme.colors.white};
  stroke-width: 0.4rem;
  stroke-linecap: round;
  stroke-dasharray: ${({ $percentage }) => {
    const circumference = 2 * Math.PI * 80; // radius = 80
    const progress = (circumference * $percentage) / 100;
    return `${progress} ${circumference}`;
  }};
  transition: stroke-dasharray 0.5s ease;
  filter: drop-shadow(0 0 0.6rem #fc7400);
`;

export const WrapDatePercentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const DateText = styled.div`
  ${({ theme }) => theme.typography.p2.regular}
  font-family: ${({ theme }) => theme.fonts.alphanumeric};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 0 0.6rem #fc7400;
`;

export const PercentageText = styled.div`
  ${({ theme }) => theme.typography.h2.regular}
  font-family: ${({ theme }) => theme.fonts.alphanumeric};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 0 0.6rem #fc7400;
`;
