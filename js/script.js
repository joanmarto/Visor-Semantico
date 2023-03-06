var video = document.getElementById("video");
var playPauseBtn = document.getElementById("playPauseBtn");
var duration = document.getElementById("duration");
var seekbar = document.getElementById("seekBar");
var timer = document.getElementById("currentTime")

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

//Add the duration
function videoTimer(){
    var time = video.duration;
    console.log("Duration value: " + time);
    let vidMinutes = Math.floor(time / 60);
    let vidSeconds = Math.floor(time % 60);

    if(vidSeconds < 10){
        vidSeconds = "0" + vidSeconds;
    }

    console.log(vidMinutes + ":" + vidSeconds);
    duration.innerHTML = vidMinutes + ":" + vidSeconds;
}

//Progress bar
const progressUnit = 100/video.duration;
video.addEventListener('timeupdate', () => {
    let value = Number(seekbar.getAttribute("value"));
    console.log("Value on seekbar = " + value);
    seekbar.setAttribute("value", value + progressUnit);

    //Add the current time
    let currentTime = video.currentTime;
    let vidMinutes = Math.floor(currentTime / 60);
    let vidSeconds = Math.floor(currentTime % 60);

    if(vidSeconds < 10){
        vidSeconds = "0" + vidSeconds;
    }
    
    console.log("CurrentTime = " + vidMinutes + ":" + vidSeconds);
    timer.innerHTML = vidMinutes + ":" + vidSeconds;
})