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
  var lookupUrl = `https://api.wunderground.com/api/${key}/geolookup/q/${myLat},${myLong}.json`;
  axios.get(lookupUrl)
  .then(function(data){
    var conditionUrl =`https://api.wunderground.com/api/${key}/conditions/q/${data.data.location.requesturl}.json`;
    axios.get(conditionUrl)
    .then(function(data){
      var currentCond = data.data.current_observation;
      // console.log(currentCond);
      showWeather(currentCond);
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

//manipulate the DOM with jquery.
function showWeather(currentCond){
  // console.log(currentCond)
  let myCity = currentCond.display_location.full;
  let myTemp = currentCond.temp_f;
  let myWeather = currentCond.weather;
  let myWindCond = currentCond.wind_string;
  let myWindDir = currentCond.wind_dir;
  let myWindChill = currentCond.windchill_string;

  //unhide err thang
    $('#chk').removeClass('hidden');

  //update city
  $('#city').replaceWith(`<h1>${myCity}</h1>`);

  //update temp
  $('#temp').append(`<h2>Temp:</h2><h3>${myTemp}</h3>`);

  //update weather
  $('#cWeather').replaceWith(`<h2>Currently:</h2><h3>${myWeather}</h3>`);

  //update wind
  $('#wind').replaceWith(`<h2>Wind Conditions:</h2><p>${myWindCond}<br> Direction: ${myWindDir}<br> Wind Chill: ${myWindChill}</p>`);

  //this makes the button work
  $('#chk').click(function(){
    var fTemp = parseInt(currentCond.temp_f);
    var cTemp = parseInt(currentCond.temp_c);
    if ($(this).text() == "Get Temp in F") {
            $('#temp').html(`<h2>Temp:</h2><h3>${fTemp} F</h3>`);
            $(this).text("Get Temp in C");
          }else if($(this).text() == "Get Temp in C"){
            $('#temp').html(`<h2>Temp:</h2><h3>${cTemp} C</h3>`);
            $(this).text("Get Temp in F");
          }else{
            $(this).text("Should never fire...");
          }
  });
}
