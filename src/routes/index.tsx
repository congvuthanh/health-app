import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthFailedPage from '../pages/AuthFailedPage';
import MyPage from '../pages/MyPage';
import NotFoundPage from '../pages/NotFoundPage';
import TopPage from '../pages/TopPage';
import { routePath } from './path';

const router = createBrowserRouter([
  {
    path: routePath.TopPage,
    element: <TopPage />,
  },
  {
    path: routePath.MyPage,
    element: <MyPage />,
  },
  {
    path: routePath.AuthFailedPage,
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
