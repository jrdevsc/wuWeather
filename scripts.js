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
      }
    });
  }
});
