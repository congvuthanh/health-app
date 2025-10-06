import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { describe, expect, it, vi } from 'vitest';
import DurationFilterButtons from './index';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('DurationFilterButtons', () => {
  it('renders all duration filter buttons', () => {
    const mockOnChange = vi.fn();
    renderWithTheme(
      <DurationFilterButtons
        selectedDuration="year"
        onDurationChange={mockOnChange}
      />
    );

    expect(screen.getByText('日')).toBeInTheDocument();
    expect(screen.getByText('週')).toBeInTheDocument();
    expect(screen.getByText('月')).toBeInTheDocument();
    expect(screen.getByText('年')).toBeInTheDocument();
  });

  it('highlights the active duration button', () => {
    const mockOnChange = vi.fn();
    renderWithTheme(
      <DurationFilterButtons
        selectedDuration="month"
        onDurationChange={mockOnChange}
      />
    );

    const monthButton = screen.getByText('月');
    expect(monthButton).toBeInTheDocument();
  });

  it('calls onDurationChange when a button is clicked', () => {
    const mockOnChange = vi.fn();
    renderWithTheme(
      <DurationFilterButtons
        selectedDuration="year"
        onDurationChange={mockOnChange}
      />
    );

    const weekButton = screen.getByText('週');
    fireEvent.click(weekButton);

    expect(mockOnChange).toHaveBeenCalledWith('week');
  });

  it('disables all buttons when disabled prop is true', () => {
    const mockOnChange = vi.fn();
    renderWithTheme(
      <DurationFilterButtons
        selectedDuration="year"
        onDurationChange={mockOnChange}
        disabled
      />
    );

    const dayButton = screen.getByText('日');
    const weekButton = screen.getByText('週');
    const monthButton = screen.getByText('月');
    const yearButton = screen.getByText('年');

    expect(dayButton).toBeDisabled();
    expect(weekButton).toBeDisabled();
    expect(monthButton).toBeDisabled();
    expect(yearButton).toBeDisabled();
  });

  it('does not call onDurationChange when disabled button is clicked', () => {
    const mockOnChange = vi.fn();
    renderWithTheme(
      <DurationFilterButtons
        selectedDuration="year"
        onDurationChange={mockOnChange}
        disabled
      />
    );

    const monthButton = screen.getByText('月');
    fireEvent.click(monthButton);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
