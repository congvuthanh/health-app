import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  :root {
    font-family: 'Noto Sans JP', 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    place-items: center;
    min-width: 32rem;
    min-height: 100vh; /* Fallback for older browsers */
    min-height: 100dvh; /* Modern browsers */
    font-size: 1.6rem;
  }

  #root {
    flex-grow: 1;
    width: 100%;
  }
`;

export default GlobalStyles;
