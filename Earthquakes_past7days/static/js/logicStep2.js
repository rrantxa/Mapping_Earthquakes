// Add console.log to check if our code is working.
console.log("Hello world!")

// Create the dark and light view tile layer that will be an option for our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
};

// Create the map object, with the default layer.
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass our map layers into our layers control and add them to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the GeoJSON for earthquake data.
let weekData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grabbing our GeoJSON data.
d3.json(weekData).then(function(data) {
    // This function returns the style data for each of the earthquakes. 
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: "#ffae42",
            color: "#000000",
            radius: getRadius(),
            stroke: true,
            weight: 0.5
        };
    }
    // This function determines the radius of the earthquake based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }
    // Creating a GeoJSON layer with the data.
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        }, 
        // We set the style for each circleMarker.
        style: styleInfo
    }).addTo(map)
    // L.geoJSON(data, {style: myStyle,
    //     onEachFeature: function(feature, layer){
    //         layer.bindPopup(`<h3>Neighborhood: ${feature.properties.AREA_NAME}</h3>`)
    //             }}).addTo(map)
});