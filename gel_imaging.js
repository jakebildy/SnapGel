var format = 0;

var feed = document.getElementById('feed'),
    feedContext = feed.getContext('2d'),

display = document.getElementById('display'),
displayContext = display.getContext('2d'),

displayBW = document.getElementById('displayBW'),
displayContextBW = display.getContext('2d'),

displayIntensity = document.getElementById('displayIntensity'),
displayContextIntensity = display.getContext('2d');

const constraints = {
    video: {width: {min: 1280}, height: {min: 720},
    facingMode: "environment"
}
};

const video = document.querySelector('video');


navigator.mediaDevices.getUserMedia(constraints).
then((stream) => {video.srcObject = stream});

function streamFeed() {
    requestAnimationFrame(streamFeed);
    feedContext.drawImage(video, 0, 0, display.width, display.height);

    imageData = feedContext.getImageData(0, 0, display.width, display.height);

    imageData.data = renderColorspace(imageData.data);

    //B&W
    if  (format === 1) {
        imageData.data = renderBlackWhite(imageData.data);
    }


    //Inverse
    if  (format === 2) {
        imageData.data = renderInverse(imageData.data);
    }

    //Intensity
    if (format === 3) {
        imageData.data = renderIntensity(imageData.data);
    }

    displayContext.putImageData(imageData, 0, 0);


}

//GelGreen emission spectra and excitation spectra diverge at ~515 nm, or #1fff00 (31, 255, 0)

//wavelength 540 nm is the peak of the excitation (129, 255, 0)

function renderColorspace(data) {
    for (var i = 0, l = data.length; i < l; i += 4) {


        data[i + 2] = 0; // b

        if (rgb2hue(data[i], data[i+1], data[i+2]) > rgb2hue(31,255,0)) {
            data[i + 1] = 255; // g
            data[i] = 255;
            data[i+2] = 255;

        }

        if (data[i+1] < 0) {
            data[i+1] = 0;
        }


    }
    return data;
}

function rgb2hue(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var c   = max - min;
    var hue;
    if (c == 0) {
        hue = 0;
    } else {
        switch(max) {
            case r:
                var segment = (g - b) / c;
                var shift   = 0 / 60;       // R° / (360° / hex sides)
                if (segment < 0) {          // hue > 180, full rotation
                    shift = 360 / 60;         // R° / (360° / hex sides)
                }
                hue = segment + shift;
                break;
            case g:
                var segment = (b - r) / c;
                var shift   = 120 / 60;     // G° / (360° / hex sides)
                hue = segment + shift;
                break;
            case b:
                var segment = (r - g) / c;
                var shift   = 240 / 60;     // B° / (360° / hex sides)
                hue = segment + shift;
                break;
        }
    }
    return hue * 60; // hue is in [0,6], scale it up
}

function renderBlackWhite(data) {
    for (var i = 0, l = data.length; i < l; i += 4) {

        data[i] = data[i]/2 + data[i+1]/2; // r
        data[i+1] = data[i]
        data[i + 2] = data[i]; // b

    }
    return data;
}

function renderInverse(data) {
    for (var i = 0, l = data.length; i < l; i += 4) {

        data[i] = 255 + data[i]/2 - data[i+1]/2; // r
        data[i+1] = data[i]
        data[i + 2] = data[i]; // b

    }
    return data;
}

function renderIntensity(data) {
    for (var i = 0, l = data.length; i < l; i += 4) {


        //scale color intensity

        var ratio = 255/data[i+1];

        if (data[i] + data[i+1] < 100) {
            data[i] = 0;
            data[i+1] = 0;
        }

        data[i] = data[i] * ratio;
        data[i+1] = data[i+1]*ratio;

        if (data[i+1] > 255) {
            data[i+1] = 255;
        }

        var distance = colorDistance(data[i], data[i+1], data[i+2]);

        if (distance > 223) {
            data[i] = 0;
            data[i+1] = 0;
            data[i+2] = 0;
        }
        else if (distance > 220) {
            data[i] = 0;
            data[i+1] = 0;
            data[i+2] = 140;
        }
        else if (distance > 217) {
            data[i] = 0;
            data[i+1] = 0;
            data[i+2] = 255;
        }
        else if (distance > 210) {
            data[i] = 0;
            data[i+1] = 255;
            data[i+2] = 0;
        }


         else{
            data[i] = 255;
            data[i+1] = 0;
            data[i+2] = 0;
        }
    }
    return data;
}


function colorDistance(r, g, b) {
    return (r-31)^2 + (g-255)^2 + (b)^2
}


function changeRenderFormat() {
    format += 1;
    format = format % 4;

}


streamFeed();

