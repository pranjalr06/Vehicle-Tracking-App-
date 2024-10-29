let map;
let vehicleMarker;
let routePolyline;
let vehiclePath = [];

// Initialize and add the map
function initMap() {
  const mapOptions = {
    center: { lat: 17.385044, lng: 78.486671 },
    zoom: 14
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Create a marker to represent the vehicle
  vehicleMarker = new google.maps.Marker({
    map: map,
    icon: {
      url: "https://maps.google.com/mapfiles/kml/shapes/cabs.png", // Vehicle icon
      scaledSize: new google.maps.Size(40, 40)
    }
  });

  // Create a polyline to display the vehicle's route
  routePolyline = new google.maps.Polyline({
    path: vehiclePath,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map
  });

  // Fetch the initial vehicle location and update every 5 seconds
  updateVehicleLocation();
  setInterval(updateVehicleLocation, 5000);
}

// Fetch the vehicle's current location and route from the backend
async function updateVehicleLocation() {
  try {
    const response = await fetch('http://localhost:5000/api/location');
    const data = await response.json();

    const { currentLocation, route } = data;
    const { latitude, longitude } = currentLocation;

    // Update the vehicle's marker position
    const vehicleLatLng = new google.maps.LatLng(latitude, longitude);
    vehicleMarker.setPosition(vehicleLatLng);

    // Update the map center to follow the vehicle
    map.setCenter(vehicleLatLng);

    // Update the route
    vehiclePath = route.map(point => ({ lat: point.latitude, lng: point.longitude }));
    routePolyline.setPath(vehiclePath);

  } catch (error) {
    console.error('Error fetching vehicle location:', error);
  }
}

// Initialize the map when the window loads
window.onload = initMap;