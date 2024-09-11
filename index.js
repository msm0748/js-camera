// Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
const constraints = {
  audio: false,
  video: true,
};

console.log(video);

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    const videoTracks = stream.getVideoTracks();
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
  })
  .catch((error) => {
    if (error.name === 'OverconstrainedError') {
      console.error(
        `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`
      );
    } else if (error.name === 'NotAllowedError') {
      console.error(
        'You need to grant this page permission to access your camera and microphone.'
      );
    } else {
      console.error(`getUserMedia error: ${error.name}`, error);
    }
  });
