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
        zoom: 15,
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

      var div = document.getElementById("searchResults");
      div.style.display = "block";

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
        map.setZoom(17);
        map.setCenter(marker.getPosition());
      });

      //display info bubble on marker click
      var infowindow = new google.maps.InfoWindow();

      google.maps.event.addListener(marker,'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              place.vicinity + '</div>');
              infowindow.open(map, this);
            });
      //generate result info
      createCategoryInfo(place,placesList);
  };



//search for a user defined place
  function codeAddress() {

    initialize();

    //get the places div (result output)
    var div = document.getElementById('places');

    //remove any outputs in the results div
    while(div.firstChild){
      div.removeChild(div.firstChild);
    };

    var div2 = document.getElementById("searchResults");
    div2.style.display = "block";

    var address = document.getElementById('placeSearch').value;
    geocoder.geocode( { 'address': address}, function(results, status)  {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });

        //listener to zoom on the marker when clicked on
        marker.addListener('click', function() {
          map.setZoom(18);
          map.setCenter(marker.getPosition());
        });

        map.setZoom(15);
        createPlaceInfo(results[0],div);
      }
    });

  }


//create info div (category)
  function createCategoryInfo(place,placesList){
    //generate place result info div
    var div = document.createElement('form');
    div.setAttribute("id","resultDiv");
    div.method = "POST";
    div.action = "/addfavourite";
    //name
    var h3 = document.createElement("input");
    h3.setAttribute("id","resultHead");
    h3.setAttribute("readonly","true");
    h3.name = "resultHead";
    //address
    var p = document.createElement("input");
    p.setAttribute("id","resultPara");
    p.setAttribute("readonly","true");
    p.name = "resultPara";
    //go to on map
    var buttonMap = document.createElement('button');
    var buttonText = document.createTextNode("Show on Map");
    buttonMap.setAttribute('id', "addFav");
    buttonMap.appendChild(buttonText);

    //add to favourites
    var buttonFav = document.createElement('button');
    var buttonText = document.createTextNode("Add to Favourites");
    buttonFav.setAttribute('type', "submit");
    buttonFav.setAttribute('id', "addFav");
    buttonFav.appendChild(buttonText);

    h3.value = place.name;
    p.value = place.vicinity;

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(buttonMap);
    div.appendChild(buttonFav);

    //add info div into the result list
    placesList.appendChild(div);
  }

  //create info div (place)
    function createPlaceInfo(place,placesList){
      //generate place result info div
      var div = document.createElement('form');
      div.setAttribute("id","resultDiv");
      div.method = "POST";
      div.action = "/addfavourite";
      //name
      var h3 = document.createElement("input");
      h3.setAttribute("id","resultHead");
      h3.setAttribute("readonly","true");
      h3.name = "resultHead";
      //address
      var p = document.createElement("input");
      p.setAttribute("id","resultPara");
      p.setAttribute("readonly","true");
      p.name = "resultPara";
      //go to on map
      var buttonMap = document.createElement('button');
      var buttonText = document.createTextNode("Show on Map");
      buttonMap.setAttribute('id', "addFav");
      buttonMap.appendChild(buttonText);

      //add to favourites
      var buttonFav = document.createElement('button');
      var buttonText = document.createTextNode("Add to Favourites");
      buttonFav.setAttribute('type', "submit");
      buttonFav.setAttribute('id', "addFav");
      buttonFav.appendChild(buttonText);

      h3.value = place.address_components[0].long_name;
      p.value = place.formatted_address;

      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(buttonMap);
      div.appendChild(buttonFav);

      //add info div into the result list
      placesList.appendChild(div);
    }
