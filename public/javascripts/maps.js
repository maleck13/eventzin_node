var map;
var markersArray = [];
var marker;
var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
  });

function initialize(longi, lati) {
    
    var latlng = new google.maps.LatLng(lati, longi);
    var myOptions = {
      zoom: 13,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"),
        myOptions);
    addMarker(latlng,"");
    google.maps.event.addListener(map, 'click', function(event) {
	//call function to create marker
         
	marker = addMarker(event.latLng,"");
  });
  


  }
  
function addMarker(latLng, pinTitle){
  clearOverlays();
   var title =pinTitle;
  
   marker = new google.maps.Marker({
      position: latLng, 
      map: map, 
      animation: google.maps.Animation.DROP
  }); 
  if(title !=""){
   google.maps.event.addListener(marker,"click",function(){
    
       infowindow.setContent(title);
       infowindow.position = marker.position;
       infowindow.open(map,marker);
   });
   
     
  }
  
  
  
   $('input[name="latitude"]').val(latLng.lat());
   $('input[name="longitude"]').val(latLng.lng());
   markersArray.push(marker);
    return marker;
}


function clearOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }
}



$('document').ready(function(){

   var countySelect = $('select[name="county"]');
   console.log(countySelect);
   var coordsArr;
   if(countySelect.length > 0){
   coordsArr =  countySelect.val().split(",");
        countySelect.change(function(){
              console.log("changing coords to "+ $(this).val() );
            coordsArr = $(this).val().split(",");
            var longitude = coordsArr[1];
            var latitude = coordsArr[0];
             if(longitude != "" && latitude != ""){
             $('input[name="latitude"]').val(latitude);
             $('input[name="longitude"]').val(longitude);
             if($('#map').length > 0){
              initialize(longitude, latitude);
             }
         }

        });
         
         var longitude = coordsArr[1];
         var latitude = coordsArr[0];
         console.log(latitude.toString()+" - "+ longitude.toString());
         if(longitude != "" && latitude != ""){
             $('input[name="latitude"]').val(latitude);
             $('input[name="longitude"]').val(longitude);
             if($('#map').length > 0){
              initialize(longitude, latitude);
             }
         }
    }
   
});