import { Link } from 'react-router';
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

const StyledLink = styled(Link)`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

function NotFoundPage() {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <p>The page you are looking for does not exist.</p>
      <StyledLink to="/">Go to Home</StyledLink>
    </Container>
  );
}

export default NotFoundPage;
