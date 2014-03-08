/* global d3 */

d3.select("svg").append("svg:image")
  .attr("xlink:href", "bear.png")
  .attr("class", "hero")
  .attr("width", 30)
  .attr("height", 50)
  .attr("x", 350)
  .attr("y", 225);

d3.select("svg").append("svg:image")
  .attr({
    "class": "honey",
    "xlink:href": "honey.png",
    "width": 40,
    "height": 60,
    "x": function(){ return Math.random()*700;},
    "y": function(){ return Math.random()*450;},
});

d3.select("svg").selectAll(".enemy").data(d3.range(20))
  .enter()
  .append("svg:image")
  .attr("class", "enemy")
  .attr({
    "xlink:href": "bee2.png",
    "width": 20,
    "height": 30,
    "x": function(){ return Math.random()*700;},
    "y": function(){ return Math.random()*450;},
});

//move hero function
d3.select("svg").on("mousemove", function(){
  d3.select(".hero").attr("x", function(){
    var x = d3.mouse(this)[0];
    if(x < 670 && x > 30){
      return x;
    } else if (x > 670) {
      return 670;
    } else {
      return 30;
    }
  }).attr("y", function(){
    var y = d3.mouse(this)[1];
    if(y < 420 && y > 30){
      return y;
    } else if (y > 420) {
      return 420;
    } else {
      return 30;
    }
  });
});

var moveEnemy = function(){
  d3.selectAll(".enemy")
  .transition()
  .attr("x", function(){ return Math.random()*700;})
  .attr("y", function(){ return Math.random()*450;})
  .duration(2000);

  setTimeout(moveEnemy, 2000);
};

var collisionDetected = function(){
  var heroX = d3.select('.hero').attr("x");
  var heroY = d3.select('.hero').attr("y");
  var allEnemy = d3.selectAll('.enemy')[0];
  for(var i = 0; i < allEnemy.length; i++){
    var enemyX = allEnemy[i].x.baseVal.value;
    var enemyY = allEnemy[i].y.baseVal.value;
    if(Math.abs(enemyX - heroX) < 20 && Math.abs(enemyY - heroY) < 20){
      return true;
    }
  }
  return false;
};

var honeyDetected = function(){
  var heroX = d3.select('.hero').attr("x");
  var heroY = d3.select('.hero').attr("y");
  var honeyX = d3.select('.honey').attr("x");
  var honeyY = d3.select('.honey').attr("y");
  if(Math.abs(honeyX - heroX) < 20 && Math.abs(honeyY - heroY) < 20){
    return true;
  }
  return false;
};

var collisionCheck = function(){
  var curScore = parseInt(d3.select('#curScore').text());
  var highScore = parseInt(d3.select('#highScore').text());
  if(collisionDetected()){
    if(curScore > highScore) {
      parseInt(d3.select('#highScore').text(curScore));
    }
    d3.select('#curScore').text("0");
  }else{
    d3.select('#curScore').text(curScore+1);
  }
  if(honeyDetected()){
    d3.select('#curScore').text(curScore+100);
    d3.select('.honey').attr({
      "x": function(){ return Math.random()*700;},
      "y": function(){ return Math.random()*450;}
    });
  }
  setTimeout(collisionCheck, 500);
};

moveEnemy();
collisionCheck();
