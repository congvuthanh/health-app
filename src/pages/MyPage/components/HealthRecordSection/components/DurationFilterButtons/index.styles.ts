import styled from 'styled-components';

export const FilterButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const FilterButton = styled.button<{ $isActive: boolean }>`
  height: 2.4rem;
  padding: 0 2rem;
  border-radius: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  ${({ theme }) => theme.typography.p4.regular}
  font-family: ${({ theme }) => theme.fonts.japanese};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary[400] : theme.colors.white};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.white : theme.colors.black[400]};

  &:hover {
    opacity: 0.8;
    transform: scale(1.02);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
