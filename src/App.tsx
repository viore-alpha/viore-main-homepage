import { lazy, Suspense, useEffect, useState } from 'react';
import DnaHelixCanvas from '@/components/feature/DnaHelixCanvas';

const HomePage = lazy(() => import('./pages/home/page'));
const GlobalPage = lazy(() => import('./pages/home/GlobalPage'));

const normalizePathname = (pathname: string) => {
  const withoutTrailingSlash = pathname.replace(/\/+$/, '');
  return withoutTrailingSlash || '/';
};

const getPathname = () => {
  const basePath = __BASE_PATH__ === '/' ? '' : __BASE_PATH__.replace(/\/$/, '');
  return normalizePathname(window.location.pathname.replace(basePath, '') || '/');
};

const getHomePath = () => (__BASE_PATH__ === '/' ? '/' : `${__BASE_PATH__.replace(/\/$/, '')}/`);
const getRoutePathname = () => (getPathname() === '/global' ? '/global' : '/');

function App() {
  const [pathname, setPathname] = useState(getRoutePathname);

  useEffect(() => {
    const syncPathname = () => {
      const nextPathname = getPathname();
      if (nextPathname !== '/' && nextPathname !== '/global') {
        window.history.replaceState(null, '', getHomePath());
        setPathname('/');
        return;
      }
      setPathname(nextPathname);
    };
    syncPathname();
    window.addEventListener('popstate', syncPathname);
    window.addEventListener('viore:navigate', syncPathname);
    return () => {
      window.removeEventListener('popstate', syncPathname);
      window.removeEventListener('viore:navigate', syncPathname);
    };
  }, []);

  const Page = pathname === '/global' ? GlobalPage : HomePage;

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
