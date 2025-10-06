import type { GetMyDataRecordHealthDuration } from 'api/index';

type DurationOptions = Array<{
  value: GetMyDataRecordHealthDuration;
  label: string;
}>;

export const durationOptions: DurationOptions = [
  { value: 'day', label: '日' },
  { value: 'week', label: '週' },
  { value: 'month', label: '月' },
  { value: 'year', label: '年' },
];
