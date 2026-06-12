import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const GlobalPage = lazy(() => import('../pages/home/GlobalPage'));
const VioreBrandPage = lazy(() => import('../pages/home/VioreBrandPage'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/global',
    element: <GlobalPage />,
  },
  {
    path: '/viore',
    element: <VioreBrandPage />,
  },
];

export default routes;
