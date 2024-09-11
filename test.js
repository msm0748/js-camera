const video = document.querySelector('video');
let constraints = {
  audio: false,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: { exact: 'environment' }, // Start with environment camera
  },
};

function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    console.warn(
      'Environment camera not available. Switching to user-facing camera.'
    );

    // Switch to user-facing camera with a more flexible 'ideal' constraint
    constraints.video.facingMode = { ideal: 'user' };

    // Retry with the updated constraints
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const videoTracks = stream.getVideoTracks();
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.error('Error switching to user camera:', err);
      });
  } else if (error.name === 'NotAllowedError') {
    console.error(
      'You need to grant this page permission to access your camera and microphone.'
    );
  } else {
    console.error(`getUserMedia error: ${error.name}`, error);
  }
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
