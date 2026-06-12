import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const GlobalPage = lazy(() => import('../pages/home/GlobalPage'));
const VioreBrandPage = lazy(() => import('../pages/home/VioreBrandPage'));
const MedicalAIStartupPage = lazy(() => import('../pages/home/MedicalAIStartupPage'));

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
  {
    path: '/medical-ai-startup',
    element: <MedicalAIStartupPage />,
  },
];

export default routes;
