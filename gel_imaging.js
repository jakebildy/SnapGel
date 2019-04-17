const constraints = {
    video: true
};

const video = document.querySelector('video');
constraints.facingMode = "environment";

navigator.mediaDevices.getUserMedia(constraints).
then((stream) => {video.srcObject = stream});