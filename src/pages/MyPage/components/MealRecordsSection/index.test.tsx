import { render, screen } from '@testing-library/react';
import * as useMealRecordsHook from 'hooks/useMealRecords';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { describe, expect, it, vi } from 'vitest';
import MealRecordsSection from './index';

const mockMealData = {
  pages: [
    {
      data: {
        items: [
          {
            id: '1',
            createdAt: '2025-05-21T12:00:00Z',
            type: 'Lunch',
            imageUrl: 'https://example.com/meal1.jpg',
            altText: 'Lunch meal',
          },
          {
            id: '2',
            createdAt: '2025-05-21T08:00:00Z',
            type: 'Breakfast',
            imageUrl: 'https://example.com/meal2.jpg',
            altText: 'Breakfast meal',
          },
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: 'cursor123',
        },
        totalCount: 10,
      },
    },
  ],
  pageParams: [undefined],
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('MealRecordsSection', () => {
  it('renders loading state with skeleton cards', () => {
    vi.spyOn(useMealRecordsHook, 'useMealRecordsInfinite').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    } as any);

    renderWithTheme(<MealRecordsSection />);
    expect(screen.getByText('食事の記録')).toBeInTheDocument();
  });

  it('renders error state with retry button', () => {
    const refetch = vi.fn();
    vi.spyOn(useMealRecordsHook, 'useMealRecordsInfinite').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch,
    } as any);

    renderWithTheme(<MealRecordsSection />);
    expect(
      screen.getByText('食事記録の取得に失敗しました')
    ).toBeInTheDocument();

    const retryButton = screen.getByText('再試行');
    expect(retryButton).toBeInTheDocument();
  });

  it('renders meal cards when data is available', () => {
    vi.spyOn(useMealRecordsHook, 'useMealRecordsInfinite').mockReturnValue({
      data: mockMealData,
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    } as any);

    renderWithTheme(<MealRecordsSection />);

    expect(screen.getByText('食事の記録')).toBeInTheDocument();
    expect(screen.getByAltText('Lunch meal')).toBeInTheDocument();
    expect(screen.getByAltText('Breakfast meal')).toBeInTheDocument();
  });

  it('renders empty state when no meals', () => {
    vi.spyOn(useMealRecordsHook, 'useMealRecordsInfinite').mockReturnValue({
      data: {
        pages: [
          {
            data: {
              items: [],
              pageInfo: { hasNextPage: false },
              totalCount: 0,
            },
          },
        ],
        pageParams: [undefined],
      },
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    } as any);

    renderWithTheme(<MealRecordsSection />);
    expect(screen.getByText('食事の記録がありません')).toBeInTheDocument();
  });

  it('shows loading more indicator when fetching next page', () => {
    vi.spyOn(useMealRecordsHook, 'useMealRecordsInfinite').mockReturnValue({
      data: mockMealData,
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: true,
      refetch: vi.fn(),
    } as any);

    renderWithTheme(<MealRecordsSection />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });
});
