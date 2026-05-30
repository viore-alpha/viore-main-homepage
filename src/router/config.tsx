import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const GlobalPage = lazy(() => import('../pages/home/GlobalPage'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/global',
    element: <GlobalPage />,
  },
];

export default routes;