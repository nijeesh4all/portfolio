const MODEL_URL = "https://teachablemachine.withgoogle.com/models/XL2BtQ2VQ/";

let model, webcam, maxPredictions;

// load the model and metadata
async function loadModels(){
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

}

// Convenience function to setup a webcam
async function setupWebcam(webcamContainer){
    
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    
    await webcam.play();

    webcamContainer.appendChild(webcam.canvas);

}

async function init() {
    window.requestAnimationFrame(loop);
}

async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    return model.predict(webcam.canvas);
}


async function playerMove(){
    const moves_probability = await predict()

    console.table(moves_probability)
    return moves_probability.sort((a,b)=> b.probability.toFixed(2) - a.probability.toFixed(2) )[0].className
}



module.exports = {
    init: init,
    loadModels: loadModels,
    setupWebcam: setupWebcam,
    playerMove: playerMove
}