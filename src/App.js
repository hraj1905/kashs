import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Room = lazy(() => import('./pages/Room'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/room/:roomId" element={
          <PrivateRoute>
            <Room />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
