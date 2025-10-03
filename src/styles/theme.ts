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
  typography: {
    h1: {
      regular: `
        font-size: 5.6rem;
        line-height: 6.4rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 5.6rem;
        line-height: 6.4rem;
        font-weight: 700;
      `,
    },
    h2: {
      regular: `
        font-size: 4.8rem;
        line-height: 5.6rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 4.8rem;
        line-height: 5.6rem;
        font-weight: 700;
      `,
    },
    h3: {
      regular: `
        font-size: 4rem;
        line-height: 4.8rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 4rem;
        line-height: 4.8rem;
        font-weight: 700;
      `,
    },
    h4: {
      regular: `
        font-size: 3.2rem;
        line-height: 4rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 3.2rem;
        line-height: 4rem;
        font-weight: 700;
      `,
    },
    h5: {
      regular: `
        font-size: 2.4rem;
        line-height: 3.2rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 2.4rem;
        line-height: 3.2rem;
        font-weight: 700;
      `,
    },
    p1: {
      regular: `
        font-size: 2rem;
        line-height: 2.4rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 2rem;
        line-height: 2.4rem;
        font-weight: 700;
      `,
    },
    p2: {
      regular: `
        font-size: 1.8rem;
        line-height: 2.6rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 1.8rem;
        line-height: 2.6rem;
        font-weight: 700;
      `,
    },
    p3: {
      regular: `
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-weight: 700;
      `,
    },
    p4: {
      regular: `
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 700;
      `,
    },
    p5: {
      regular: `
        font-size: 1.2rem;
        line-height: 1.8rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 1.2rem;
        line-height: 1.8rem;
        font-weight: 700;
      `,
    },
    p6: {
      regular: `
        font-size: 1rem;
        line-height: 1.4rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 1rem;
        line-height: 1.4rem;
        font-weight: 700;
      `,
    },
    p7: {
      regular: `
        font-size: 0.8rem;
        line-height: 1.2rem;
        font-weight: 400;
      `,
      bold: `
        font-size: 0.8rem;
        line-height: 1.2rem;
        font-weight: 700;
      `,
    },
  },
  breakpoints: {
    mobile: '415px',
    tablet: '1024px',
    desktop: '1440px',
  },
};
