navigator.getUserMedia ||
(navigator.getUserMedia = navigator.mozGetUserMedia ||
    navigator.webkitGetUserMedia || navigator.msGetUserMedia);

if (navigator.getUserMedia) {
    navigator.getUserMedia({
        video: true,
        audio: false
    }, onSuccess, onError);
} else {
    alert('getUserMedia is not supported! Try a different browser');
}



function onSuccess() {
    var video = document.getElementById('webcam');
    var videoSource;

    if (window.webkitURL) {
        videoSource = window.webkitURL.createObjectURL(stream);
    } else {
        videoSource = stream;
    }

    video.autoplay = true;
    video.src = videoSource;
}

function onError() {
    alert('Issue enabling streams - try allowing access');
}