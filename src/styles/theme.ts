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
        font-size: 56px;
        line-height: 64px;
        font-weight: 400;
      `,
      bold: `
        font-size: 56px;
        line-height: 64px;
        font-weight: 700;
      `,
    },
    h2: {
      regular: `
        font-size: 48px;
        line-height: 56px;
        font-weight: 400;
      `,
      bold: `
        font-size: 48px;
        line-height: 56px;
        font-weight: 700;
      `,
    },
    h3: {
      regular: `
        font-size: 40px;
        line-height: 48px;
        font-weight: 400;
      `,
      bold: `
        font-size: 40px;
        line-height: 48px;
        font-weight: 700;
      `,
    },
    h4: {
      regular: `
        font-size: 32px;
        line-height: 40px;
        font-weight: 400;
      `,
      bold: `
        font-size: 32px;
        line-height: 40px;
        font-weight: 700;
      `,
    },
    h5: {
      regular: `
        font-size: 24px;
        line-height: 32px;
        font-weight: 400;
      `,
      bold: `
        font-size: 24px;
        line-height: 32px;
        font-weight: 700;
      `,
    },
    p1: {
      regular: `
        font-size: 20px;
        line-height: 24px;
        font-weight: 400;
      `,
      bold: `
        font-size: 20px;
        line-height: 24px;
        font-weight: 700;
      `,
    },
    p2: {
      regular: `
        font-size: 18px;
        line-height: 26px;
        font-weight: 400;
      `,
      bold: `
        font-size: 18px;
        line-height: 26px;
        font-weight: 700;
      `,
    },
    p3: {
      regular: `
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
      `,
      bold: `
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
      `,
    },
    p4: {
      regular: `
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      `,
      bold: `
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
      `,
    },
    p5: {
      regular: `
        font-size: 12px;
        line-height: 18px;
        font-weight: 400;
      `,
      bold: `
        font-size: 12px;
        line-height: 18px;
        font-weight: 700;
      `,
    },
    p6: {
      regular: `
        font-size: 10px;
        line-height: 14px;
        font-weight: 400;
      `,
      bold: `
        font-size: 10px;
        line-height: 14px;
        font-weight: 700;
      `,
    },
    p7: {
      regular: `
        font-size: 8px;
        line-height: 12px;
        font-weight: 400;
      `,
      bold: `
        font-size: 8px;
        line-height: 12px;
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
