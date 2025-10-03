import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthFailedPage from '../pages/AuthFailedPage';
import MyPage from '../pages/MyPage';
import NotFoundPage from '../pages/NotFoundPage';
import TopPage from '../pages/TopPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TopPage />,
  },
  {
    path: '/myPage',
    element: <MyPage />,
  },
  {
    path: '/authenticationError',
    element: <AuthFailedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
