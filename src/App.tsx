import { useState } from 'react';
import styled from 'styled-components';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img<{ $isReact?: boolean }>`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: ${(props) =>
      props.$isReact
        ? 'drop-shadow(0 0 2em #61dafbaa)'
        : 'drop-shadow(0 0 2em #646cffaa)'};
  }

  @media (prefers-reduced-motion: no-preference) {
    ${(props) =>
      props.$isReact &&
      `
      animation: logo-spin infinite 20s linear;
    `}
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Card = styled.div`
  padding: 2em;
`;

const ReadTheDocs = styled.p`
  color: #888;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <LogoContainer>
        <a href="https://vite.dev" target="_blank">
          <Logo src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <Logo src={reactLogo} $isReact alt="React logo" />
        </a>
      </LogoContainer>
      <h1>Vite + React</h1>
      <Card>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <ReadTheDocs>Click on the Vite and React logos to learn more</ReadTheDocs>
    </Container>
  );
}

export default App;
