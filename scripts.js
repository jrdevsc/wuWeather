// hosted at https://jrdevsc.github.io/wuWeather
//exposed key, i know, but its a smiple weather app...
var key = "5f0f96c76a3e03cf";

//find locaion of user, if navigator isn't available, stop.
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(function(pos){

    //put lat and long in to vars, use them in a function.
    var myLat = pos.coords.latitude;
    var myLong = pos.coords.longitude;
    getWeather(myLat, myLong);
  })
}else{
  console.log("Sorry, we can't look up your location at this time!")
}

//use coords from geolocation to look up city info.
//quite possibly where the magic happens.
function getWeather(myLat, myLong){
  var lookupUrl = `http://api.wunderground.com/api/${key}/geolookup/q/${myLat},${myLong}.json`;
  axios.get(lookupUrl)
  .then(function(data){
    var conditionUrl =`http://api.wunderground.com/api/${key}/conditions/q/${data.data.location.requesturl}.json`;
    axios.get(conditionUrl)
    .then(function(data){
      console.log(data);
    })

  })
  .catch(function(error){
    console.log(error);
  })
}




// $.ajax({
//   url: url +"/geolookup/q/autoip.json",
//   success: function(data){
//     var location = data.location.requesturl;
//     $.getJSON({
//       url: "https://api.wunderground.com/api/5f0f96c76a3e03cf/conditions/q/"+location+".json",
//       dataType: "jsonp",
//       success: function(lweather){
//         var simpleCall = lweather.current_observation;
//         var icon = simpleCall.icon_url;
//
//         //get rid of hidden class on button, on response
//         $('#chk').removeClass('hidden');
//
//         //append city
//         $('#city').replaceWith("<h1>"+simpleCall.display_location.city+"</h1>");
//
//         //append temp
//         $('#temp').append("<h2>Temp:</h2><h3>"+simpleCall.temp_f+"</h3>");
//
//         //append current weather conditions
//         $('#cWeather').replaceWith("<h2>Currently:</h2><h3>"+simpleCall.weather+"</h3> <img src="+icon+" />");
//
//         //append wind
//         $('#wind').replaceWith("<h2>Wind Conditions:</h2><p>"+simpleCall.wind_string+"<br> Direction: "+simpleCall.wind_dir+"<br> Wind Chill: "+simpleCall.windchill_f+"</p>");
//
//         //convert temp on button click
//         $('#chk').click(function(){
//           var fTemp = parseInt(simpleCall.temp_f);
//           var cTemp = parseInt(simpleCall.temp_c);
//
//           if ($(this).text() == "Get Temp in F") {
//                   $('#temp').html("<h2>Temp:</h2><h3>"+fTemp+" F</h3>");
//                   $(this).text("Get Temp in C");
//                 }else if($(this).text() == "Get Temp in C"){
//                   $('#temp').html("<h2>Temp:</h2><h3>"+cTemp+" C</h3>");
//                   $(this).text("Get Temp in F");
//                 }else{
//                   $(this).text("Should never fire...");
//                 }
//         });
//       }
//     });
//   }
// });
