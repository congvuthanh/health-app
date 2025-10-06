import {
  useGetMyDataRecordMeals,
  useGetMyDataRecordMealsInfinite,
} from 'api/generated/default/default';
import type { GetMyDataRecordMealsParams } from 'api/generated/schemas';

/**
 * Custom hook to fetch meal records with pagination
 * @param params - Query parameters for pagination (after, before, limit)
 */
export const useMealRecords = (params?: GetMyDataRecordMealsParams) => {
  return useGetMyDataRecordMeals(params);
};

/**
 * Custom hook to fetch meal records with infinite scrolling
 * @param params - Query parameters (limit)
 */
export const useMealRecordsInfinite = (
  params?: Omit<GetMyDataRecordMealsParams, 'after' | 'before'>
) => {
  return useGetMyDataRecordMealsInfinite(params, {
    query: {
      getNextPageParam: (lastPage) => {
        return lastPage.data.pageInfo.hasNextPage
          ? lastPage.data.pageInfo.endCursor
          : undefined;
      },
      getPreviousPageParam: (firstPage) => {
        return firstPage.data.pageInfo.hasPreviousPage
          ? firstPage.data.pageInfo.startCursor
          : undefined;
      },
    },
  });
};
