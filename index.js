// global var
var map, heatmap, crashData, geocoder;
// default center (akl centeral)
var center = [-36.8485, 174.7633];
// listening to user's input
document.querySelector('form').addEventListener('submit', recenter);

// Get google map's key from config.json
$.ajax({
	url: 'config.json',
	dataType: 'json',
	type: 'GET',
	success: function(data) {
		getMap(data[0].googleKey);
	},
	error: function(error) {
		console.log('Error');
		console.log(error);
	}
});

// Link in google maps api
function getMap(key) {
	$.ajax({
		url:
			'https://maps.googleapis.com/maps/api/js?key=' +
			key +
			'&libraries=visualization',
		dataType: 'jsonp',
		type: 'GET',
		success: function(data) {
			geocoder = new google.maps.Geocoder();
			getData();
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

//gets the data from the json file
function getData() {
	$.ajax({
		url: 'data.json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			crashData = data;
			initMap();
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

// init map (center wellington)
function initMap() {
	var myOptions = {
		zoom: 12,
		center:{ lat: center[0], lng: center[1] },
		disableDefaultUI: true,
		minZoom: 10
	};

	map = new google.maps.Map(document.querySelector('#map'), myOptions);

	heatmap = new google.maps.visualization.HeatmapLayer({
		data: getPoints(),
		map: map,
		radius: 20
	});
}

//adds lat and long of crashes to array
function getPoints() {
	var crashPoints = [];
	for (var i = 0; i < crashData.length; i++) {
		crashPoints.push({location: new google.maps.LatLng(crashData[i].latitude, crashData[i].longitude), weight: crashData[i].weight});

	}
	return crashPoints;
}

// reset position to user's input
function recenter(e) {
	e.preventDefault();
	var location = document.querySelector('#search').value;
	console.log(location);
	geocoder.geocode({ address: location + 'Auckland, New Zealand' }, function(
		results,
		status
	) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(15);
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
