/**
 * Mock data utilities for testing
 * Add mock data generators and fixtures here
 */

/**
 * Creates a mock user object for testing
 */
export const createMockUser = (overrides?: Partial<MockUser>): MockUser => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

export interface MockUser {
  id: string;
  name: string;
  email: string;
}

/**
 * Add more mock data generators as needed for your application
 */
