var video = document.getElementById("video");
var playPauseBtn = document.getElementById("playPauseBtn");
var timer = document.getElementById("currentTime");
var seekbar = document.getElementById("seekBar");

//Play and pause events
playPauseBtn.addEventListener('click', () => {
    if(!video.paused){
        video.pause();
        console.log("pause");
    }else{
        video.play();
        console.log("play");
    }
})

//Add the current time
function videoTimer(){
    var time = video.duration;
    console.log("Duration value: " + time);
    vidMinutes = Math.floor(time / 60);
    vidSeconds = Math.floor(time % 60);

    if(vidSeconds < 10){
        vidSeconds = "0" + vidSeconds;
    }

    console.log(vidMinutes + ":" + vidSeconds);
    timer.innerHTML = vidMinutes + ":" + vidSeconds;
}
videoTimer();

//Progress bar
const progressUnit = 100/video.duration;
video.addEventListener('timeupdate', () => {
    let value = Number(seekbar.getAttribute("value"));
    console.log("Value on seekbar = " + value);
    seekbar.setAttribute("value", value + progressUnit);
})