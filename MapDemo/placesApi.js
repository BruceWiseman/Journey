var geocoder;
var map;

// function to initialize the map, when loaded it is centered on aberdeeen

function initMap() {
  geocoder = new google.maps.Geocoder();
  var aberdeen = {lat: 57.1497, lng: -2.0943};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: aberdeen
    }
  );
/*
//add market on map
  var marker = new google.maps.Marker({
  position: aberdeen,
  map: map
});
*/
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
  document.getElementById('address').onkeydown = function(event){
    var e = event || window.event;
    if(e.keyCode == 13){
      codeAddress();
    }
  }
}
