// start slingin' some d3 here.
d3.select('svg').selectAll('circle').data(d3.range(15))
  .enter().append("circle")
  .attr("class", "enemy")
  .attr("cx", function(){ return Math.random()*700})
  .attr("cy", function(){ return Math.random()*450})
  .attr("color", "black")
  .attr("r", 10);




// data(data, function(d){return d;d3.range(10));
