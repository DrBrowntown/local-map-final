//###########View###########//
//Global variables
let map;
var initialLocations;
var google;
var styles;
//Map initilization function

var initMap = function() {   
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.66728, lng: -73.973701},
    zoom: 16,
    styles: styles,
    mapTypeControl: false
  });

  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();    

//Runs bounce animation, wiki api, and infowindow population  
  var clickInfoWindow = function() {
      markerBounce(this, marker);
      populateInfoWindow(this, largeInfoWindow);      
    };
// The following group uses the location array (locations.js) to create an array of markers on initialize.
  for (var i = 0; i < initialLocations.length; i++) {  
    //get position from location array
    var position = initialLocations[i].coordinates;
    var address = initialLocations[i].address;
    var title = initialLocations[i].name;

    // Create a marker per location, and put into markers array.
    var image = {
        url: 'img/flag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        scaledSize: new google.maps.Size(40, 64),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      position: position,
      title: title,
      address: address,
      animation: google.maps.Animation.DROP,        
    });
    // Push the marker to our array of markers.
    initialLocations[i].marker = marker;  
    //extends boundries of the map for each marker
    bounds.extend(marker.position); 
     // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', clickInfoWindow);    
  }  
  
  //###########Populates info window
  var populateInfoWindow = function(marker, infowindow) {
            
      //Error handling for if something breaks in the wiki API
      var wikiRequestTimeout = setTimeout(function() {
          alert("Failed to get Wikipedia resources.");
      }, 8000);

      if (infowindow.marker != marker) {
          infowindow.marker = marker;
           //Uses Wikipedia API to search for articles relevant to the location name and places them in the infowindow.
          var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json';
          console.log(wikiUrl);
          $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            //jsonp: "callback"
            success: function( response ) {
                console.log( response );              
                
                var articleList = response[1];
                for (var i = 0; i < articleList.length; i++) {
                    var articleStr = articleList[i];
                    var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                    console.log(url);
                    infowindow.setContent('<div>' + marker.title +
              '<p>' + marker.address + '<p>' + '<a href="' + url + '">' + 'Wikipedia Article' + '</a>' + '</div>');              
                }
                clearTimeout(wikiRequestTimeout);            
            }
          });
          
          infowindow.open(map, marker);         
         
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
      }
  };
  /////Creates bounce animation on marker when location is clicked
  var markerBounce = function(marker) {
      if (marker.getAnimation() === null) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
              marker.setAnimation(null);
          }, 2100);
      } else {
          marker.setAnimation(google.maps.Animation.NULL);
      }
  };
  ko.applyBindings(new ViewModel());
};  

//Error message if Google Maps is uanble to load  
window.mapError = function( errorMsg, url, lineNumber ) {
    alert( 'Google Maps Failed To Load' );
};