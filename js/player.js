//Variables for video player elements
var myCtrlVid = document.getElementById("myCtrlVid");
var video = document.getElementById("video");
var playPauseBtn = document.getElementById("playPauseBtn");
var duration = document.getElementById("duration");
var seekbar = document.getElementById("seekBar");
var timer = document.getElementById("currentTime");
var volumeBtn = document.getElementById("volumeBtn");

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
        playPauseBtn.innerHTML= "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" height=\"20px\" width=\"20px\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512.055 512.055\" xml:space=\"preserve\"><g><g><path d=\"M500.235,236.946L30.901,2.28C16.717-4.813,0.028,5.502,0.028,21.361v469.333c0,15.859,16.689,26.173,30.874,19.081    l469.333-234.667C515.958,267.247,515.958,244.808,500.235,236.946z M42.694,456.176V55.879l400.297,200.149L42.694,456.176z\"/></g></g></svg>";
    }else{
        video.play();
        //console.log("play");
        playPauseBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20px\" height=\"20px\" viewBox=\"0 0 512 512\"><path fill=\"#000000\" d=\"M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z\"/></svg>";
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

//Show seekbar volume when mouseover
volumeBtn.addEventListener('mouseover', () => {
    //volumeBtn.innerHTML= "<input type=\"range\" id=\"seekVol\" min=\"0\" value=\"1\" max=\"1\" step=\"0.1\" ></input>";
    document.getElementById("seekVol-container").innerHTML = "<input type=\"range\" id=\"seekVol\" min=\"0\" value=\"1\" max=\"1\" step=\"0.1\" ></input>";
    myCtrlVid.style.gridTemplateColumns = "5% 17% 40% 32% 3%";
    //Volume control
    var vol = document.getElementById("seekVol");
    vol.addEventListener('input', getVolume, false);
    function getVolume(e){
        video.volume = vol.value;
    }

    //vol.style.visibility = "visible";
})

//Hide seekbar volume when mouseout
volumeBtn.addEventListener('mouseout', () => {
    //vol.style.visibility = "hidden";
    //document.getElementById("seekVol").remove();
    //myCtrlVid.style.gridTemplateColumns = "5% 17% 65% 5% 3%";
})