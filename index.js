var map, heatmap, crashData;

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
			getData();
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

//gets the data from the json file
function getData(){
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
	var wellington = new google.maps.LatLng(-41.28646, 174.776236);

	var myOptions = {
		zoom: 6,
		center: { lat: 37.775, lng: -122.434 },
		disableDefaultUI: true,
		minZoom: 5
	};

	map = new google.maps.Map(document.querySelector('#map'), myOptions);

	heatmap = new google.maps.visualization.HeatmapLayer({
		data: getPoints(),
		map: map
	});
}

//adds lat and long of crashes to array
function getPoints() {
	var crashPoints = [];
	for (var i = 0; i < crashData.length; i++) {
		crashPoints.push(new google.maps.LatLng(crashData[i].lat, crashData[i].long));
	}
	return crashPoints;
}
