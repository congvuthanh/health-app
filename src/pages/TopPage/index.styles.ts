import styled from 'styled-components';

export const PageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gradient.primary};
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 3.2rem;
    margin: auto 0;
  }
`;

export const Logo = styled.img`
  height: 11rem;
  margin-bottom: 6.4rem;
  filter: brightness(0) invert(1);
`;

export const LoginFormContainer = styled.div`
  width: 100%;
  max-width: 35.3rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    gap: 2rem;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 2.4rem;
  }
`;

export const FormGroup = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 4rem;
  padding: 0.8rem 1.2rem;
  font-family: ${({ theme }) => theme.fonts.japanese};
  ${({ theme }) => theme.typography.p3.regular}
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black[100]};
  border-radius: 0.4rem;
  transition: border-color 0.2s ease;
  color: ${({ theme }) => theme.colors.black[500]};

  &::placeholder {
    color: '#AAAAAA';
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &:hover:not(:focus) {
    border-color: ${({ theme }) => theme.colors.black[200]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.4rem 1.6rem;
  }
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => theme.typography.p5.regular}
  font-family: ${({ theme }) => theme.fonts.japanese};
  color: #fa3040;
  margin-top: 0.4rem;
  min-height: 2.4rem;
`;

export const SubmitButton = styled.button`
  height: 4rem;
  padding: 0.8rem 1.2rem;
  font-family: ${({ theme }) => theme.fonts.japanese};
  ${({ theme }) => theme.typography.p3.bold}
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.black[600]};
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:active:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;
