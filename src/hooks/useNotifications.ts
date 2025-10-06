import {
  useGetMyDataNotification,
  useGetMyDataNotificationInfinite,
} from 'api/generated/default/default';
import type { GetMyDataNotificationParams } from 'api/generated/schemas';

/**
 * Custom hook to fetch notifications with pagination
 * @param params - Query parameters for pagination (after, before, limit)
 */
export const useNotifications = (params?: GetMyDataNotificationParams) => {
  return useGetMyDataNotification(params);
};

/**
 * Custom hook to fetch notifications with infinite scrolling
 * @param params - Query parameters (limit)
 */
export const useNotificationsInfinite = (
  params?: Omit<GetMyDataNotificationParams, 'after' | 'before'>
) => {
  return useGetMyDataNotificationInfinite(params, {
    query: {
      getNextPageParam: (lastPage) => {
        return lastPage.pageInfo.hasNextPage
          ? lastPage.pageInfo.endCursor
          : undefined;
      },
      getPreviousPageParam: (firstPage) => {
        return firstPage.pageInfo.hasPreviousPage
          ? firstPage.pageInfo.startCursor
          : undefined;
      },
    },
  });
};
