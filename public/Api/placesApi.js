var geocoder;
var map;
var service;
var scotland;

// function to initialize the map, when loaded it is centered on aberdeeen

function initMap() {

  //https://developers.google.com/maps/documentation/geocoding/intro
  geocoder = new google.maps.Geocoder();

  //Creates a placesservice for a "nearby search request" https://developers.google.com/maps/documentation/javascript/places#place_search_requests

  //var scotland = {lat: 57.490605, lng: -4.199545};
  scotland = new google.maps.LatLng(57.490605, -4.199545);
  // creates new map object
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7.5,
    center: scotland,
    disableDefaultUI: true
    });

  service = new google.maps.places.PlacesService(map);
  $('#categorySearch').click(function(){searchCategory()});
}


// function which takes the value of the textbox as a search value
//and atempts to find and display the location on the map

// function codeAddress() {
//
//   var address = document.getElementById('address').value;
//   geocoder.geocode( { 'address': address}, function(results, status)  {
//     if (status == 'OK') {
//       map.setCenter(results[0].geometry.location);
//
//       var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//       });
//       map.setZoom(15);
//     }
//     else
//     {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }
//
// //a function to allow the user to press enter
// //when the textbox in the search div is selected to submit their serach
// function checkSubmit(){
//   console.log("Hello");
//   document.getElementById('searchB').onkeyup = function(event){
//     var e = event || window.event;
//     if(e.keyCode == 13){
//       codeAddress();
//     }
//   }



  function searchCategory(){
      //Request uses user entered data to find location
      var e = document.getElementById('categorySelect');
      var value = e.options[e.selectedIndex].value;
      var radius = document.getElementById('quantity').value;
      console.log(value + " " + radius);
      if(value!=0){
        var request = {
          location: scotland,
          radius: radius,
          type: [value]
        };

        service.nearbySearch(request, callback);
      };

    }

  function callback(results, status){
    //console.log(status);
    if(status == google.maps.places.PlacesServiceStatus.OK){
      for(var i = 0; i < results.length; i++){
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }
