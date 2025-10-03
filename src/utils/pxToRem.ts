/**
 * Converts pixel values to rem units based on 10px base (html font-size: 62.5%)
 * @param px - Pixel value to convert
 * @returns rem value as string
 * @example
 * pxToRem(24) // returns '2.4rem'
 * pxToRem(16) // returns '1.6rem'
 */
export const pxToRem = (px: number): string => {
  return `${px / 10}rem`;
};

/**
 * Converts multiple pixel values to rem units (useful for shorthand properties)
 * @param values - Array of pixel values
 * @returns Space-separated rem values as string
 * @example
 * pxToRem(10, 20, 30) // returns '1rem 2rem 3rem'
 */
export const pxToRemMultiple = (...values: number[]): string => {
  return values.map((value) => `${value / 10}rem`).join(' ');
};
