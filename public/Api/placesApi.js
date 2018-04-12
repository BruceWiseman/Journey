var geocoder;
var map;
var service;

// function to initialize the map, when loaded it is centered on aberdeeen

function initMap() {
  //https://developers.google.com/maps/documentation/geocoding/intro
  geocoder = new google.maps.Geocoder();

  //Creates a placesservice for a "nearby search request" https://developers.google.com/maps/documentation/javascript/places#place_search_requests
  service = new google.maps.places.PlacesService(document.getElementById('map'));
  var scotland = {lat: 57.490605, lng: -4.199545};
  // creates new map object
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7.5,
    center: scotland,
    disableDefaultUI: true
    });
}


// function which takes the value of the textbox as a search value
//and atempts to find and display the location on the map

function codeAddress() {

  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status)  {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);

      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      map.setZoom(15);
    }
    else
    {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

//a function to allow the user to press enter
//when the textbox in the search div is selected to submit their serach
function checkSubmit(){
  console.log("Hello");
  document.getElementById('searchB').onkeyup = function(event){
    var e = event || window.event;
    if(e.keyCode == 13){
      codeAddress();
    }
  }



  function searchCategory(){

  }
}
