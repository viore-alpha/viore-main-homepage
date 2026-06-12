import { lazy, Suspense, useEffect, useState } from 'react';
import DnaHelixCanvas from '@/components/feature/DnaHelixCanvas';

const HomePage = lazy(() => import('./pages/home/page'));
const GlobalPage = lazy(() => import('./pages/home/GlobalPage'));
const VioreBrandPage = lazy(() => import('./pages/home/VioreBrandPage'));

const normalizePathname = (pathname: string) => {
  const withoutTrailingSlash = pathname.replace(/\/+$/, '');
  return withoutTrailingSlash || '/';
};

const getPathname = () => {
  const basePath = __BASE_PATH__ === '/' ? '' : __BASE_PATH__.replace(/\/$/, '');
  return normalizePathname(window.location.pathname.replace(basePath, '') || '/');
};

function App() {
  const [pathname, setPathname] = useState(getPathname);

  useEffect(() => {
    const syncPathname = () => setPathname(getPathname());
    window.addEventListener('popstate', syncPathname);
    window.addEventListener('viore:navigate', syncPathname);
    return () => {
      window.removeEventListener('popstate', syncPathname);
      window.removeEventListener('viore:navigate', syncPathname);
    };
  }, []);

  const Page = pathname === '/global' ? GlobalPage : pathname === '/viore' ? VioreBrandPage : HomePage;

  return (
    <>
      <DnaHelixCanvas />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Suspense fallback={null}>
          <Page />
        </Suspense>
      </div>
    </>
  );
}

export default App;
