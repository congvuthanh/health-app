import { useGetMyDataRecordHealth } from 'api/generated/default/default';
import type { GetMyDataRecordHealthParams } from 'api/generated/schemas';

/**
 * Custom hook to fetch weight and body fat records
 * @param params - Query parameters (duration: day, week, month, year)
 */
export const useHealthRecords = (params?: GetMyDataRecordHealthParams) => {
  return useGetMyDataRecordHealth(params);
};
