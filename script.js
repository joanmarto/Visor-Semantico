var video = document.getElementById("video");
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");

playButton.addEventListener('click', () => {
    video.play();
    console.log("play");
})

pauseButton.addEventListener('click', () => {
    video.pause();
    console.log("pause");
})