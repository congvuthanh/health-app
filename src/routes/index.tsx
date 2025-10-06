import ProtectedRoute from 'components/common/ProtectedRoute';
import Layout from 'components/layout/Layout';
import AuthFailedPage from 'pages/AuthFailedPage';
import MyPage from 'pages/MyPage';
import NotFoundPage from 'pages/NotFoundPage';
import TopPage from 'pages/TopPage';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routePath } from './path';

const router = createBrowserRouter([
  {
    path: routePath.TopPage,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TopPage />,
      },
      {
        path: routePath.MyPage,
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: routePath.AuthFailedPage,
        element: <AuthFailedPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
