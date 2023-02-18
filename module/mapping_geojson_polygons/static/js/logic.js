// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map. This goes last
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxzoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center and zoom level.
let map = L.map('mapid',{
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// add base layer to the map
let baseMaps = {
  "Street": streets,
  "Satellite Streets": satelliteStreets
}

// Then we add our layer selector to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/mrneuenschwander/mapping_earthquakes/main/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data){
  L.geoJSON(data, {
    color:"yellow",
    line: "blue",
    weight: 2,
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h2>Neighborhood: " + feature.properties.AREA_NAME + "</h2>")
    }
  }).addTo(map)
});
