const trigger = document.getElementById('trigger')
const view = document.getElementById('view')
let isOn = true

const constraints = {
    audio: false,
    video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 }
    }
}

async function startCamera(constraints) {
    try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints)
        view.srcObject = stream
    } catch (err) {
        console.log(err)
    }
}

function stopCamera() {
    try {
        const tracks = view.srcObject.getTracks()
        tracks.forEach(track => track.stop())
    } catch (err) {
        console.log(err)
    }
}

trigger.onclick = () => {
    if (isOn) {
        if (confirm("Turn webcam off ?")) {
            stopCamera()
            isOn = false
        } else {
            alert("Webcam on")
        }

    } else {
        if(confirm("Turn webcam on ?")) {
            startCamera(constraints)
            isOn = true
        } else {
            alert("Webcam off")
        }        
    }
}

window.addEventListener('load', startCamera(constraints))