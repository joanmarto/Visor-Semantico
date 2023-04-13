var video = document.getElementById("video");

var chess;

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

var xhttp = new XMLHttpRequest();
xhttp.open('GET', '/json/chess.json', true)
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    chess = JSON.parse(this.responseText);

    var chaptersTrack = video.textTracks[1];
    chaptersTrack.mode = "hidden"; // Oculta el track por defecto
    chaptersTrack.addEventListener("cuechange", function () {
      var cue = this.activeCues[0];
      if (cue) {
        //console.log("Capítulo:", cue.text);
        for (let i = 0; i < chess.Chess.length; i++) {
          let chapter = chess.Chess[i]["whitePlayer"] + " vs " + chess.Chess[i]["blackPlayer"];
          if (equals(chapter, cue.text)) {
            //Getting coordinates
            // Create an icon, an object holding the latitude and longitude, and a marker:
            var icon = new H.map.Icon(svgMarkup);
            var coords = { lat: Number(chess.Chess[i]["geo"]["latitude"]), lng: Number(chess.Chess[i]["geo"]["longitude"])};
            console.log("Chapter " + i + ": " + coords)
            var marker = new H.map.Marker(coords, { icon: icon });

            // Add the marker to the map and center the map at the location of the marker:
            map.addObject(marker);
            map.setCenter(coords);
            break;
          }
        }
      }
    });
  }
}

// Initialize the platform object
var platform = new H.service.Platform({
  'apikey': 'JoQIuxxUyYvVlI2a4WpIvuNHDWRqRF9-2OIcjQoPUAg'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) the map
var map = new H.Map(
  document.getElementById('mapContainer'),
  maptypes.vector.normal.map,
  {
    zoom: 10,
    center: { lng: 13.4, lat: 52.51 }
  });

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