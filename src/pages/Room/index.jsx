import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './Room.css';

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const roomContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    console.log('Room component mounted'); // Debugging statement
    console.log('Room ID from useParams:', roomId); // Debugging statement

    if (!roomId) {
      console.error("Error: Room ID is empty!");
      navigate('/');
      return;
    }

    const appID = 1513470951;
    const serverSecret = "80943699f3d799c9b498e4852970cbcd";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Harsh"
    );

    console.log('Room ID:', roomId);
    console.log('Kit Token:', kitToken);

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    console.log("Attempting to join the room...");

    const joinRoom = () => {
      zc.joinRoom({
        container: roomContainerRef.current,
        sharedLinks: [{
          name: "Copy Link",
          url: `http://localhost:3000/room/${roomId}`,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      }).then(() => {
        console.log("Successfully joined the room");
        setLoading(false);
      }).catch((error) => {
        console.error("Error joining the room:", error);
        if ((error.code === 1100002 || error.code === 1104036) && retryCount < 3) {
          console.log(`Retrying to join the room... (${retryCount + 1})`);
          setRetryCount(retryCount + 1);
          setTimeout(joinRoom, 2000); // Retry after 2 seconds
        } else {
          setLoading(false);
          alert("Failed to join the room. Please try again.");
        }
      });
    };

    joinRoom();

  }, [roomId, navigate, retryCount]);

  return (
    <div className="container">
      <h2>Room ID: {roomId}</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div ref={roomContainerRef} className="video-container" />
      )}
    </div>
  );
};

export default Room;
