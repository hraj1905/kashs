import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Room = lazy(() => import('./pages/Room'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
