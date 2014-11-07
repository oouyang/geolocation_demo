// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

  // ---

  function start() {

    var message = document.getElementById('message');

    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    message.textContent = translate('message');

  }

});
     
function init() {
  if (navigator && navigator.geolocation) {
    // Update the current location once 
    navigator.geolocation.getCurrentPosition(function (position) {
      var here = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var map_options = {
        zoom: 16,
        center: here,
        // http://www.w3schools.com/googleAPI/ref_maptypeid.asp
        mapTypeId: google.maps.MapTypeId.SATELLITE
        // mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map_container = document.getElementById('map');
      var map = new google.maps.Map(map_container, map_options);
      
      var marker = new google.maps.Marker({
        position: here,
        map: map,
      });
      
      var cood_txt = "Lat: " + position.coords.latitude + ", Long: " + position.coords.longitude;
      document.getElementById("coordText").innerHTML = cood_txt;
      }   
    );
    } else {
      console.log('Geolocation is not supported');
    }
  }
    
  