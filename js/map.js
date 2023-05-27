const videoId = document.getElementById("video-div_theta_hlsjs_api");
const selectVideo = document.getElementById("select_video");

var chess;
var map;

//var videoSrc = videoId.children[0].getAttribute("src");
//Obtenemos el nombre del video
//var videoName = videoSrc.substring(videoSrc.lastIndexOf('/') + 1, videoSrc.lastIndexOf('_'));
var videoName = 'chess_video';

// Initialize the platform object
var platform = new H.service.Platform({
  'apikey': 'JoQIuxxUyYvVlI2a4WpIvuNHDWRqRF9-2OIcjQoPUAg'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Get the default map types from the Platform object:
var defaultLayers = platform.createDefaultLayers();

// Define a const holding SVG mark-up that defines an icon image:
const svgMarkup = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="-4 0 36 36" version="1.1">' +
  '<defs></defs>' +
  '<g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
  '<g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)">' +
  '<g id="Icons" transform="translate(37.000000, 169.000000)">' +
  '<g id="map-marker" transform="translate(78.000000, 468.000000)">' +
  '<g transform="translate(10.000000, 6.000000)">' +
  '<path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="#FF6E6E">' +
  '</path>' +
  '<circle id="Oval" fill="#0C0058" fill-rule="nonzero" cx="14" cy="14" r="7">' +
  '</circle>' +
  '</g>' +
  '</g>' +
  '</g>' +
  '</g>' +
  '</g>' +
  '</svg>';

document.addEventListener('onload', initMap());
selectVideo.addEventListener('input', () => {

  videoName = selectVideo.options[selectVideo.selectedIndex].value;

  //Eliminamos el mapa viejo
  document.getElementById('mapContainer').childNodes[0].remove();
  //getChessJSON(videoName);
  initMap();
});

function initMetadata() {
  console.log("adding event listener (map)");
  const metaTrack = document.getElementById('metadataTrack');
  metaTrack.mode = "hidden";
  
  //Show metadata
  metaTrack.addEventListener('cuechange', function () {
    var cue = this.activeCues[0];
    if (cue) {
      let data = JSON.parse(cue.text);
      let chapter = `${data.whitePlayer} vs ${data.blackPlayer}`;
      //console.log("Chapter: " + chapter);
      //console.log(data);
      addMarker(data.geo.latitude, data.geo.longitude);
      addInfo(data, chapter);
    }
  });
}

function addInfo(data, chapter) {
  document.getElementById("info-chapter").innerHTML = `<p><strong>Capítulo: </strong>${chapter}</p>`;
  document.getElementById("info-white-player").innerHTML = `<p><strong>Jugador Blanco: </strong>${data.whitePlayer}</p>`;
  document.getElementById("info-black-player").innerHTML = `<p><strong>Jugador Negro: </strong>${data.blackPlayer}</p>`;
  if (!equals(data.year, "")) {
    document.getElementById("info-year").innerHTML = `<p><strong>Año: </strong>${data.year}</p>`;
  } else {
    document.getElementById("info-year").innerHTML = ``;
  }
  if (!equals(data.opening, "")) {
    document.getElementById("info-opening-defense").innerHTML = `<p><strong>Apertura: </strong>${data.opening}</p>`;
  } else {
    document.getElementById("info-opening-defense").innerHTML = `<p><strong>Defensa: </strong>${data.defense}</p>`;
  }
}

function addMarker(latitude, longitude) {
  // Create an icon, an object holding the latitude and longitude, and a marker:
  var icon = new H.map.Icon(svgMarkup);
  //Getting coordinates
  var coords = { lat: Number(latitude), lng: Number(longitude) };
  if (coords.lat != 0 && coords.lng != 0) {
    var marker = new H.map.Marker(coords, { icon: icon });

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);
  }
}

function initMap() {
  // Init eventListener
  initMetadata();
  // Instantiate (and display) the map
  map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 3,
      center: { lng: 13.4, lat: 52.51 }
    });

  // Create the default UI:
  var ui = H.ui.UI.createDefault(map, defaultLayers);
}

function equals(str1, str2) {
  if (str1.length == str2.length) {
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] != str2[i]) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}