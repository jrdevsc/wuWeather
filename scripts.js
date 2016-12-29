// hosted at https://jrdevsc.github.io/wuWeather



var key = "5f0f96c76a3e03cf";
var url = "https://api.wunderground.com/api/" +key;

$.ajax({
  url: url +"/geolookup/q/autoip.json",
  success: function(data){
    var location = data.location.requesturl;
    $.getJSON({
      url: "https://api.wunderground.com/api/5f0f96c76a3e03cf/conditions/q/"+location+".json",
      dataType: "jsonp",
      success: function(lweather){
        console.log(lweather);
        var simpleCall = lweather.current_observation;
        var icon = simpleCall.icon_url;

        //append city
        $('#city').append("<h1>"+simpleCall.display_location.city+"</h1>");

        //append temp
        $('#temp').append("<h2>Temp:</h2><h3>"+simpleCall.temp_f+"</h3>");

        //append current weather conditions
        $('#cWeather').append("<h2>Currently:</h2><h3>"+simpleCall.weather+"</h3> <img src="+icon+" />");

        //append wind
        $('#wind').append("<h2>Wind Conditions:</h2><p>"+simpleCall.wind_string+"<br> Direction: "+simpleCall.wind_dir+"<br> Wind Chill: "+simpleCall.windchill_f+"</p>");
      }
    });
  }
});
