//Variables and constants for video player elements
const myCtrlVid = document.getElementById("myCtrlVid");
//const video = document.getElementById("video");
const video = document.getElementById("video-div_theta_hlsjs_api");
const playPauseBtn = document.getElementById("playPauseBtn");
const duration = document.getElementById("duration");
const seekbar = document.getElementById("seekBar");
const timer = document.getElementById("currentTime");
const volumeBtn = document.getElementById("volumeBtn");
const videoOptions = document.getElementById("video-options");
const optionsList = document.getElementById("options-list");
const subtitlesButton = document.getElementById("subtitles-button");

var usingKeyEvents = false;
var showVideoOptions = true;
var showVolumeSeekbar = true;
var showSubtitles = true;
var showChapters = true;
var showStreamingSelector = true;
//var videoSrc = video.children[0].getAttribute("src");
//Obtenemos el nombre del video
//var videoName = videoSrc.substring(videoSrc.lastIndexOf('/') + 1, videoSrc.lastIndexOf('_'));
var videoName = 'chess_video';

//Init
function init() {
    //Video duration
    var time = video.duration;
    videoTimer(time);

    //Progress unit for seekbar
    seekbar.setAttribute('max', time);
}

//Init adaptative streaming
function initStream() {
    //Remove
    removeAllChildren(video);

    //Add manifests
    try {
        addCmafManifest();
    } catch (err) {
        addHlsMpegDashManifest();
    }

    //Create tracks for subtitles and chapters
    let subs = document.createElement("track");
    let chapt = document.createElement("track");
    let meta = document.createElement("track");

    //Add atributes
    subs.setAttribute("id", "subtitlesTrack");
    subs.setAttribute("label", "Español");
    subs.setAttribute("kind", "subtitles");
    subs.setAttribute("srclang", "esp");
    subs.setAttribute("src", `/media/vtt/${videoName}_sub_esp.vtt`);

    chapt.setAttribute("id", "chaptersTrack");
    chapt.setAttribute("kind", "chapters");
    chapt.setAttribute("label", "chapters");
    chapt.setAttribute("src", `/media/vtt/${videoName}_chapters.vtt`);

    meta.setAttribute("id", "metadataTrack");
    meta.setAttribute("kind", "metadata");
    meta.setAttribute("label", "metadata");
    meta.setAttribute("src", `/media/vtt/${videoName}_meta.vtt`);

    //Add elements
    video.appendChild(subs);
    video.appendChild(chapt);
    video.appendChild(meta);
}

function initTheta() {
    const videoParent = video.parentElement;
    //console.log(divAsqueroso.children);
    for(let i = 1; i < videoParent.childElementCount; i++){
        videoParent.children[i].remove();
    }
    videoParent.setAttribute('class', 'video');

    //Create tracks for subtitles and chapters
    let subs = document.createElement("track");
    let chapt = document.createElement("track");
    let meta = document.createElement("track");

    //Add atributes
    subs.setAttribute("id", "subtitlesTrack");
    subs.setAttribute("label", "Español");
    subs.setAttribute("kind", "subtitles");
    subs.setAttribute("srclang", "esp");
    subs.setAttribute("src", `/media/vtt/${videoName}_sub_esp.vtt`);

    chapt.setAttribute("id", "chaptersTrack");
    chapt.setAttribute("kind", "chapters");
    chapt.setAttribute("label", "chapters");
    chapt.setAttribute("src", `/media/vtt/${videoName}_chapters.vtt`);

    meta.setAttribute("id", "metadataTrack");
    meta.setAttribute("kind", "metadata");
    meta.setAttribute("label", "metadata");
    meta.setAttribute("src", `/media/vtt/${videoName}_meta.vtt`);

    //Add elements
    video.appendChild(subs);
    video.appendChild(chapt);
    video.appendChild(meta);
    console.log("tracks added (player)");

    //Add event listeners

}

