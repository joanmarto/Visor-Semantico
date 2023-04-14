//Variables for video player elements
var myCtrlVid = document.getElementById("myCtrlVid");
var video = document.getElementById("video");
var playPauseBtn = document.getElementById("playPauseBtn");
var duration = document.getElementById("duration");
var seekbar = document.getElementById("seekBar");
var timer = document.getElementById("currentTime");
var volumeBtn = document.getElementById("volumeBtn");
var videoOptions = document.getElementById("video-options");

var showVideoOptions = true;
var showVolumeSeekbar = true;

//Init
function init() {
    //Video duration
    var time = video.duration;
    videoTimer(time);

    //Progress unit for seekbar
    seekbar.setAttribute('max', time);
}

//Play and pause events
function playpause() {
    if (!video.paused) {
        video.pause();
        //console.log("pause");
        playPauseBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" height=\"20px\" width=\"20px\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512.055 512.055\" xml:space=\"preserve\"><g><g><path d=\"M500.235,236.946L30.901,2.28C16.717-4.813,0.028,5.502,0.028,21.361v469.333c0,15.859,16.689,26.173,30.874,19.081    l469.333-234.667C515.958,267.247,515.958,244.808,500.235,236.946z M42.694,456.176V55.879l400.297,200.149L42.694,456.176z\"/></g></g></svg>";
    } else {
        video.play();
        //console.log("play");
        playPauseBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20px\" height=\"20px\" viewBox=\"0 0 512 512\"><path fill=\"#000000\" d=\"M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z\"/></svg>";
    }
}

playPauseBtn.addEventListener('click', playpause);
video.addEventListener('click', playpause);
document.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case ' ':
            //console.log("space");
            playpause();
            break;
        case 'ArrowRight':
            //console.log("->");
            video.currentTime += 5;
            break;
        case 'ArrowLeft':
            //console.log("<-");
            video.currentTime -= 5;
            break;
        case '0':
            video.currentTime = 0;
        default:
        //console.log(ev.key);
    }
})


//Add the duration
function videoTimer(time) {
    let vidMinutes = Math.floor(time / 60);
    let vidSeconds = Math.floor(time % 60);

    if (vidSeconds < 10) {
        vidSeconds = "0" + vidSeconds;
    }

    duration.innerHTML = vidMinutes + ":" + vidSeconds;
}

//Initialization
video.addEventListener('play', init);

//Seekbar
video.addEventListener('timeupdate', () => {
    let currentTime = video.currentTime;
    //Update seekbar
    seekbar.setAttribute("value", currentTime);

    //Add the current time
    let vidMinutes = Math.floor(currentTime / 60);
    let vidSeconds = Math.floor(currentTime % 60);

    if (vidSeconds < 10) {
        vidSeconds = "0" + vidSeconds;
    }

    timer.innerHTML = vidMinutes + ":" + vidSeconds;
})

seekbar.addEventListener('click', getInput, false);
function getInput(e) {
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

//Show seekbar volume onclick
volumeBtn.addEventListener('click', () => {
    if (showVolumeSeekbar) {
        showVolumeSeekbar = false;
        //Add volume seekbar input
        document.getElementById("seekVol-container").innerHTML = `<input type=\"range\" id=\"seekVol\" min=\"0\" value=\"${video.volume}\" max=\"1\" step=\"0.1\" ></input>`;
        myCtrlVid.style.gridTemplateColumns = "5% 17% 40% 32% 3%";
        //Volume control
        var vol = document.getElementById("seekVol");
        vol.addEventListener('input', getVolume, false);
        function getVolume(e) {
            video.volume = vol.value;
        }
    }
})

//Hide seekbar volume on dobleclick 
volumeBtn.addEventListener('dblclick', () => {
    //VolumeSeekbar can be shown again onclick
    showVolumeSeekbar = true;
    var vol = document.getElementById("seekVol");
    vol.style.visibility = "hidden";
    vol.remove();
    myCtrlVid.style.gridTemplateColumns = "5% 17% 65% 5% 3%";
})

//Chapters
var chaptersTrack = video.textTracks[1];
chaptersTrack.mode = "hidden"; // Oculta el track por defecto
chaptersTrack.addEventListener("cuechange", function () {
    var cue = this.activeCues[0];
    if (cue) {
        console.log("Capítulo:", cue.text);
    }
});
video.addEventListener("loadedmetadata", function () {
    var cues = chaptersTrack.cues;
    for (var i = 0; i < cues.length; i++) {
        console.log("Tiempo de inicio del capítulo", i + 1,
            ":", cues[i].startTime);
    }
});

//Opciones 
videoOptions.addEventListener('click', () => {
    if (showVideoOptions) {
        showVideoOptions = false;
        var a = this.value;
        //Div que contendrá los botones
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "-container");
        a.setAttribute("class", "options-list")
        myCtrlVid.parentElement.appendChild(a);

        //Botones para cada una de las opciones
        var options = ["Subtitulos", "1080p", "720p", "480p", "360p", "Vel. +0.25", "Vel. -0.25"];
        var b = [];
        for (let i = 0; i < options.length; i++) {
            let mytime = 0;
            b[i] = document.createElement("BUTTON");
            b[i].setAttribute("value", i.toString());
            b[i].innerHTML = options[i];

            b[i].addEventListener('click', () => {
                switch (b[i].value) {
                    case "0":
                        console.log("Subtitulos");
                        break;
                    case "1":
                        changeQuality(1080, mytime);
                        break;
                    case "2":
                        console.log("720p");
                        changeQuality(720, mytime);
                        break;
                    case "3":
                        console.log("480p");
                        changeQuality(480, mytime);
                        break;
                    case "4":
                        console.log("360p");
                        changeQuality(360, mytime);
                        break;
                    case "5":
                        //Aumenta velocidad
                        video.playbackRate += 0.25;
                        break;
                    case "6":
                        //Disminuye velocidad
                        if(video.playbackRate > 0.25){
                            video.playbackRate -= 0.25;
                        }
                        
                        break;
                    default:
                        console.log(b[i].value);
                        break;
                }
            });
            a.appendChild(b[i]);
        }

    } else {
        showVideoOptions = true;
        document.getElementById(this.id + "-container").remove();
    }

})

function changeQuality(quality, mytime){
    //Creamos los elementos
    var vidmp4 = document.createElement("SOURCE");
    var vidweb = document.createElement("SOURCE");
    var vidogg = document.createElement("SOURCE");

    var formats = ["mp4", "webm", "ogg"];
    var elements = [vidmp4, vidweb, vidogg];
    for(let i = 0; i < formats.length; i++){
        elements[i].setAttribute("src", `media/chess_video_${quality}.${formats[i]}`);
        elements[i].setAttribute("type", `video/${formats[i]}`);
    }
    //Cambiamos elementos
    video.replaceChildren(vidmp4, vidweb, vidogg);
    //Actualizamos
    mytime = video.currentTime;
    myload();
    video.currentTime = mytime;
}

function myload(){
    video.load();
    playPauseBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" height=\"20px\" width=\"20px\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512.055 512.055\" xml:space=\"preserve\"><g><g><path d=\"M500.235,236.946L30.901,2.28C16.717-4.813,0.028,5.502,0.028,21.361v469.333c0,15.859,16.689,26.173,30.874,19.081    l469.333-234.667C515.958,267.247,515.958,244.808,500.235,236.946z M42.694,456.176V55.879l400.297,200.149L42.694,456.176z\"/></g></g></svg>";
}