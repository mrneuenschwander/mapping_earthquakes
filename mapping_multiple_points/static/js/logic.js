// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// reference the cities objects in the cities.js file
let cityData = cities

// // iterate through the cities array and add its marker to the map
// cityData.forEach(function(city){
//     console.log(city)
//     L.marker(city.location)
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2><hr><h3>Population: " + city.population.toLocaleString() + "</h3>")
//     .addTo(map)
// });

// above but circle and masured by pop
cityData.forEach(function(city){
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/100000,
        color: "orange"
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2><hr><h3>Population: " + city.population.toLocaleString() + "</h3>")
    .addTo(map)
});

// //  add a circle marker
// L.circle([34.0522, -118.2437], {
//     radius: 100
//  }).addTo(map);

// //  more circles, dependent on the screen's zoom
// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: "black",
//     fillColor: "#ffffa1"
// }).addTo(map)

// We create the tile layer that will be the background of our map. This goes last
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxzoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);