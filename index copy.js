const video = document.querySelector('video');
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
