//Level Difficulty
switch(startLevel){
case 1:
var nRows = 3;
var nCols = 10;
var nBarriers = 11;
aliensAlive = ((nRows + 1)/2)*(nCols/2);
break;
case 2:
var nRows = 9;
var nCols = 20;
var nBarriers = 9;
aliensAlive = ((nRows + 1)/2)*(nCols/2);
break;
case 3:

break;
case 4:

break;
case 5:

break;
}

//Creation of the Aliens
function initALIENS() {
	ALIENS = new Array(nRows);
	//Creates the Array of Aliens
	for (i=0; i < nRows; i++) {
		ALIENS[i] = new Array(nCols);
		if(i%2 == 0){
			for (j=0; j < nCols; j++) {
				if(j%2 == 0){
					ALIENS[i][j] = 0;
					}
				else{
					ALIENS[i][j] = 1;
				}
			}
		}
	}
}

//Creates the Barriers
function initBarriers() {
	barrier = new Array();
	//Creates the Array of Barriers
	for (b=0; b < nBarriers; b++) {
		if(b%2 == 0){
			barrier[b] = 0;
		}
		else{
			barrier[b] = 5;
		}
	}
}

//Drawing on the canvas      
function draw() {

	//Clears the Canvas to redraw
	clear();
	
	playerBullets.forEach(function(Bullet) {
    Bullet.draw();})
	
	playerBullets.forEach(function(Bullet) {
    Bullet.update();
  });
	
/*--------------- U S E R   C O D E ---------------*/  
//If no key is pressed key will equal none
function stopMove(){
	key = "none";
}

//Keyboard Bindings
Mousetrap.bind('space', function(){if(firePause == false){fire();}}, 'keydown');
Mousetrap.bind('left', function(){key = "left";}, 'keydown');
Mousetrap.bind('right', function(){key = "right";}, 'keydown');
Mousetrap.bind('up', function(){key = "up";}, 'keydown');
Mousetrap.bind('down', function(){key = "down";}, 'keydown');
Mousetrap.bind('a', function(){key = "test";}, 'keydown');

Mousetrap.bind('left', function(){stopMove();}, 'keyup');
Mousetrap.bind('right', function(){stopMove();}, 'keyup');
Mousetrap.bind('up', function(){stopMove();}, 'keyup');
Mousetrap.bind('down', function(){stopMove();}, 'keyup');
Mousetrap.bind('a', function(){stopMove();}, 'keyup');

//giving the keyboard binding some functions
switch(key){
	case "right":
		if(paddlex >= (WIDTH - paddlew)){}
		else{paddlex += 5;}
		break;
	case "left":
		if(paddlex <= 0){}
		else{paddlex -= 5;}
		break;		
	case "up":   
		y -= 5;
		break;		
	case "down":
		y += 5;
		break;		
	case "test":
	break;			
 }


//If fireMissle is true the missle is not able to be moved
function fire(){
		//firePause = true;
		score --;
		playerBullets.push(Bullet({
			number: playerBullets.length,
			x: paddlex + (paddlew/2),
			y: (HEIGHT-paddleh)+10,
			speed: 5
		}));
};
//redraws the users ship
Player.draw();

/*--------------- E N D	  U S E R   C O D E ---------------*/


/*--------------- A L I E N   C O D E ---------------*/
//Alien Moving Animation
//if the alien his the right wall move down and move left

var count = 0;

for(c=(nCols-1); c > 0; c-=2){
	for(r=0; r < nRows; r+=2){
		if(ALIENS[r][c] == 1 && alienMove >= WIDTH - ((nCols * alienWidth) + (((c - nCols)+1) * alienWidth))){
				moveObj = true;	
				count ++;
				if(count == 1){alienDown += alienHeight;}
		}
	}
}
//if the alien his the left wall move down and move right
for(c=0; c < nCols; c++){
	for(r=0; r < nRows; r+=2){	
		if(ALIENS[r][c] == 1 && alienMove <= (0 - (alienWidth * c))){
				moveObj = false;
				count ++;
				if(count == 1){alienDown += alienHeight;}
		}
	}
}


//makes the aliens move in opposite direction
 if(moveObj){alienMove -= alienSpeed;count=0;}
 else{alienMove += alienSpeed;count=0;}

//Drawing the Aliens on stage
  for (i=0; i < nRows; i++) {
    for (j=0; j < nCols; j++) {
      if (ALIENS[i][j] == 1) {
		aImg((j * alienWidth + alienMove), (i * alienHeight + alienDown), alienWidth, alienHeight);
      }
    }
  }
 
//Setting up the Alien x and y points
var alienD = 0;
if(alienDown == alienHeight*2){alienD = alienHeight;}
else{alienD = alienDown - alienHeight}; 
ap1x = new Array(nRows);
ap2y = new Array(nRows);
ap3y = new Array(nRows);
ap4x = new Array(nRows);
for (i=0; i < nRows; i++) {
ap1x[i] = new Array(nCols);
ap2y[i] = new Array(nCols);
ap3y[i] = new Array(nCols);
ap4x[i] = new Array(nCols);
	if(i%2==0){
		for (j=0; j < nCols; j++) {
			if(j%2==0){}
			else{
			ap1x[i][j] = (j * alienWidth) + alienMove - 3;
			ap2y[i][j] = ((i+1) * alienHeight) + alienD;
			ap3y[i][j] = (((i+1) * alienHeight) + alienHeight) + alienD;
			ap4x[i][j] = ((j * alienWidth) + alienWidth) + alienMove + 3;
			}
		}
	}
}
	
//The Hit State For the Aliens 
	for (r=0; r < nRows; r++) {
		if(r%2==0){
			for (j=0; j < nCols; j++) {
				if(j%2==0){}
				else{
					playerBullets.forEach(function(Bullet) {
						if(ap1x[r][j] < Bullet.x && ap2y[r][j] < Bullet.y && ap3y[r][j] > Bullet.y && ap4x[r][j] > Bullet.x && ALIENS[r][j] == 1){
							hit(r,j);
							Bullet.active = false;
							Bullet.x = 0;
							Bullet.y = 0;
						}
					})
				}
			}
		}
	}



//Draw Enemy missles
eMy += dy;	

//Checks to see if the Enemy Missle has been fired
if(!eMfire){
eMx = -20;
eMy = 0;
	cn = Math.floor(Math.random()*nCols);
	rn = Math.floor(Math.random()*nRows);
	//Checks to see if the ship is still valid
	if(cn%2 == 1 && rn%2 == 0 && ALIENS[rn][cn]== 1){
	eMy = (((ap3y[rn][cn] - ap2y[rn][cn])/2) + ap2y[rn][cn]);
	eMx = (((ap4x[rn][cn] - ap1x[rn][cn])/2) + ap1x[rn][cn]);
	eMfire = true;
	}
}
if(ALIENS[rn][cn]== 1){circle(eMx, eMy, bulletSize);}

if(eMy >= HEIGHT){
eMfire = false;
}

if(paddlex < eMx && (HEIGHT - paddleh) < eMy && HEIGHT > eMy && (paddlex + paddlew) > eMx){
	hitU();
}

switch(aliensAlive){
case 20:
alienSpeed = 2.5;
break;
case 15:
alienSpeed = 3;
break;
case 10:
alienSpeed = 3.5;
break;
case 5:
alienSpeed = 5;
break;
}
/*--------------- E N D	  A L I E N   C O D E ---------------*/


/*--------------- B A R R I E R   C O D E ---------------*/

//Changes the Barriers Width & Height
var barrierW = WIDTH/nBarriers;
var barrierH = 50;

 //Drawing Barriers
for (b=0; b < nBarriers; b++) {
	switch(barrier[b]){
	case 5:
		rect(b * (WIDTH/nBarriers),HEIGHT - (3*(paddleh + bulletSize)),barrierW,barrierH);
		break;
	case 4:
		rect(b * (WIDTH/nBarriers),HEIGHT - (3*(paddleh + bulletSize)),barrierW,barrierH - 10);
		break;
	case 3:
		rect(b * (WIDTH/nBarriers),HEIGHT - (3*(paddleh + bulletSize)),barrierW,barrierH - 20);
		break;  
 	case 2:
		rect(b * (WIDTH/nBarriers),HEIGHT - (3*(paddleh + bulletSize)),barrierW,barrierH - 30);
		break;  
	case 1:
		rect(b * (WIDTH/nBarriers),HEIGHT - (3*(paddleh + bulletSize)) ,barrierW,barrierH - 40);
		break;   
	}
}

//Setting up the Barrier x and y points
bp1x = new Array(nBarriers);
bp2y = new Array(nBarriers);
bp3y = new Array(nBarriers);
bp4x = new Array(nBarriers);
for (b=0; b < nBarriers; b++) {
	if(b%2==0){}
	else{
		bp1x[b] = (b * barrierW);
		bp2y[b] = HEIGHT - (3*(paddleh + bulletSize));
		bp3y[b] = bp2y[b] + (barrier[b] * 10);
		bp4x[b] = (b * barrierW) + barrierW;
	}
}

//The Hit State For the Barriers to the User Missles

for (b=0; b < nBarriers; b++) {
	playerBullets.forEach(function(Bullet) {
		if(bp1x[b] < Bullet.x && bp2y[b] < Bullet.y && bp3y[b] > Bullet.y && bp4x[b] > Bullet.x && barrier[b] > 0){
			hitB(b);				
			Bullet.active = false;
			Bullet.x = 0;
			Bullet.y = 0;}
})}

//The Hit State For the Barriers to Enemy Missles
for (b=0; b < nBarriers; b++) {
	if(bp1x[b] < eMx  && bp2y[b] < eMy && bp3y[b] > eMy && bp4x[b] > eMx  && barrier[b] > 0){hitBE(b);}
}
/*--------------- E N D	  B A R R I E R   C O D E ---------------*/


/*--------------- H I T   F U N C T I O N   C O D E ---------------*/  
 //This is the Hit function for aliens
function hit(row, col){
	y =(HEIGHT-paddleh)+5;
	x = paddlex + (paddlew/2);
	fireMissle = false;
	ALIENS[row][col] = 0;
	aliensAlive --;
	score += 10;
}
//Hit Function for barrier from the User Missle
function hitB(b){
	barrier[b] -= 1;
	y = (HEIGHT-paddleh)+5;
	x = paddlex + (paddlew/2);
	fireMissle = false;
}
//Hit Function for barrier from the Enemy Missle
function hitBE(b){
	barrier[b] -= 1;
	eMfire = false;
}
//Hit Function for User
function hitU(){
	userLives --;
	eMfire = false;
	if(userLives == 0){
		lose();
	}
}
/*--------------- E N D   H I T   F U N C T I O N   C O D E ---------------*/  
  
/*--------------- C A N V A S   T E X T   C O D E ---------------*/
//Drawing up the HighScore
txt("High Score: 9999", 10, 30);
//Drawing up the Score
txt("Score: "+score, 450, 30);
//Drawing up the Lives
txt("Lives: "+userLives, 800, 30);
/*--------------- E N D	  C A N V A S   T E X T   C O D E ---------------*/

//Win State
if(aliensAlive == 0){
	winner();
}

//Lose State 
for (i=0; i < nRows; i++) {
	if(i%2==0){
		for (j=0; j < nCols; j++) {
			if(ALIENS[i][j] == 1){
				if(alienDown + ((i + 1) * alienHeight) >= (HEIGHT - ((paddleh * 2) + bulletSize))){
					lose();
				}
			}
		}
	}
}

}/*The End of the Draw Function*/

//sends back to object.js
function refresh(){
init();
initALIENS();
initBarriers();

}

init();
initALIENS();
initBarriers();