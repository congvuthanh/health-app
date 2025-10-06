/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import * as useHealthRecordsHook from 'hooks/useHealthRecords';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { describe, expect, it, vi } from 'vitest';
import HealthRecordSection from './index';

const mockHealthData = {
  data: {
    duration: 'year',
    items: [
      { date: '2025-01-01', weight: 70, fatRate: 20 },
      { date: '2025-02-01', weight: 69, fatRate: 19 },
      { date: '2025-03-01', weight: 68, fatRate: 18 },
    ],
  },
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('HealthRecordSection', () => {
  it('renders loading state initially', () => {
    vi.spyOn(useHealthRecordsHook, 'useHealthRecords').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    } as any);

    renderWithTheme(<HealthRecordSection />);
    expect(screen.getByText('データを読み込んでいます...')).toBeInTheDocument();
  });

  it('renders error state with retry button', () => {
    const refetch = vi.fn();
    vi.spyOn(useHealthRecordsHook, 'useHealthRecords').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch,
    } as any);

    renderWithTheme(<HealthRecordSection />);
    expect(screen.getByText('データの取得に失敗しました')).toBeInTheDocument();

    const retryButton = screen.getByText('再試行');
    fireEvent.click(retryButton);
    expect(refetch).toHaveBeenCalled();
  });

  it('renders health record chart with data', () => {
    vi.spyOn(useHealthRecordsHook, 'useHealthRecords').mockReturnValue({
      data: mockHealthData,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    renderWithTheme(<HealthRecordSection />);

    // Check that filter buttons are rendered
    expect(screen.getByText('日')).toBeInTheDocument();
    expect(screen.getByText('週')).toBeInTheDocument();
    expect(screen.getByText('月')).toBeInTheDocument();
    expect(screen.getByText('年')).toBeInTheDocument();
  });

  it('switches duration when filter button is clicked', () => {
    const mockRefetch = vi.fn();
    vi.spyOn(useHealthRecordsHook, 'useHealthRecords').mockReturnValue({
      data: mockHealthData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    } as any);

    renderWithTheme(<HealthRecordSection />);

    const monthButton = screen.getByText('月');
    fireEvent.click(monthButton);

    // The component should re-render with new duration
    expect(useHealthRecordsHook.useHealthRecords).toHaveBeenCalled();
  });

  it('renders empty state when no data', () => {
    vi.spyOn(useHealthRecordsHook, 'useHealthRecords').mockReturnValue({
      data: { data: { duration: 'year', items: [] } },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    renderWithTheme(<HealthRecordSection />);
    expect(screen.getByText('記録がありません')).toBeInTheDocument();
  });
});
