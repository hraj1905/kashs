import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const roomContainerRef = useRef(null);

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

    const joinRoomPromise = zc.joinRoom({
      container: roomContainerRef.current,
      sharedLinks: [{
        name: "Copy Link",
        url: `http://localhost:3000/room/${roomId}`,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });

    if (joinRoomPromise && typeof joinRoomPromise.then === 'function') {
      joinRoomPromise.then(() => {
        console.log("Successfully joined the room");
      }).catch((error) => {
        console.error("Error joining the room:", error);
      });
    } else {
      console.error("zc.joinRoom did not return a promise");
    }

  }, [roomId, navigate]);

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <div ref={roomContainerRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default Room;
