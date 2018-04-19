// var geocoder;
// var map;
// var service;
// var scotland;
// var aberdeen;
//
// // function to initialize the map, when loaded it is centered on aberdeeen
//
// function initMap() {
//
//   //https://developers.google.com/maps/documentation/geocoding/intro
//   geocoder = new google.maps.Geocoder();
//
//   //Creates a placesservice for a "nearby search request" https://developers.google.com/maps/documentation/javascript/places#place_search_requests
//
//   //var scotland = {lat: 57.490605, lng: -4.199545};
//   aberdeen = new google.maps.LatLng(57.1497, -2.0943);
//   scotland = new google.maps.LatLng(57.490605, -4.199545);
//   // creates new map object
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 7.5,
//     center: scotland,
//     disableDefaultUI: true
//     });
//
//   service = new google.maps.places.PlacesService(map);
//   $('#categorySearch').click(function(){searchCategory()});
// }
//
//
// // function which takes the value of the textbox as a search value
// //and atempts to find and display the location on the map
//
// function codeAddress() {
//   console.log("codeAddress");
//   var address = document.getElementById('placeSearch').value;
//   console.log("address:" + address);
//   geocoder.geocode( { 'address': address}, function(results, status)  {
//     console.log("geocoder");
//     if (status == 'OK') {
//       console.log("status" + status);
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
//   document.getElementById('placeSearch').onkeydown = function(event){
//     var e = event || window.event;
//     if(e.keyCode == 13){
//       console.log(e.keyCode);
//       codeAddress();
//     }
//   }
// }
//
// function searchCategory(){
//   console.log("hello" + scotland);
//   //Request uses user entered data to find location
//   var e = document.getElementById('categorySelect');
//   var value = e.options[e.selectedIndex].value;
//   var radius = document.getElementById('quantity').value;
//   console.log(value + " " + radius);
//
//   var request = {location:aberdeen, radius: radius, type: value};
//
//   console.log("Before callback");
//   service.nearbySearch(request, callback);
// }
//
//   function callback(results, status){
//     console.log(status);
//     if(status == google.maps.places.PlacesServiceStatus.OK){
//       console.log("if");
//       for(var i = 0; i < results.length; i++){
//         console.log("for");
//         var places = results[i];
//         console.log(places);
//         for(var i = 0; place=places[i]; i++){
//           var marker = new google.maps.Marker({
//             map:map,
//             position:place.geometry.location
//           });
//         }
//
//       }
//     }
//   }


  //======================new api===============================================

  //define required variables
  var geocoder;
  var map;
  var service;
  var infowindow;
  var aberdeen;

    //initialize map on aberdeen
  function initialize() {

    geocoder = new google.maps.Geocoder();
    aberdeen = new google.maps.LatLng(57.1497,-2.0942);

    map = new google.maps.Map(document.getElementById('map'), {
        center: aberdeen,
        zoom: 13,
        disableDefaultUI: true
      });
  };

  //search for places based on category
  function categorySearch() {
    //check if all required search parameters are valid, if not return
    if(document.getElementById("categorySelect").value == "0" || document.getElementById("quantity").value < 1){return};

    //reset map to remove markers
    initialize();

    //get the places div (result output)
    var div = document.getElementById('places');

    //remove any outputs in the results div
    while(div.firstChild){
      div.removeChild(div.firstChild);
    };

    //generate the search request
    var request = {
      location: aberdeen,
      radius: [document.getElementById("quantity").value * 1000] ,
      type: [document.getElementById("categorySelect").value]
    };

    //run the nearby search and generate an array of results
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }


  //callback method to create a marker for each result
  function callback(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        //create a marker for the current index place object
        createMarker(results[i]);
      }
    }
  }

  //create a marker, place it on a map and generate a place result to be displayed in the results div
  function createMarker(place) {

      //select the places div
      var placesList = document.getElementById('places');
      //get the geometry location of the input place
      var placeLoc = place.geometry.location;

      //generate an icon image for the place
      var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

      //crete a new marker
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        position: place.geometry.location
      });

      //listener to zoom on the marker when clicked on
      marker.addListener('click', function() {
        map.setZoom(18);
        map.setCenter(marker.getPosition());
      });

      //generate place result info div
      var div = document.createElement('div');
      div.setAttribute("id","resultDiv");

      var h3 = document.createElement("h3");
      h3.setAttribute("id","resultHead");

      var p = document.createElement("p");
      p.setAttribute("id","resultPara");

      var button = document.createElement('a');
      var buttonText = document.createTextNode("Add to Favourites");
      button.setAttribute('href', "http://google.com");
      button.setAttribute('id', "addFav");
      button.appendChild(buttonText);

      h3.textContent = place.name;
      p.textContent = "Address: "+place.vicinity;

      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(button);

      //add info div into the result list
      placesList.appendChild(div);
  };




  function codeAddress() {

    initialoze();

    var address = document.getElementById('placeSearch').value;
    geocoder.geocode( { 'address': address}, function(results, status)  {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);

        var image = {
              url: results[0].icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            position: results[0].geometry.location
        });

        //generate place result info div
        var div = document.createElement('div');
        div.setAttribute("id","resultDiv");

        var h3 = document.createElement("h3");
        h3.setAttribute("id","resultHead");

        var p = document.createElement("p");
        p.setAttribute("id","resultPara");

        var button = document.createElement('a');
        var buttonText = document.createTextNode("Add to Favourites");
        button.setAttribute('href', "http://google.com");
        button.setAttribute('id', "addFav");
        button.appendChild(buttonText);

        h3.textContent = results[0].name;
        p.textContent = "Address: "+results[0].vicinity;

        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(button);

        //add info div into the result list
        placesList.appendChild(div);

        map.setZoom(15);
      }

    });
  }
