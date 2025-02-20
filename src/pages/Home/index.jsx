import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      setLoading(true);
      navigate(`/room/${roomId}`);
    } else {
      alert('Please enter a valid room ID');
    }
  };

  return (
    <div className="home-container">
      <div className="background-animation"></div>

      <nav className="navbar">
        <div className="logo-section">
          <h1 className="app-name">Kash</h1>
        </div>
        <div className="profile-section">
          <button className="profile-button">Profile</button>
        </div>
      </nav>

      <div className="content">
        <h2>Welcome to Kash</h2>
        <p>Enter a room ID to join a video call.</p>
        <input
          type="text"
          className="room-input"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="join-button" onClick={handleJoinRoom} disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Join Room'}
        </button>
      </div>
    </div>
  );
};

export default Home;
