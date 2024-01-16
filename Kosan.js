let map = L.map('map')

let GSP = L.latLng(-7.770303388979041, 110.37785432960685)
let teknik = L.latLng(-7.765336663651454, 110.37230831779823)
let mandala = L.latLng(-7.759538682223425, 110.38562981752868)

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

const viewJakarta = [-6.168748062432924, 106.82589636362823]
map.setView(viewJakarta, 10)

// let control = L.Routing.control({
//   waypoints: [
//     GSP, mandala, teknik
//   ],
//   routeWhileDragging: true,
//   geocoder: L.Control.Geocoder.nominatim()
// }).addTo(map);

// console.log(control, 'hehe');

// control.on('routesfound', function (e) {
//   var routes = e.routes;
//   // Do something with the routes, e.g., display information
//   console.log(routes);
//   console.log(routes[0].summary["totalDistance"]);
// });

// // Event listener for when an error occurs during routing
// control.on('routingerror', function (e) {
//   var message = e.error.message;
//   // Handle the routing error
//   console.error('Routing Error:', message);
// });

let sidebar = document.querySelector('.sidebarContainer')
let coba = document.querySelector('.coba')
let mapContainer = map.getContainer();





let marker;
let lngLat = [] 
let input = document.getElementById('inputUser')
let bufferLayer

coba.addEventListener('change', (e) => {
  mapContainer.style.cursor = e.target.checked ? "pointer" : "auto";

  if (e.target.checked) {
    map.on('click', function (event) {
      if (marker) {
        map.removeLayer(marker);
      }
      marker = L.marker(event.latlng).addTo(map);
      lngLat = [event.latlng.lng, event.latlng.lat];
      console.log(lngLat, 'Marker clicked');

      updateBuffer();
    });
  } else {
    map.off('click');
    if (marker) {
      map.removeLayer(marker);
    }
    lngLat = [];
    if (bufferLayer) {
      map.removeLayer(bufferLayer);
    }
  }
});

function updateBuffer() {
  if (lngLat.length > 0) {
    const bufferDistanceKm = parseFloat(input.value);

    if (!isNaN(bufferDistanceKm)) {
      const buffer = turf.buffer(turf.point(lngLat), bufferDistanceKm, { units: 'kilometers' });

      if (bufferLayer) {
        map.removeLayer(bufferLayer);
      }

      bufferLayer = L.geoJSON(buffer).addTo(map);
    } else {
      console.log('Invalid buffer distance');
    }
  }
}

input.addEventListener('change', updateBuffer);


document.querySelector('.cobaa').addEventListener('click', () => {
  console.log('cl');
})


// document.querySelector('.sidebarContainer').addEventListener('mouseover', () => {
//   sidebar.style.cssText = `
//   clip: rect(0px, 100vw, 100vh, 0px);
//   transition: 0.5s`
// })

// document.querySelector('.sidebarContainer').addEventListener('mouseout', () => {
//   sidebar.style.cssText = `
//   clip: rect(0px, 100px, 100vh, 0px);
//   // background: red;
//   transition: 0.5s;`
// })



// setTimeout(() => {
//   sidebar.style.cssText = `
//   // margin: 16%;
//   // padding: 10rem;
//   // border-radius: 10px;
//   clip: rect(0px, 100px, 100vh, 0px);
//   // background: red;
//   transition: 0.5s; `
// }, 1000)

var point = turf.point([106.82589636362823, -6.168748062432924]);
var point2 = turf.point([106.82589636362823, -6.268748062432929]);

var pointsCollection = turf.featureCollection([point, point2]);

L.geoJSON(pointsCollection).addTo(map);
// L.geoJSON(point).addTo(map)
// var point = L.marker([-6.168748062432924, 106.82589636362823]).addTo(map)
var buffered = turf.buffer(point, 500, { units: 'meters' });


const tru = turf.booleanIntersects(point2, buffered);
console.log(tru);

// var marker;

// map.on('click', function(e) {
//     if (marker) {
//         map.removeLayer(marker);
//     }
//     marker = L.marker(e.latlng).addTo(map);
// });

// var point2 = turf.point([-75.343, 39.984]);


// let currentLayer = L.tileLayer.wms('http://localhost:8080/geoserver/BVT/wms', {
//   service: `WMS`,
//   request: `GetMap`,
//   layers: `BVT:bua2021revised`,
//   format: `image/png`,
//   styles: `BVT:bua2021revised`,
//   transparent: true
// }).addTo(map)

// let otherLayer = L.tileLayer.wms('http://localhost:8080/geoserver/BVT/wms', {
//   service: `WMS`,
//   request: `GetMap`,
//   layers: `BVT:bua2022revised`,
//   format: `image/png`,
//   styles: `BVT:bua2022revised`,
//   transparent: true
// }).addTo(map)

// let hehe = () => {
//   map.removeLayer(otherLayer)
// }

// document.querySelector('.coba').addEventListener('click', hehe)


// let getFeatureInfo = async (e) => {
//   var point = map.latLngToContainerPoint(e.latlng)
//   // let point = map.latLngToContainerPoint(e.latlng)
//   // console.log(point, 'huhu')
//   const baseUrl = 'http://localhost:8080/geoserver/BVT/wms'
//   // console.log(coba);
//   params = {
//     request: `GetFeatureInfo`,
//     service: `WMS`,
//     srs: `EPSG:4326`,
//     format: `application/json`,
//     bbox: map.getBounds().toBBoxString(),
//     height: map.getSize().y,
//     width: map.getSize().x,
//     layers: `BVT:bua2021revised`,
//     query_layers: `BVT:bua2021revised`,
//     info_format: `application/json`
//   }

//   params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
//   params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

//   const url = baseUrl + L.Util.getParamString(params);

//   const response = await fetch(url);
//   const data = await response.json();

//   const featureInfo = data.features[0].properties["percent"];
//   const popupContent = `${featureInfo}`;

//   L.popup()
//     .setLatLng(e.latlng)
//     .setContent(popupContent)
//     .openOn(map);

// }

// map.on('click', (e) => {
//   getFeatureInfo(e);
// })