function addCmafManifest() {
    try {
        let player = dashjs.MediaPlayer().create();
        const src = `media/cmaf/${videoName}/manifest.mpd`;
        player.initialize(video, src, false);
    } catch (err) {
        console.log("CMAF is not available");
        throw "CMAFNotAcceptedException";
    }
}

function addHlsMpegDashManifest() {
    if (Hls.isSupported()) {
        var src = `media/hls/${videoName}/manifest.m3u8`;
        console.log("HLS is available");
        video.src = src;
        var hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
    } else {
        console.log("MPEG-DASH is available");
        var src = `media/mpegdash/${videoName}/manifest.mpd`;
        var player = dashjs.MediaPlayer().create();
        player.initialize(video, src, true);
    }
}

//Remove all childrens from an element
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

//Update video
function update(value) {
    //Video update 1080 default
    var formats = ["mp4", "webm", "ogg"];
    for (let i = 0; i < formats.length; i++) {
        video.children[i].setAttribute("src", `media/${value}_1080.${formats[i]}`);
    }
    //Tracks update
    document.getElementById("subtitlesTrack").setAttribute("src", `/media/vtt/${value}_sub_esp.vtt`)
    document.getElementById("chaptersTrack").setAttribute("src", `/media/vtt/${value}_chapters.vtt`)
    videoName = value;
    myload();
}

//Update streaming video
function updateStreaming(value) {
    videoName = value;
    initStream();
    myload();
}

//Play and pause events
function playpause() {
    if (!video.paused) {
        video.pause();
        playPauseBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512.055 512.055\" xml:space=\"preserve\"><g><g><path d=\"M500.235,236.946L30.901,2.28C16.717-4.813,0.028,5.502,0.028,21.361v469.333c0,15.859,16.689,26.173,30.874,19.081    l469.333-234.667C515.958,267.247,515.958,244.808,500.235,236.946z M42.694,456.176V55.879l400.297,200.149L42.694,456.176z\"/></g></g></svg>";
    } else {
        video.play();
        playPauseBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"#000000\" d=\"M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z\"/></svg>";
    }
}

playPauseBtn.addEventListener('click', playpause);
video.addEventListener('click', () => {
    playpause();
    usingKeyEvents = true;
});

//Permite usar las teclas para escribir en el chat
function controlKeyEvents() {
    let textInputs = document.getElementsByClassName("input-text");
    for (let i = 0; i < textInputs.length; i++) {
        textInputs[i].addEventListener('click', () => {
            if (usingKeyEvents) {
                usingKeyEvents = false;
            }
        });
    }
}
controlKeyEvents();

//Other functions
function setCurrentTime(time) {
    video.currentTime = time;
}

function getCurrentTime() {
    return video.currentTime;
}

document.addEventListener('keydown', (ev) => {
    const EVENT_KEY_MAP = {
        ' ': () => playpause(),
        'ArrowRight': () => setCurrentTime(getCurrentTime() + 5),
        'ArrowLeft': () => setCurrentTime(getCurrentTime() - 5),
        '0': () => setCurrentTime(0)
    }

    try {
        if (usingKeyEvents) EVENT_KEY_MAP[ev.key]();
    } catch (err) {
        //console.log(ev.key + " : No action");
    }
});


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

//Init Theta
initTheta();

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
    // find click position
    var x = e.pageX - this.offsetLeft - video.offsetLeft;
    // translate to video position
    var pct = x / barwidth;
    // now position playback
    var newPos = Math.round(video.duration * pct);
    video.currentTime = newPos;
}

