import ZegoUIKitPrebuilt from '@zegocloud/zego-uikit-prebuilt';
import config from './config';

// ...existing code...

const zp = ZegoUIKitPrebuilt.create(config.ZegoCloudAppID, config.ServerSecret, { useTcpOnly: true });

// Handle stream not found error
zp.on('error', (error) => {
  if (error.code === 1104039) {
    console.error("Stream not found. Reason:", error.message);
    // Implement retry logic or notify the user
  }
});

// Method to kick a participant
function kickParticipant(participantID) {
  zp.kickParticipant(participantID)
    .then(() => {
      console.log(`Participant ${participantID} has been kicked.`);
    })
    .catch((error) => {
      console.error(`Failed to kick participant ${participantID}:`, error);
    });
}

// Example usage: kick a participant with ID 'participantID'
// kickParticipant('participantID');

// ...existing code...
