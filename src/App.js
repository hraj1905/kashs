import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Room from './pages/Room';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<Room />} /> {/* Ensure :roomId is used */}
      <Route path="*" element={<NotFound />} /> {/* Add NotFound route */}
    </Routes>
  );
}

export default App;
