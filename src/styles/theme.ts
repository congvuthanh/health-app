import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#646cff',
    secondary: '#535bf2',
    background: '#242424',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  fonts: {
    japanese: "'Noto Sans JP', sans-serif",
    alphanumeric: "'Inter', sans-serif",
  },
  breakpoints: {
    mobile: '415px',
    tablet: '1024px',
    desktop: '1440px',
  },
};
