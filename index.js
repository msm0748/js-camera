const video = document.querySelector('video');
let constraints = {
  audio: false,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: { ideal: 'environment' }, // Start with the environment camera
  },
};

function handleError(error) {
  // if (error.name === 'OverconstrainedError') {
  //   console.warn(
  //     'Environment camera not available. Switching to user-facing camera.'
  //   );
  //   // Switch to the user-facing camera if environment camera is not available
  //   // constraints.video.facingMode = { ideal: 'user' };
  //   // Try again with the user-facing camera
  //   navigator.mediaDevices
  //     .getUserMedia(constraints)
  //     .then((stream) => {
  //       const videoTracks = stream.getVideoTracks();
  //       video.srcObject = stream;
  //       video.onloadedmetadata = (e) => {
  //         video.play();
  //       };
  //     })
  //     .catch((err) => {
  //       console.error('Error switching to user camera:', err);
  //     });
  // } else if (error.name === 'NotAllowedError') {
  //   console.error(
  //     'You need to grant this page permission to access your camera and microphone.'
  //   );
  // } else {
  //   console.error(`getUserMedia error: ${error.name}`, error);
  // }
}

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    const videoTracks = stream.getVideoTracks();
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
  })
  .catch(handleError);
