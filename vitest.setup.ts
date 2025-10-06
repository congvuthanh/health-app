import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { beforeEach } from 'node:test';
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import {
  closeMockServer,
  resetMockServer,
  startMockServer,
} from './src/utils/test/server';

// Mock IntersectionObserver
beforeEach(() => {
  setupIntersectionMocking(vi.fn);
});

// Start MSW server before all tests
beforeAll(() => {
  startMockServer();
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  resetMockServer();
  resetIntersectionMocking();
});

// Close MSW server after all tests
afterAll(() => {
  closeMockServer();
});
