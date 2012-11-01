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

	for(r=1; r < 6; r++){
		for(c=1; c < 11; c++){
			Aliens2.push(Alien2({
				row: r,
				col: c,
				x: c * 60,
				y: r * 50
			}));
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
function draw(){

	//Clears the Canvas to redraw
	clear();
	
	playerBullets.forEach(function(Bullet) {
    Bullet.draw();});
	
	playerBullets.forEach(function(Bullet) {
    Bullet.update();});

   /* Aliens2.forEach(function(Alien2) {
    Alien2.draw();});
	
	Aliens2.forEach(function(Alien2) {
    Alien2.update();});*/
	
/*--------------- U S E R   C O D E ---------------*/  
//Keyboard Bindings

	Mousetrap.bind('space', function(){fire('player',-5,shipx + (Player.width/2),(HEIGHT-Player.height)+10);}, 'keydown');
	Mousetrap.bind('left', function(){key = "left";}, 'keydown');
	Mousetrap.bind('right', function(){key = "right";}, 'keydown');
	Mousetrap.bind('up', function(){key = "up";}, 'keydown');
	Mousetrap.bind('down', function(){key = "down";}, 'keydown');
	Mousetrap.bind('p', function(){key = "pause";}, 'keydown');

	Mousetrap.bind('left', function(){stopMove();}, 'keyup');
	Mousetrap.bind('right', function(){stopMove();}, 'keyup');
	Mousetrap.bind('up', function(){stopMove();}, 'keyup');
	Mousetrap.bind('down', function(){stopMove();}, 'keyup');
	Mousetrap.bind('p', function(){stopMove();}, 'keyup');

//giving the keyboard binding some functions
	switch(key){
		case "right":
			if(shipx >= (WIDTH - Player.width)){}
			else{shipx += 5;}
		break;
		case "left":
			if(shipx <= 0){}
			else{shipx -= 5;}
		break;		
		case "up":   
			y -= 5;
		break;		
		case "down":
			y += 5;
		break;		
		case "p":
			pauseGame();
		break;			
	}

//If no key is pressed key will equal none
	function stopMove(){
		key = "none";
	}

//If fireMissle is true the missle is not able to be moved
	function fire(w,s,bx,by){
			score --;
			playerBullets.push(Bullet({
				number: playerBullets.length,
				x: bx,
				y: by,
				who: w,
				speed: s
			}));
	};
//redraws the users ship
	Player.draw();

/*--------------- E N D	  U S E R   C O D E ---------------*/


/*--------------- A L I E N   C O D E ---------------*/
//Alien Moving Animation

	var count = 0;
	for(c=(nCols-1); c > 0; c-=2){
		for(r=0; r < nRows; r+=2){
	//if the alien hits the right wall
			if(ALIENS[r][c] == 1 && alienMove >= WIDTH - ((nCols * alienWidth) + (((c - nCols)+1) * alienWidth))){
					moveObj = true;	
					count ++;
					if(count == 1){alienDown += alienHeight;}
			}
	//if the alien hits the left wall
			else if(ALIENS[r][c] == 1 && alienMove <= (0 - (alienWidth * c))){
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
						if(ap1x[r][j] < Bullet.x && ap2y[r][j] < Bullet.y && ap3y[r][j] > Bullet.y && ap4x[r][j] > Bullet.x && ALIENS[r][j] == 1 && Bullet.who == 'player'){
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
eMfire++;
//Checks to see if the Enemy Missle has been fired
	if(eMfire == eMSpeed){
		eMx = -20;
		eMy = 0;
		cn = Math.floor(Math.random()*nCols);
		rn = Math.floor(Math.random()*nRows);
	//Checks to see if the ship is still valid
		if(cn%2 == 1 && rn%2 == 0 && ALIENS[rn][cn]== 1){
			eMy = (((ap3y[rn][cn] - ap2y[rn][cn])/2) + ap2y[rn][cn]);
			eMx = (((ap4x[rn][cn] - ap1x[rn][cn])/2) + ap1x[rn][cn]);
			fire('alien',5,eMx,eMy);
		}
		eMfire = 0;
	}

	

	playerBullets.forEach(function(Bullet) {
		if(shipx < Bullet.x && (HEIGHT - Player.height) < Bullet.y && HEIGHT > Bullet.y && (shipx + Player.width) > Bullet.x && Bullet.who == 'alien'){
			Bullet.active = false;
			Bullet.x = 0;
			Bullet.y = 0;
			
			hitU();
		}
		
	})

//Checks to see how many aliens are alive, the lower alive the harder it gets
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
			alienSpeed =5;
		break;
		case 0:
			winner();
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
			rect(b * (WIDTH/nBarriers),HEIGHT - (3*(Player.height + bulletSize)),barrierW,barrierH);
			break;
		case 4:
			rect(b * (WIDTH/nBarriers),HEIGHT - (3*(Player.height + bulletSize)),barrierW,barrierH - 10);
			break;
		case 3:
			rect(b * (WIDTH/nBarriers),HEIGHT - (3*(Player.height + bulletSize)),barrierW,barrierH - 20);
			break;  
	 	case 2:
			rect(b * (WIDTH/nBarriers),HEIGHT - (3*(Player.height + bulletSize)),barrierW,barrierH - 30);
			break;  
		case 1:
			rect(b * (WIDTH/nBarriers),HEIGHT - (3*(Player.height + bulletSize)) ,barrierW,barrierH - 40);
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
			bp2y[b] = HEIGHT - (3*(Player.height + bulletSize));
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
				Bullet.y = 0;
			}
		})
	}
	/*--------------- E N D	  B A R R I E R   C O D E ---------------*/


	/*--------------- H I T   F U N C T I O N   C O D E ---------------*/  
 //This is the Hit function for aliens
	function hit(row, col){
		ALIENS[row][col] = 0;
		aliensAlive --;
		score += 10;
	}
//Hit Function for barrier from the User Missle
	function hitB(b){
		barrier[b] -= 1;
		
	}
//Hit Function for barrier from the Enemy Missle
	function hitBE(b){
		barrier[b] -= 1;
		
	}
//Hit Function for User
	function hitU(){
		userLives --;
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
//Lose State 
	for (i=0; i < nRows; i++) {
		if(i%2==0){
			for (j=0; j < nCols; j++) {
				if(ALIENS[i][j] == 1){
					if(alienDown + ((i + 1) * alienHeight) >= (HEIGHT - ((Player.height * 2) + bulletSize))){
						lose();
					}
				}
			}
		}
	}
}/*The End of the Draw Function*/

//sends back to object.js
function winRefresh(){
ctt++;
if(ctt >= 70){
  initALIENS();
  initBarriers();
}
}

init();
initALIENS();
initBarriers();