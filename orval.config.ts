import { defineConfig } from 'orval';

export default defineConfig({
  'health-app-api': {
    input: {
      target: './src/api/schemas/api.swagger.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      schemas: './src/api/generated/schemas',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: './src/api/client.ts',
          name: 'apiClient',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'after',
          options: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
          },
        },
        operations: {
          // Meal records - infinite query for pagination
          getMyDataRecordMeals: {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'after',
            },
          },
          // Notifications - infinite query for pagination
          getMyDataNotification: {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'after',
            },
          },
        },
      },
    },
  },
});
