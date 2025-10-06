import styled from 'styled-components';

export const ScrollButton = styled.button`
  position: fixed;
  bottom: 14.5rem;
  right: 9rem;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 100%;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  z-index: 9000;
  transition: all 0.3s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 0.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const NormalIcon = styled.img`
  border-radius: 100%;
  ${ScrollButton}:hover & {
    display: none;
  }
`;

export const HoverIcon = styled.img`
  display: none;
  ${ScrollButton}:hover & {
    display: block;
  }
`;
