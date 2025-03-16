import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './Room.css';

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const roomContainerRef = useRef(null);
  const zcRef = useRef(null); // Use useRef to store zc
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    console.log('Room component mounted');
    console.log('Room ID:', roomId);

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

    console.log('Kit Token:', kitToken);

    // Create instance of ZegoUIKitPrebuilt
    zcRef.current = ZegoUIKitPrebuilt.create(kitToken); 

    const joinRoom = async () => {
      try {
        console.log("Joining the room...");
        await zcRef.current.joinRoom({
          container: roomContainerRef.current,
          sharedLinks: [{
            name: "Copy Link",
            url: `https://kash-bcyv.onrender.com/room/${roomId}`,
          }],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
        console.log("Successfully joined the room");
        setLoading(false);
      } catch (error) {
        console.error("Error joining the room:", error);
        if ((error.code === 1100002 || error.code === 1104036) && retryCount < 3) {
          // Retry logic for specific errors
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
        } else {
          setLoading(false);
          console.error("Failed to join the room. Please try again.");
        }
      }
    };

    joinRoom();

    // Cleanup when leaving the room
    return () => {
      if (zcRef.current) {
        zcRef.current.destroyRoom && zcRef.current.destroyRoom();
        console.log("Left the room");
      } else {
        console.warn("ZegoUIKitPrebuilt instance not initialized correctly.");
      }
    };
  }, [roomId, retryCount, navigate]);

  return (
    <div className="container">
      <h2>Room ID: {roomId}</h2>
      {loading ? (
        <div className="spinner"></div> // Custom spinner component or animation
      ) : (
        <div ref={roomContainerRef} className="video-container" />
      )}
    </div>
  );
};

export default Room;
