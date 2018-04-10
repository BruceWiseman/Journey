var geocoder;
var map;

// function to initialize the map, when loaded it is centered on aberdeeen

function initMap() {
  //https://developers.google.com/maps/documentation/geocoding/intro
  geocoder = new google.maps.Geocoder();
  var scotland = {lat: 57.490605, lng: -4.199545};
  // creates new map object
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7.5,
    center: scotland,
    disableDefaultUI: true
    });
}

//a function to allow the user to press enter
//when the textbox in the search div is selected to submit their serach
function checkSubmit(){
  document.getElementById('address').onkeydown = function(event){
    var e = event || window.event;
    if(e.keyCode == 13){
      codeAddress();
    }
  }
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
<<<<<<< HEAD
=======

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
}
>>>>>>> 2a03ea0be9777c11885739059af28411645153d1
