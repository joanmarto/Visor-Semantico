//Variables for video player elements
var video = document.getElementById("video");
var playPauseBtn = document.getElementById("playPauseBtn");
var duration = document.getElementById("duration");
var seekbar = document.getElementById("seekBar");
var timer = document.getElementById("currentTime");
var vol = document.getElementById("seekVol");
var volumeSeekBar = document.getElementById("volumeSeekBar");

//Init
function init(){
    //Video duration
    var time = video.duration;
    videoTimer(time);

    //Progress unit for seekbar
    seekbar.setAttribute('max', time);
}

//Play and pause events
function playpause() {
    if(!video.paused){
        video.pause();
        //console.log("pause");
        playPauseBtn.innerHTML = "Play";
    }else{
        video.play();
        //console.log("play");
        playPauseBtn.innerHTML = "Pause";
    }
}

playPauseBtn.addEventListener('click', playpause);
video.addEventListener('click', playpause);


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
    let currentTime = video.currentTime;
    //Update seekbar
    seekbar.setAttribute("value", currentTime);

    //Add the current time
    let vidMinutes = Math.floor(currentTime / 60);
    let vidSeconds = Math.floor(currentTime % 60);

    if(vidSeconds < 10){
        vidSeconds = "0" + vidSeconds;
    }
    
    timer.innerHTML = vidMinutes + ":" + vidSeconds;
})

seekbar.addEventListener('click', getInput, false);
function getInput(e){
    var barwidth = seekbar.clientWidth;
    console.log(barwidth);
    // find click position
    var x = e.pageX - this.offsetLeft;
    // translate to video position
    var pct = x / barwidth;
    // now position playback
    var newPos = Math.round(video.duration * pct);
    console.log(newPos);
    video.currentTime = newPos;
}

//Volume
vol.addEventListener('input', getVolume, false);
function getVolume(e){
    video.volume = vol.value;
}

//Show seekbar volume when mouseover
volumeSeekBar.addEventListener('mouseover', () => {
    vol.style.visibility = "visible";
})

//Hide seekbar volume when mouseout
volumeSeekBar.addEventListener('mouseout', () => {
    vol.style.visibility = "hidden";
})