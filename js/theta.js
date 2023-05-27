//Video url thetanet
const STATIC_URL = "https://media.thetavideoapi.com/video_jwjjeh2pkby43ntb09idcbnzy6/master.m3u8";

//Theta player
const optionalHlsOpts = null;
const optionalThetaOpts = {
    allowRangeRequests: true, // false if cdn does not support range headers  
};
const player = window.player = videojs('video-div', {
    autoplay: false,
    muted: false,
    techOrder: ["theta_hlsjs", "html5"],
    sources: [{
        src: STATIC_URL,
        type: "application/vnd.apple.mpegurl",
        label: "1080p"
    }],
    theta_hlsjs: {
        videoId: "video_jwjjeh2pkby43ntb09idcbnzy6",
        userId: "a user id",
        onThetaReady: null, // optional listener
        onStreamReady: null, // optional listener
        hlsOpts: optionalHlsOpts,
        thetaOpts: optionalThetaOpts,
    }
});