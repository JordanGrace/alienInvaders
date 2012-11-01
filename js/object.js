/*----------------------------------Things that can be Changed----------------------------------*/
//Changes the size of the Missle
var bulletSize = 3;
var eMSpeed = 50;
//Changes the Aliens Speed
var alienSpeed = 2;
//Changes the Aliens Width & Height (Height needs to be divisible by 5)
var alienWidth = 30;
var alienHeight = 25;
//Changes the Number of rows of aliens "Has to be Odd"
var nRows = 9;
//Changes the Number of Columns of aliens "Has to be Even"
var nCols = 20;
//Changes the Number of Barriers "Has to be Odd"
var nBarriers = 9;
//Changes the Amount of Lives you can have
var userLives = 3;
//sets the images for the objects in game
var alienImage = '../alienInvaders/images/alien.png';
var shipImage = '';
/*----------------------------------Changes to the Variables below may break game----------------------------------*/
//default variables for the creation of the canvas
var canvas = document.createElement('canvas');
var ctx;

//Sets the Width and Height of the canvas
var WIDTH = $('#canvasWrap').width();
var HEIGHT = $('#canvasWrap').height();

//determines howmany aliens are alive
var aliensAlive = ((nRows + 1) * nCols)/4 ;

//The ships x cords
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
var moveObj = false;
var eMfire = false;
var ctt = 0;
var playerBullets = [];

/*
var Aliens2 = [];

function Alien2(A) {
	A.life = 1,
	A.width = 30,
	A.height = 25,
	A.img = '../alienInvaders/images/alien.png',
	A.draw = function(){
		var alienImg = new Image();
		ctx.drawImage(A.img,A.x,A.y,A.width,A.height);
		alienImg.src = A.img;
	}
}
*/

//Creating the player
var Player = {
	color: "white",
	x: shipx,
	y: HEIGHT-30,
	width: 50,
	height: 30,
	draw: function() {
		ctx.beginPath();
		ctx.fillStyle = Player.color;
		ctx.rect(shipx, HEIGHT-Player.height, Player.width, Player.height);
		ctx.closePath();
		ctx.fill();
	}
};

//Created the Bullets
function Bullet(I) {
	I.active = true;
	I.radius = 3;
	I.xVelocity = 0;
	I.yVelocity = I.speed;
	I.color = "white";
	I.inBounds = function() {
		return I.x >= 0 && I.x <= WIDTH && I.y >= 0 && I.y <= HEIGHT;
	};
	/*I.hit = function() {
		return I.x 
	};*/
	I.draw = function() {
		if(I.active == true){
			ctx.beginPath();
			ctx.fillStyle = I.color;
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
		}else{I.speed = 0;I.yVelocity = 0;}
	};
	I.update = function() {
		I.x += I.xVelocity;
		I.y += I.yVelocity;
		I.active = I.active && I.inBounds();
	};
  return I;
}

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
alienImg.src = alienImage;

//Win Text
function winner(){
	clear();
	//Drawing up the HighScore
	txt("High Score: 9999", 10, 30);
	//Drawing up the Score
	txt("Score: "+score, 450, 30);
	//Drawing up the Lives
	txt("Lives: "+userLives, 800, 30);
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
	clear();
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
  	ctx = canvas.getContext("2d");
  	canvas.width = WIDTH;
  	canvas.height = HEIGHT;
  	$('#canvasWrap').append(canvas);
  	shipx = 0;
  	intervalId = setInterval(draw, 1000/30);
  	return intervalId;
}