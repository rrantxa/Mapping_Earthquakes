// Add console.log to check if our code is working.
console.log("Hello world!")

// Create the map object with a center and zoom level.
// let map = L.map("mapid").setView([30,30], 2);

// Alternative version:
// let map = L.map("mapid", {
//  center:  [40.7, -94.5], zoom: 4
// })

// Create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// Create the dark and light view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object, with the default layer.
let map = L.map("mapid", {
    center: [44, -80],
    zoom: 2,
    layers: [light]
})

// Pass our map layers into our layers control and add them to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);

// Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// circle1 = L.circle([34.0522, -118.2437], {radius: 300}).addTo(map);

// circle1.setStyle({fillColor: "lightyellow", color:"black"})

// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: "black",
//     fillColor: "lightyellow"
// }).addTo(map);


// An array containing each city's location, state, and population.
// Get data from cities.js
// let cityData = cities;

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city),
//     L.circleMarker(city.location, {
//         radius: city.population/100000,
//         color: "orange"
//     })
//     .bindPopup(`<h2>${city.city}, ${city.state}</h2> <hr> <h3> Population: ${city.population.toLocaleString()}</h3>`)
//     .addTo(map);
// });

// Coordinates for each point to be used in the line.
// let line = [
//     [33.9416, -118.4085],
//     [37.6214, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];

// Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "lightblue",
//     weight: 4,
//     dashArray: "10, 10",
//     dashOffset: "0"
// }).addTo(map);

// Add GeoJSON data. 

// let sanFranAirport = {
//     "type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"14",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Add GeoJSON layer to our map.
// L.geoJSON(sanFranAirport).addTo(map);

// The pointToLayer Function 
// L.geoJSON(sanFranAirport, {
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup(`<h2>${feature.properties.name}</h2><hr><h3>${feature.properties.city}, ${feature.properties.country}</h3>`);
//     }}).addTo(map);

// The onEachFeature Function

// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup(`<h2>Airport code: ${feature.properties.faa}</h2><hr><h3>Airport name: ${feature.properties.name}</h3>`);
//     }
// }).addTo(map);

// Access the toronto airport data
let torontoData = "https://raw.githubusercontent.com/rrantxa/Mapping_Earthquakes/main/torontoRoutes.json"

// Create a style for the lines.
let myStyle = {
    color: "lightyellow",
    weight: 2
};
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the data.
    // L.geoJSON(data, {onEachFeature: function(feature, layer){
    //     layer.bindPopup(`<h3>Airport code: ${feature.properties.faa}</h3><hr><h3>Airport name: ${feature.properties.name}</h3>`)
    //  }}).addTo(map);
    L.geoJSON(data, {style: myStyle,
        onEachFeature: function(feature, layer){
        layer.bindPopup(`<h3>Airline: ${feature.properties.airline}</h3><hr><h3>Destination: ${feature.properties.dst}</h3>`)
        }}).addTo(map);
});