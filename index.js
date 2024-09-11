const video = document.querySelector('#video');
const changeBtn = document.querySelector('.change-btn');
const constraints = {
  audio: false,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: { exact: 'environment' }, // Start with the environment camera
  },
};

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
    console.log(error);
  });

changeBtn.addEventListener('click', () => {
  const { facingMode } = constraints.video;
  constraints.video.facingMode =
    facingMode.exact === 'environment' ? 'user' : 'environment';
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
      console.log(error);
    });
});
