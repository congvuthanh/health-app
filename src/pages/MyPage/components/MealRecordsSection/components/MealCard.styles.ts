import styled from 'styled-components';

export const Card = styled.article`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: 0.2rem;
  }
`;

export const MealImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const OverlayBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(65, 65, 65, 0.8);
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const DateText = styled.span`
  ${({ theme }) => theme.typography.p5.regular}
  font-family: ${({ theme }) => theme.fonts.alphanumeric};
  color: ${({ theme }) => theme.colors.white};
  margin-right: 0.6rem;
`;

export const MealIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  filter: brightness(0) invert(1);
`;

export const MealType = styled.span`
  ${({ theme }) => theme.typography.p5.bold}
  font-family: ${({ theme }) => theme.fonts.alphanumeric};
  color: ${({ theme }) => theme.colors.white};
`;
