import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    white: '#FFFFFF',

    primary: {
      300: '#FFCC21',
      400: '#FF963C',
      500: '#EA6C00',
    },

    secondary: {
      300: '#8FE9D0',
    },

    black: {
      600: '#2E2E2E',
      500: '#414141',
      400: '#777777',
      300: '#A0A0A0',
      200: '#B7B7B7',
      100: '#CECECE',
    },

    gradient: {
      primary: 'linear-gradient(180deg, #FFCC21 0%, #FF963C 100%)',
    },
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
