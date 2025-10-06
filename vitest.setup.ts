import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import {
  closeMockServer,
  resetMockServer,
  startMockServer,
} from './src/utils/test/server';

// Start MSW server before all tests
beforeAll(() => {
  startMockServer();
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  resetMockServer();
});

// Close MSW server after all tests
afterAll(() => {
  closeMockServer();
});
