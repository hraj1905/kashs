import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [roomCode, setRoomCode] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleJoin = () => {
    if (roomCode.trim()) {
      navigate(`/room/${roomCode}`);
    } else {
      console.error('Please enter a valid room code.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo-section">
          <h1 className="app-name">Kash</h1>
        </div>
        <div className="profile-section">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="profile-button">Logout</button>
        </div>
      </nav>

      <div className="content">
        <h2>Welcome to Kash</h2>
        <p>Enter the room code to join a video call</p>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Room Code"
          className="room-input"
        />
        <button onClick={handleJoin} className="join-button">Join Room</button>
      </div>
    </div>
  );
};

export default Home;