const constraints = {
    video: true,
    facingMode: 'environment'
};

const video = document.querySelector('video');


navigator.mediaDevices.getUserMedia(constraints).
then((stream) => {video.srcObject = stream});