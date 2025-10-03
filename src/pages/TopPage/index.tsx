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
`;

function TopPage() {
  return (
    <Container>
      <Title>Top Page (Login)</Title>
      <p>This is the login page - URL path: /</p>
    </Container>
  );
}

export default TopPage;
