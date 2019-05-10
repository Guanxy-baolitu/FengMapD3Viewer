window.onload=function(){
  var div = document.getElementById('mapContainer');
  var width = div.clientWidth;
  var height = div.clientHeight;
  var projection = d3.geoMercator()
    .center([116.356666,39.7592])
    .scale(10000000)
    .translate([width/2, height/2]);
  var path = d3.geoPath()
    .projection(projection);s
  var svg = d3.select("#mapContainer").append("svg")
    .attr("width", width)
    .attr("height", height)
  d3.json("doc/geoJsonPKU.json", function(error, json){
    if (error) console.log(error);
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "steelblue");
  });

  function showUserPosition(position)
  {
    var geoPoint = [];
    geoPoint.push(position.coords.longitude);
    geoPoint.push(position.coords.latitude);
    alert(geoPoint + "" + projection(geoPoint));
    d3.select("#userPoint")
      .style("left", ""+projection(geoPoint)[0]+"px")
      .style("top", ""+projection(geoPoint)[1]+"px")
  }
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showUserPosition, function(e)
    {
      alert(e.code);
    });
  }
}
