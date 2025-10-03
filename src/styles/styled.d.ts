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
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
