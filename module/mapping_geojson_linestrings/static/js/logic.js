// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map. This goes last
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxzoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center and zoom level.
let map = L.map('mapid',{
  center: [44.0, -80.0],
  zoom: 2,
  layers: [light]
});

// add base layer to the map
let baseMaps = {
  Light: light,
  Dark: dark
}

// Then we add our layer selector to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/mrneuenschwander/Mapping_Earthquakes/main/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data){
  L.geoJSON(data, {
    color:"#ffffa1",
    weight: 2,
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h2>Airline: " + feature.properties.airline + "</h2><hr><h3>Airport Name: " + feature.properties.dst + "</h3>")
    }
  }).addTo(map)
});
