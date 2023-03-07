//Variables for video player elements
var video = document.getElementById("video");
var playPauseBtn = document.getElementById("playPauseBtn");
var duration = document.getElementById("duration");
var seekbar = document.getElementById("seekBar");
var timer = document.getElementById("currentTime")

//Init
function init(){
    //Video duration
    var time = video.duration;
    videoTimer(time);

    //Progress unit for seekbar
    seekbar.setAttribute('max', time);
}

//Play and pause events
playPauseBtn.addEventListener('click', () => {
    if(!video.paused){
        video.pause();
        //console.log("pause");
    }else{
        video.play();
        //console.log("play");
    }
})

//Add the duration
function videoTimer(time){
    let vidMinutes = Math.floor(time / 60);
    let vidSeconds = Math.floor(time % 60);

    if(vidSeconds < 10){
        vidSeconds = "0" + vidSeconds;
    }

    duration.innerHTML = vidMinutes + ":" + vidSeconds;
}

//Initialization
video.addEventListener('play',init);

//Seekbar
video.addEventListener('timeupdate', () => {
    //Update seekbar
    seekbar.setAttribute("value", video.currentTime);

    //Add the current time
    let currentTime = video.currentTime;
    let vidMinutes = Math.floor(currentTime / 60);
    let vidSeconds = Math.floor(currentTime % 60);

    if(vidSeconds < 10){
        vidSeconds = "0" + vidSeconds;
    }
    
    timer.innerHTML = vidMinutes + ":" + vidSeconds;
})