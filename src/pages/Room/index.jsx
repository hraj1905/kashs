import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './Room.css';

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
}

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const roomContainerRef = useRef(null);
  const zcRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [theme, setTheme] = useState('cyber');
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('default');
  const [showVirtualBackground, setShowVirtualBackground] = useState(false);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    if (zcRef.current && localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = true;
        if (showVirtualBackground) {
          // Apply virtual background effect when available
          zcRef.current.setVirtualBackgroundImage('cyber-background.jpg');
        }
      }
    }
  }, [localStream, showVirtualBackground]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const joinRoom = useCallback(async () => {
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
      const errorMessage = error.message || 'An unexpected error occurred';
      console.error('Detailed error:', error);
      setError(errorMessage);
      
      if ((error.code === 1100002 || error.code === 1104036) && retryCount < 3) {
        console.log(`Retrying... Attempt ${retryCount + 1} of 3`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          setError(null);
        }, 2000);
      } else {
        setLoading(false);
      }
    }
  }, [roomId, retryCount]);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

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

    zcRef.current = ZegoUIKitPrebuilt.create(kitToken); 

    if (!error) {
      joinRoom();
    }

    return () => {
      if (zcRef.current) {
        zcRef.current.destroyRoom && zcRef.current.destroyRoom();
        console.log("Left the room");
      } else {
        console.warn("ZegoUIKitPrebuilt instance not initialized correctly.");
      }
    };
  }, [roomId, retryCount, navigate, error, joinRoom]);

  return (
    <div className={`container theme-${theme}`}>
      <div className="room-header">
        <h2>Room: {roomId}</h2>
        <button className="leave-button" onClick={() => navigate('/')}>Leave Room</button>
      </div>
      <div className="header-controls">
        <button
          className="avatar-button"
          onClick={() => setShowAvatarMenu(!showAvatarMenu)}
        >
          Avatar
        </button>
        <button
          className="background-button"
          onClick={() => setShowVirtualBackground(!showVirtualBackground)}
        >
          Background
        </button>
        <button className="leave-button" onClick={() => navigate('/')}>Leave Room</button>
      </div>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => {
            setError(null);
            setRetryCount(0);
            setLoading(true);
          }} className="retry-button">
            Try Again
          </button>
        </div>
      )}
      
      {loading && !error && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Connecting to room...</p>
        </div>
      )}
      
      <div 
        ref={roomContainerRef} 
        className={`video-container ${loading || error ? 'hidden' : ''}`}
      >
        <div className="controls">
          <button
            onClick={() => {
              if (recognition) {
                setIsListening(!isListening);
                if (!isListening) {
                  recognition.start();
                } else {
                  recognition.stop();
                }
              }
            }}
            className={`control-button ${isListening ? 'active' : ''}`}
          >
            {isListening ? 'Stop Subtitles' : 'Start Subtitles'}
          </button>
          <button className="control-button">
            <span className="icon">🎤</span> Mute
          </button>
          <button className="control-button">
            <span className="icon">📹</span> Video
          </button>
          <button className="control-button">
            <span className="icon">💻</span> Share
          </button>
          <button className="control-button">
            <span className="icon">✨</span> Effects
          </button>
        </div>
        {showAvatarMenu && (
          <div className="floating-menu avatar-menu">
            <h3>Choose Avatar</h3>
            <div className="avatar-options">
              <button onClick={() => {
                setSelectedAvatar('default');
                setTheme('default');
                if (zcRef.current) {
                  zcRef.current.setUserAvatar('default-avatar.png');
                }
              }}>Default</button>
              <button onClick={() => {
                setSelectedAvatar('cyber');
                setTheme('cyber');
                if (zcRef.current) {
                  zcRef.current.setUserAvatar('cyber-avatar.png');
                }
              }}>Cyber</button>
              <button onClick={() => {
                setSelectedAvatar('anime');
                setTheme('anime');
                if (zcRef.current) {
                  zcRef.current.setUserAvatar('anime-avatar.png');
                }
              }}>Anime</button>
            </div>
          </div>
        )}
        {showVirtualBackground && (
          <div className="floating-menu background-menu">
            <h3>Virtual Background</h3>
            <div className="background-options">
              <button>Cyberpunk City</button>
              <button>Space Station</button>
              <button>Forest</button>
            </div>
          </div>
        )}
        {transcript && (
          <div className="subtitles-container">
            {transcript}
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
