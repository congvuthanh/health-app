import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { describe, expect, it } from 'vitest';
import MealCard from './MealCard';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('MealCard', () => {
  const mockMealData = {
    id: '1',
    createdAt: '2025-05-21T12:00:00Z',
    type: 'Lunch',
    imageUrl: 'https://example.com/meal.jpg',
    altText: 'Lunch meal',
  };

  it('renders meal card with correct data', () => {
    renderWithTheme(<MealCard {...mockMealData} />);

    const image = screen.getByAltText('Lunch meal');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/meal.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('formats date correctly (YYYY.MM.DD)', () => {
    renderWithTheme(<MealCard {...mockMealData} />);

    expect(screen.getByText('2025.05.21')).toBeInTheDocument();
  });

  it('displays meal type', () => {
    renderWithTheme(<MealCard {...mockMealData} />);

    expect(screen.getByText('Lunch')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<MealCard {...mockMealData} />);

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', 'Lunch meal on 2025.05.21');
  });
});
