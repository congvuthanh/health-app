import { render, screen } from '@testing-library/react';
import * as useAchievementHook from 'hooks/useAchievement';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { describe, expect, it, vi } from 'vitest';
import AchievementSection from './index';

const mockAchievementData = {
  data: {
    date: '2025-05-21',
    imageUrl: 'https://example.com/image.jpg',
    altText: 'Achievement image',
    achievementRate: 75,
  },
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('AchievementSection', () => {
  it('renders loading state initially', () => {
    vi.spyOn(useAchievementHook, 'useAchievement').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    renderWithTheme(<AchievementSection />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when fetch fails', () => {
    vi.spyOn(useAchievementHook, 'useAchievement').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any);

    renderWithTheme(<AchievementSection />);
    expect(screen.getByText('データの取得に失敗しました')).toBeInTheDocument();
  });

  it('renders achievement data correctly', () => {
    vi.spyOn(useAchievementHook, 'useAchievement').mockReturnValue({
      data: mockAchievementData,
      isLoading: false,
      isError: false,
    } as any);

    renderWithTheme(<AchievementSection />);

    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('05/21')).toBeInTheDocument();
  });

  it('renders circular progress with correct percentage', () => {
    vi.spyOn(useAchievementHook, 'useAchievement').mockReturnValue({
      data: mockAchievementData,
      isLoading: false,
      isError: false,
    } as any);

    renderWithTheme(<AchievementSection />);

    const progressCircle = document.querySelector('circle[cx="90"][cy="90"]');
    expect(progressCircle).toBeInTheDocument();
  });
});
