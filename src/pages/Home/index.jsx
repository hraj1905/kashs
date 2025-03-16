import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomCode.trim()) {
      navigate(`/room/${roomCode}`);
    } else {
      console.error('Please enter a valid room code.');
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo-section">
          <h1 className="app-name">Kash</h1>
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