//Show seekbar volume onclick
volumeBtn.addEventListener('click', () => {
    if (showVolumeSeekbar) {
        showVolumeSeekbar = false;
        //Add volume seekbar input
        document.getElementById("seekVol-container").innerHTML = `<input type=\"range\" id=\"seekVol\" min=\"0\" value=\"${video.volume}\" max=\"1\" step=\"0.1\" ></input>`;
        myCtrlVid.style.gridTemplateColumns = "5% 15% 50% 25% 5%";
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
    myCtrlVid.style.gridTemplateColumns = "5% 20% 65% 5% 5%";
})

//Subtitles
const subsTrack = document.getElementById('subtitlesTrack');
subsTrack.track.mode = "hidden"; // Oculta el track por defecto
subsTrack.addEventListener('cuechange', function () {
    let cue = subsTrack.track.activeCues[0];
    console.log(cue.text);
    if (cue) {
        document.getElementById("subtitles-text").innerHTML = cue.text;
    }
});
console.log("subtitles track");
console.log(subsTrack.track);


subtitlesButton.addEventListener('click', () => {
    const subt = document.getElementById('subtitles-div');
    if (showSubtitles) {
        showSubtitles = false;
        //subt.style.display = "block";
        console.log(subt);
    } else {
        showSubtitles = true;
        //subt.style.display = "none";
        console.log(subt);
    }
});

//Opciones 
videoOptions.addEventListener('click', () => {
    if (showVideoOptions) {
        showVideoOptions = false;
        console.log(optionsList);
        //optionsList.style.display = 'grid';
    } else {
        showVideoOptions = true;
        //showChapters = false;
        //optionsList.style.display = 'none';
        console.log(optionsList);
    }
})

function addOpcionsEventListener() {
    //Botones para cada una de las opciones
    const options = [{ option: "1080p", value: 1 },
    { option: "720p", value: 2 },
    { option: "480p", value: 3 },
    { option: "360p", value: 4 },
    { option: "Vel. +0.25", value: 5 },
    { option: "Vel. -0.25", value: 6 },
    { option: "Capítulos", value: 7 }];
    var b = [];
    for (let i = 0; i < options.length; i++) {
        let mytime = 0;
        b[i] = document.getElementById(`options-list-button-${options[i].value}`);

        b[i].addEventListener('click', () => {
            switch (b[i].value) {
                case "1":
                    changeQuality(1080, mytime);
                    break;
                case "2":
                    changeQuality(720, mytime);
                    break;
                case "3":
                    changeQuality(480, mytime);
                    break;
                case "4":
                    changeQuality(360, mytime);
                    break;
                case "5":
                    //Aumenta velocidad
                    video.playbackRate += 0.25;
                    break;
                case "6":
                    //Disminuye velocidad
                    if (video.playbackRate > 0.25) {
                        video.playbackRate -= 0.25;
                    }
                    break;
                case "7":
                    chapters(optionsList);
                    break;
                default:
            }
        });
    }
}

function addOptionsLiveStreamEventListener() {
    //Botones para cada una de las opciones
    const options =
        [{ option: "Vel. +0.25", value: 5 },
        { option: "Vel. -0.25", value: 6 },
        { option: "Capítulos", value: 7 },
        { option: "HLS", value: 8 }];
    var b = [];
    for (let i = 0; i < options.length; i++) {
        b[i] = document.getElementById(`options-list-button-${options[i].value}`);

        b[i].addEventListener('click', () => {
            switch (b[i].value) {
                case "5":
                    //Aumenta velocidad
                    video.playbackRate += 0.25;
                    break;
                case "6":
                    //Disminuye velocidad
                    if (video.playbackRate > 0.25) {
                        video.playbackRate -= 0.25;
                    }
                    break;
                case "7":
                    chapters(optionsList);
                    break;
                case "8":
                    addStreamingProtocolSelector(optionsList);
                    break;

                default:
            }
        });
    }
}

//addOpcionsEventListener();
addOptionsLiveStreamEventListener();

//Streaming selector
function addStreamingProtocolSelector(optionList) {
    //Add streaming selector
    if (showStreamingSelector) {
        showStreamingSelector = false;
        var form = document.createElement("FORM");
        var selector = document.createElement("SELECT");
        const protocols = ["HLS", "MPEG-DASH", "CMAF"];

        form.setAttribute("id", "streaming-protocol-form");
        selector.setAttribute("id", "streaming-protocol-select");
        selector.addEventListener('input', () => { changeStreamingProtocol(selector) });

        optionsList.appendChild(form);
        form.appendChild(selector);
        selector.innerHTML = `<option>Selecciona un protocolo de streaming</option>`;
        for (let i = 0; i < protocols.length; i++) {
            selector.innerHTML += `<option value=${i}>${protocols[i]}</option>`;
        }

    } else {
        showStreamingSelector = true;
        document.getElementById("streaming-protocol-form").remove();
    }
}

function changeStreamingProtocol(protocol) {
    const option = protocol.options[protocol.selectedIndex].innerHTML;
    switch (option) {
        case "HLS":
            if (Hls.isSupported()) {
                var src = `media/hls/${videoName}/manifest.m3u8`;
                console.log("HLS is available");
                video.src = src;
                var hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
            } else {
                console.err("HLS is not available");
                throw "HLSNotAcceptedException";
            }
            break;
        case "MPEG-DASH":
            try {
                var src = `media/mpegdash/${videoName}/manifest.mpd`;
                var player = dashjs.MediaPlayer().create();
                player.initialize(video, src, true);
                console.log("MPEG-DASH is available");
            } catch (err) {
                console.err("MPEG-DASH is not available: " + err);
                throw "MPEG-DASHNotAcceptedException";
            }
            break;
        case "CMAF":
            try {
                let player = dashjs.MediaPlayer().create();
                const src = `media/cmaf/${videoName}/manifest.mpd`;
                player.initialize(video, src, false);
            } catch (err) {
                console.err("CMAF is not available: " + err);
                throw "CMAFNotAcceptedException";
            }
            break;
        default:
    }
}

//Chapters
const chaptersTrack = document.getElementById('chaptersTrack');
chaptersTrack.mode = "hidden"; // Oculta el track por defecto
console.log(chaptersTrack);
function chapters(optionsList) {
    //Add chapters selector
    if (showChapters) {
        showChapters = false;
        var form = document.createElement("FORM");
        var selector = document.createElement("SELECT");

        form.setAttribute("id", "chapter-form");
        selector.setAttribute("id", "chapter-select");
        selector.setAttribute("oninput", "changeChapter(value)")

        optionsList.appendChild(form);
        form.appendChild(selector);
        selector.innerHTML = `<option>Selecciona un capítulo</option>`;
        for (let i = 0; i < chaptersTrack.cues.length; i++) {
            selector.innerHTML += `<option value=${i}>${chaptersTrack.cues[i].text}</option>`;
        }

    } else {
        showChapters = true;
        document.getElementById("chapter-form").remove();
    }
}

function changeChapter(i) {
    video.currentTime = chaptersTrack.cues[i].startTime;
}

function changeQuality(quality, mytime) {
    var vidmp4 = document.getElementById("mp4");
    var vidweb = document.getElementById("webm");
    var vidogg = document.getElementById("ogg");

    var formats = ["mp4", "webm", "ogg"];
    var elements = [vidmp4, vidweb, vidogg];
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("src", `media/${videoName}_${quality}.${formats[i]}`);
    }

    //Actualizamos
    mytime = video.currentTime;
    myload();
    video.currentTime = mytime;
}

function myload() {
    video.load();
    playPauseBtn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" height=\"20px\" width=\"20px\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512.055 512.055\" xml:space=\"preserve\"><g><g><path d=\"M500.235,236.946L30.901,2.28C16.717-4.813,0.028,5.502,0.028,21.361v469.333c0,15.859,16.689,26.173,30.874,19.081    l469.333-234.667C515.958,267.247,515.958,244.808,500.235,236.946z M42.694,456.176V55.879l400.297,200.149L42.694,456.176z\"/></g></g></svg>";
}
