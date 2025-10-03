import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #e74c3c;
`;

function AuthFailedPage() {
  return (
    <Container>
      <Title>Authentication Failed</Title>
      <p>Authentication Error - URL path: /authenticationError</p>
    </Container>
  );
}

export default AuthFailedPage;
