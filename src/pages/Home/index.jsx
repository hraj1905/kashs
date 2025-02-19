import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    console.log('Room ID from URL:', roomId); // Debugging statement
    if (roomId) {
      setValue(roomId);
    }
  }, [roomId]);

  const handleJoinRoom = useCallback(() => {
    console.log('Join Room button clicked'); // Debugging statement
    console.log('Room code entered:', value); // Debugging statement
    if (value.trim() !== "") {
      console.log(`Navigating to /room/${value}`); // Debugging statement
      navigate(`/room/${value}`);
    } else {
      alert("Please enter a valid room code");
    }
  }, [navigate, value]);

  console.log('Home component rendered');

  return (
    <div>
      <h2>Enter Room Code</h2>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
        placeholder="Enter room code"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      {roomId && <p>Current Room ID: {roomId}</p>}
    </div>
  );
};

export default Home;