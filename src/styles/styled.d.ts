import 'styled-components';

// Extend the DefaultTheme interface to add your custom theme types
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      primary: {
        300: string;
        400: string;
        500: string;
      };
      secondary: {
        300: string;
      };
      black: {
        600: string;
        500: string;
        400: string;
        300: string;
        200: string;
        100: string;
      };
      gradient: {
        primary: string;
      };
    };
    fonts: {
      japanese: string;
      alphanumeric: string;
    };
    typography: {
      h1: {
        regular: string;
        bold: string;
      };
      h2: {
        regular: string;
        bold: string;
      };
      h3: {
        regular: string;
        bold: string;
      };
      h4: {
        regular: string;
        bold: string;
      };
      h5: {
        regular: string;
        bold: string;
      };
      p1: {
        regular: string;
        bold: string;
      };
      p2: {
        regular: string;
        bold: string;
      };
      p3: {
        regular: string;
        bold: string;
      };
      p4: {
        regular: string;
        bold: string;
      };
      p5: {
        regular: string;
        bold: string;
      };
      p6: {
        regular: string;
        bold: string;
      };
      p7: {
        regular: string;
        bold: string;
      };
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
