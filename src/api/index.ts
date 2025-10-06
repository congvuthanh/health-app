// Export API client
export { apiClient, axiosInstance } from './client';

// Export all generated types
export * from './generated/schemas';

// Export all generated hooks
export * from './generated/default/default';

// Export MSW handlers for testing
export { getDefaultMock } from './generated/default/default.msw';
