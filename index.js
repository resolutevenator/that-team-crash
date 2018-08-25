var map;

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
		url: 'https://maps.googleapis.com/maps/api/js?key=' + key,
		dataType: 'jsonp',
		type: 'GET',
		success: function(data) {
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
		disableDefaultUI: true
	};

	map = new google.maps.Map(document.querySelector('#map'), myOptions);
}
