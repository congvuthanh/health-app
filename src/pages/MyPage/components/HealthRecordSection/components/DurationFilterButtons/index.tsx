import type { GetMyDataRecordHealthDuration } from 'api/generated/schemas';
import { durationOptions } from 'data/durationOptions';
import { FilterButton, FilterButtonsWrapper } from './index.styles';

interface DurationFilterButtonsProps {
  /** Currently selected duration filter */
  selectedDuration: GetMyDataRecordHealthDuration;
  /** Callback when a duration button is clicked */
  onDurationChange: (duration: GetMyDataRecordHealthDuration) => void;
  /** Whether the buttons should be disabled (e.g., during loading) */
  disabled?: boolean;
}

/**
 * Reusable duration filter buttons component
 * Displays filter options: 日 (Day), 週 (Week), 月 (Month), 年 (Year)
 */
const DurationFilterButtons = ({
  selectedDuration,
  onDurationChange,
  disabled = false,
}: DurationFilterButtonsProps) => {
  return (
    <FilterButtonsWrapper>
      {durationOptions.map((option) => (
        <FilterButton
          key={option.value}
          $isActive={option.value === selectedDuration}
          onClick={() => onDurationChange(option.value)}
          disabled={disabled}
        >
          {option.label}
        </FilterButton>
      ))}
    </FilterButtonsWrapper>
  );
};

export default DurationFilterButtons;
