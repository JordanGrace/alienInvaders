/*----------------------------------Things that can be Changed----------------------------------*/
//Changes The Speed of your Missle
var dy = 5;
//Changes the size of the Missle
var bulletSize = 3;
//Changes the Aliens Speed
var alienSpeed = 2;
//Changes the Aliens Width & Height (Height needs to be divisible by 5)
var alienWidth = 30;
var alienHeight = 25;
//Changes the Size of your ship
var paddleh = 30;
var paddlew = 50;
//Changes the Number of rows of aliens "Has to be Odd"
var nRows = 9;
//Changes the Number of Columns of aliens "Has to be Even"
var nCols = 20;
//Changes the Number of Barriers "Has to be Odd"
var nBarriers = 9;
//Changes the Amount of Lives you can have
var userLives = 3;
//Sets the Width of the canvas
var WIDTH = 960;
//Sets the Height of the canvas
var HEIGHT = 700;

/*----------------------------------Changes to the Variables below may break game----------------------------------*/
var canvas = document.createElement('canvas');
var aliensAlive = ((nRows + 1) * nCols)/4 ;
var x = 0;
var y = 0;
var ctx;
var shipx;
var intervalId = 0;
var nextLvl = 0;
var ALIENS;
var score = 0;
var alienMove = 0;
var alienDown = alienHeight*2;
var key = "none";
var startLevel = 1;
var textPosX = -200;
var cn = 4;
var rn = 4;
var eMy = 0;
var eMx = 0;
var firePause = false;
fireMissle = false;
moveObj = false;
eMfire = false;
var ctt = 0;
var playerBullets = [];
var enemyBullets = [];



function redraw(){}

function Bullet(I) {
	I.active = true;
	I.radius = 3;
	I.xVelocity = 0;
	I.yVelocity = -I.speed;
	I.color = "white";
	I.inBounds = function() {
		return I.x >= 0 && I.x <= WIDTH && I.y >= 0 && I.y <= HEIGHT;
	};
	I.draw = function() {
		if(I.active == true){
			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
			//rect(this.x, this.y,3,5);
			ctx.closePath();
			ctx.fill();}
		else{I.speed = 0;I.yVelocity = 0;}
	};
	I.update = function() {
		I.x += I.xVelocity;
		I.y += I.yVelocity;
		I.active = I.active && I.inBounds();
	};
   
  return I;
}

//Creating the player
var Player = {
	color: "white",
	x: shipx,
	y: HEIGHT-paddleh,
	width: paddlew,
	height: paddleh,
	draw: function() {
		ctx.beginPath();
		ctx.fillStyle = Player.color;
		ctx.rect(shipx, HEIGHT-paddleh, paddlew, paddleh);
		ctx.closePath();
		ctx.fill();
	}
};

//Creates the Missle
function circle(x,y,r) {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

//Used for the barriers and the aliens
function rect(x,y,w,h){
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}
var alienImg = new Image();

function aImg(x,y,w,h){
	ctx.drawImage(alienImg,x,y,w,h);
}
alienImg.src = '../alienInvaders/images/alien.png';

//Win Text
function winner(){
	ctx.beginPath();
	ctx.font = "bold 30px sans-serif";
	ctx.fillStyle = "white";
	ctx.fillText("Get Ready for the next round!", textPosX, (HEIGHT/2));
	ctx.closePath();
		
		
	var st = setTimeout(function(){
		alienDown = alienHeight*2;
		alienMove = 0;
		startLevel ++;
		aliensAlive = ((nRows + 1) * nCols)/4 ;
		playerBullets = [];
        clearTimeout(st);
		winRefresh();
	},3000);
}
//Lose Test
function lose(){
	ctx.beginPath();
	ctx.font = "bold 60px sans-serif";
	ctx.fillStyle = "white";
	ctx.fillText("Game Over", ((WIDTH*.5)-180), (HEIGHT*.5));
	ctx.closePath();
	clearInterval(intervalId);
}
//Score and Lives Text
function txt(words, x, y){
	ctx.beginPath();
	ctx.font = "bold 30px sans-serif";
	ctx.fillStyle = "white";
	ctx.fillText(words, x, y);
	ctx.closePath();
}
//Clears Objects
function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//The Start Function
function init() {
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  ctx = canvas.getContext("2d");
  $('#canvasWrap').append(canvas);
  shipx = 0;
  x = shipx + (paddlew/2);
  y = (HEIGHT-paddleh)+10;
  intervalId = setInterval(draw, 1000/30);
  return intervalId;
}