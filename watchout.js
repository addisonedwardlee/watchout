/* global d3 */
//create the home space
var svg = d3.select("svg");

//add hero
svg.append("svg:image")
  .attr("xlink:href", "bear.png")
  .attr("class", "hero")
  .attr("width", 30)
  .attr("height", 60)
  .attr("x", 350)
  .attr("y", 225);

//add honey
svg.append("svg:image")
  .attr({
    "class": "honey",
    "xlink:href": "honey.png",
    "width": 40,
    "height": 60,
    "x": function(){ return 30 + Math.random()*640;},
    "y": function(){ return 30 + Math.random()*390;},
});

//add enemy
svg.selectAll(".enemy").data(d3.range(20))
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

//assign references to the things
var hero = d3.select(".hero");
var heroHeight = d3.select(".hero").attr("height");
var heroWidth = d3.select(".hero").attr("height");
var honey = d3.select(".honey");
var honeyWidth = honey.attr("width");
var honeyHeight = honey.attr("height");
var allEnemies = d3.selectAll(".enemy");
var currentScore = d3.select('#curScore');
var highScore = d3.select('#highScore');

//move hero function
svg.on("mousemove", function(){
  hero.attr("x", function(){
    var x = d3.mouse(this)[0] - 0.5 * heroWidth;
    if(x < (700- 0.5 * heroWidth) && x > 0){
      return x;
    } else if (x > (700 - 0.5 * heroWidth)) {
      return (700 - 0.5 * heroWidth);
    } else {
      return 0;
    }
  }).attr("y", function(){
    var y = d3.mouse(this)[1]- 0.5 * heroHeight;
    if(y < (450 - 0.5 * heroHeight) && y > 0){
      return y;
    } else if (y > (450 - 0.5 * heroHeight)) {
      return (450 - 0.5 * heroHeight);
    } else {
      return 0;
    }
  });
});

var moveEnemy = function(){
  allEnemies
  .transition()
  .attr("x", function(){ return Math.random()*700;})
  .attr("y", function(){ return Math.random()*450;})
  .duration(2000);

  setTimeout(moveEnemy, 2000);
};

var collisionDetected = function(){
  var heroX = hero.attr("x");
  var heroY = hero.attr("y");
  var allEnemy = allEnemies[0];
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
  var heroX = hero.attr("x") - 0.5 * heroWidth;
  var heroY = hero.attr("y") - 0.5 * heroHeight;
  var honeyX = honey.attr("x") - 0.5 * honeyWidth;
  var honeyY = honey.attr("y") - 0.5 * honeyHeight;
  if(Math.abs(honeyX - heroX) < 20 && Math.abs(honeyY - heroY) < 20){
    return true;
  }
  return false;
};

// var growBear = function(){
//   heroWidth = heroWidth * 1.04;
//   heroHeight = heroHeight * 1.1;

//   hero.attr("width", heroWidth)
//   .attr("height", heroHeight);
// };

var collisionCheck = function(){
  var currentScoreNum = parseInt(currentScore.text());
  var highScoreNum = parseInt(highScore.text());
  if(collisionDetected()){
    if(currentScoreNum > highScoreNum) {
      parseInt(highScore.text(currentScoreNum));
    }
    currentScore.text("0");
    d3.select(".playField").classed({
      "collided": true,
      "safe": false
    });
    setTimeout(function(){
      d3.select(".playField").classed({
        "collided": false,
        "safe": true
      });
    }, 100);
  }else{
    currentScore.text(currentScoreNum+1);
  }
  if(honeyDetected()){
    currentScore.text(currentScoreNum+125);
    honey.attr({
      "x": function(){ return 15 + Math.random()*620;},
      "y": function(){ return 15 + Math.random()*360;}
    });
    // growBear();
  }
  setTimeout(collisionCheck, 20);
};

moveEnemy();
collisionCheck();
