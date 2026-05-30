import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import DnaHelixCanvas from '@/components/feature/DnaHelixCanvas';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <DnaHelixCanvas />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;