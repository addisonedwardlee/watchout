/* global d3 */
var drag = d3.behavior.drag()
.on("drag", function(){
  d3.select(this)
  .attr("cx", function(){
    var x = d3.mouse(this)[0];
    if(x < 690 && x > 10){
      return x;
    } else if (x > 690) {
      return 690;
    } else {
      return 10;
    }
  }).attr("cy", function(){
    var y = d3.mouse(this)[1];
    if(y < 390 && y > 10){
      return y;
    } else if (y > 390) {
      return 390;
    } else {
      return 10;
    }
  });
});


d3.select("svg").append("circle")
  .attr("class", "hero")
  .attr("cx", 350)
  .attr("cy", 225)
  .attr("fill", "red")
  .attr("r", 10)
  .call(drag)
;




d3.select("svg").selectAll(".enemy").data(d3.range(20))
  .enter().append("circle")
  .attr("class", "enemy")
  .attr("cx", function(){ return Math.random()*700;})
  .attr("cy", function(){ return Math.random()*450;})
  .attr("fill", "black")
  .attr("r", 10);

var moveEnemy = function(){
  d3.selectAll(".enemy")
  .transition()
  .attr("cx", function(){ return Math.random()*700;})
  .attr("cy", function(){ return Math.random()*450;})
  .duration(2000);

  setTimeout(moveEnemy, 2000);
};

//moveEnemy();

var collisionDetected = function(){
  var heroX = d3.select('.hero').attr("cx");
  var heroY = d3.select('.hero').attr("cy");
  var allEnemy = d3.selectAll('.enemy')[0];
  for(var i = 0; i < allEnemy.length; i++){
    var enemyX = allEnemy[i].cx.baseVal.value;
    var enemyY = allEnemy[i].cy.baseVal.value;
    if(Math.abs(enemyX - heroX) < 20 && Math.abs(enemyY - heroY) < 20){
      return true;
    }
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
  setTimeout(collisionCheck, 500);
};

moveEnemy();
collisionCheck();
