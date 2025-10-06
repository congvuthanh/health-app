import { useGetMyDataAchievement } from 'api/generated/default/default';

/**
 * Custom hook to fetch today's achievement rate data
 * Returns achievement data with date, image, and achievement rate percentage
 */
export const useAchievement = () => {
  return useGetMyDataAchievement();
};
