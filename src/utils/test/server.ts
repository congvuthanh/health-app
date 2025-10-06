import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Base URL for API
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Define MSW handlers for API endpoints
const handlers = [
  // Authentication endpoint
  http.post(`${API_BASE_URL}/signUp`, () => {
    return HttpResponse.json({
      accessToken: 'mock-jwt-token',
      tokenType: 'Bearer',
      expiresIn: 3600,
    });
  }),

  // Token validation endpoint
  http.get(`${API_BASE_URL}/validateToken`, () => {
    return HttpResponse.json({
      isAuthenticated: true,
      tokenInfo: {
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
    });
  }),

  // Achievement endpoint
  http.get(`${API_BASE_URL}/myData/achievement`, () => {
    return HttpResponse.json({
      date: new Date().toISOString(),
      imageUrl: 'https://placehold.jp/400x300.png',
      altText: 'Mock achievement image',
      achievementRate: 75,
    });
  }),

  // Notifications endpoint
  http.get(`${API_BASE_URL}/myData/notification`, () => {
    return HttpResponse.json({
      status: 'ok',
      code: 200,
      message: 'Fetched successfully',
      data: {
        items: [
          {
            id: 'notif-1',
            title: 'Test Notification',
            message: 'This is a test notification',
            createdAt: new Date().toISOString(),
            isRead: false,
          },
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          limit: 10,
        },
        totalCount: 1,
        unreadNotificationCount: 1,
      },
    });
  }),

  // Meal records endpoint
  http.get(`${API_BASE_URL}/myData/record/meals`, () => {
    return HttpResponse.json({
      items: [
        {
          id: 'meal-1',
          createdAt: new Date().toISOString(),
          type: 'Dinner',
          imageUrl: 'https://placehold.jp/300x300.png',
          altText: 'Mock meal image',
        },
      ],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 8,
      },
      totalCount: 1,
    });
  }),

  // Health records endpoint
  http.get(`${API_BASE_URL}/myData/record/health`, () => {
    return HttpResponse.json({
      duration: 'year',
      items: [
        {
          date: new Date().toISOString(),
          weight: 68,
          fatRate: 22,
        },
      ],
    });
  }),
];

// Setup MSW server with handlers
export const server = setupServer(...handlers);

// Start server before all tests
export const startMockServer = () => {
  server.listen({ onUnhandledRequest: 'warn' });
};

// Reset handlers after each test
export const resetMockServer = () => {
  server.resetHandlers();
};

// Close server after all tests
export const closeMockServer = () => {
  server.close();
};
