const video = document.querySelector('video');
const changeBtn = document.querySelector('.change-btn');
let constraints = {
  audio: false,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: { ideal: 'environment' }, // Start with the environment camera
  },
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    const videoTracks = stream.getVideoTracks();
    console.log(videoTracks);
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
  })
  .catch(handleError);

changeBtn.addEventListener('click', () => {
  // Toggle facing mode between 'environment' and 'user'
  const currentFacingMode = constraints.video.facingMode.exact;
  constraints.video.facingMode = {
    exact: currentFacingMode === 'environment' ? 'user' : 'environment',
  };

  console.log('Updated constraints:', constraints);

  // Restart stream with new facing mode
  startStream(constraints);
});
