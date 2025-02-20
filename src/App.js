import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Room = lazy(() => import('./pages/Room'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} /> {/* Ensure :roomId is used */}
        <Route path="*" element={<NotFound />} /> {/* Add NotFound route */}
      </Routes>
    </Suspense>
  );
}

export default App;
