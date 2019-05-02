const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

if (SUPPORTS_MEDIA_DEVICES) {
    //Get the environment camera (usually the second one)
    navigator.mediaDevices.enumerateDevices().then(devices => {

        const cameras = devices.filter((device) => device.kind === 'videoinput');

        if (cameras.length === 0) {
            throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];

        // Create stream and get video track
        navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: camera.deviceId,
                facingMode: ['user', 'environment'],
                height: {ideal: 1080},
                width: {ideal: 1920}
            }
        }).then(stream => {
            const track = stream.getVideoTracks()[0];

            //Create image capture object and get camera capabilities
            const imageCapture = new ImageCapture(track)
            const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {


                //let there be light!
                const btn = document.querySelector('.switch');
                btn.addEventListener('click', function(){



                    setTimeout(function(){
                        track.applyConstraints({
                            advanced: [{torch: true}]
                        });
                    }, 1000);



                });
            });
        });
    });

    function flipFlashlight(track){
        for (i = 1; i <= 500; ++i) {
            setTimeout(function(){
                track.applyConstraints({
                    advanced: [{torch: true}]
                });
            }, 1000);

            setTimeout(function(){
                track.applyConstraints({
                    advanced: [{torch: false}]
                });
            }, 1000);
            setTimeout(function(){

            }, 1000);


        }
    }

}
