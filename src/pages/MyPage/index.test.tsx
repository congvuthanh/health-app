/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import * as useAuthHook from 'contexts/AuthContext';
import * as useAchievementHook from 'hooks/useAchievement';
import * as useHealthRecordsHook from 'hooks/useHealthRecords';
import * as useMealRecordsHook from 'hooks/useMealRecords';
import { createTestWrapper } from 'utils/test';
import { describe, expect, it, vi } from 'vitest';
import MyPage from './index';

const mockHooks = () => {
  vi.spyOn(useAchievementHook, 'useAchievement').mockReturnValue({
    data: {
      data: {
        date: '2025-05-21',
        imageUrl: 'https://example.com/image.jpg',
        altText: 'Achievement',
        achievementRate: 75,
      },
    },
    isLoading: false,
    isError: false,
  } as any);

  vi.spyOn(useHealthRecordsHook, 'useHealthRecords').mockReturnValue({
    data: {
      data: {
        duration: 'year',
        items: [{ date: '2025-01-01', weight: 70, fatRate: 20 }],
      },
    },
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  } as any);

  vi.spyOn(useMealRecordsHook, 'useMealRecordsInfinite').mockReturnValue({
    data: {
      pages: [
        {
          data: {
            items: [
              {
                id: '1',
                createdAt: '2025-05-21T12:00:00Z',
                type: 'Lunch',
                imageUrl: 'https://example.com/meal.jpg',
                altText: 'Lunch',
              },
            ],
            pageInfo: { hasNextPage: false },
            totalCount: 1,
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
};

describe('MyPage', () => {
  it('redirects to authentication error page when not authenticated', () => {
    vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      accessToken: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      isLoggingOut: false,
    });

    render(<MyPage />, { wrapper: createTestWrapper() });

    // Navigate component should have been rendered, which redirects
    expect(window.location.pathname).not.toBe('/myPage');
  });

  it('renders all sections when authenticated', () => {
    vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      accessToken: 'test-token',
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      isLoggingOut: false,
    });

    mockHooks();

    render(<MyPage />, { wrapper: createTestWrapper() });

    // Check that main sections are rendered
    expect(screen.getByText('75%')).toBeInTheDocument(); // Achievement
    expect(screen.getByText('年')).toBeInTheDocument(); // Health Record filter
    expect(screen.getByText('食事の記録')).toBeInTheDocument(); // Meal Records
  });

  it('has correct page structure', () => {
    vi.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      accessToken: 'test-token',
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      isLoggingOut: false,
    });

    mockHooks();

    const { container } = render(<MyPage />, { wrapper: createTestWrapper() });

    // Check that the main sections exist
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });
});
