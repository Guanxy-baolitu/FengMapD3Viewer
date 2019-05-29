var strFloor = "floor";
var strColor = "color";
var div;
var projection;
var notinited = true;
var init = function () {
  div = document.getElementById('mapContainer');
  window.selectFloorOnChange = function(floor){
    refreshTheMap(floor.value);
  };
  refreshTheMap(1);
  console.log(floorIndices);
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showUserPosition, function (e) {
      console.log(e.code);
    });
  }
  notinited = false;
}
var refreshTheMap = function (floorIdx) {
  currentFloor = Number(floorIdx);
  var width = div.clientWidth;
  var height = div.clientHeight;
  projection = d3.geoMercator()
    .center([116.356666, 39.7592])
    .scale(10000000)
    .translate([width / 2, height / 2]);
  var path = d3.geoPath()
    .projection(projection);
  var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
  svg.selectAll("path").remove();
  d3.json("doc/geoJsonPKU.json", function (error, json) {
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("visibility", function (d) {
        var floorIdx =Number(d.properties.floor);
        var contained = false;
        floorIndices.forEach(function(idx)
        {if(idx == floorIdx)contained =true;})
        if(contained===false) {
          var floorSelectDom = document.getElementById("floorSelect");
          floorSelectDom.options.add(new Option(d.properties.floor,floorIdx));
        }floorIndices.push(floorIdx);
        console.log(typeof currentFloor);
        console.log(currentFloor);
        console.log(typeof floorIdx);
        console.log(floorIdx);
        return floorIdx === currentFloor? "visible" : "hidden";
      })
  });
};
function showUserPosition(position) {
  var geoPoint = [];
  geoPoint.push(position.coords.longitude);
  geoPoint.push(position.coords.latitude);
  console.log(geoPoint + "" + projection(geoPoint));
  d3.select("#userPoint")
    .style("left", "" + projection(geoPoint)[0] + "px")
    .style("top", "" + projection(geoPoint)[1] + "px")
}