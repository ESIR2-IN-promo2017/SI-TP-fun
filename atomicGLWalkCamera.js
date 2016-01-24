// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/10/07
//----------------------------------------------------------------------------------------
// atomicGLClock
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
atomicGLWalkCamera = function(){
	// attributes
	// -------------------------------------------------
	// thisera position
	this.xc = 0.0 ;
	this.yc = 2.0 ;
	this.zc = 0.0 ;

	// arm position
	this.xa = 0.;
	this.ya = 1.4;
	this.za = 0.;


	// thisera orientation
	this.theta = 0.0 ;
	
	this.phi = 0.0 ;
	//vector and angle of the arm rotation
	this.atheta = 270.0 ;
	this.aphi =[0,1,0];

	// step
	this.step = 0.10;
	// rot
	this.rot = 0.5 ;

	//temps qui servira a effectué les transitions entre les animations
	this.timeOutJumping =0.0;	
	this.timeOutAttacking =0.0;	
	//Hauteur du saut
	var height = 2;


	// Collisions
	this.collision = new atomicGLCollision();



/********************************************
	Variable d'état d'animation
************************************************/
	this.isJumpingUp = false;
	this.isJumpingDown = false;
	this.isWalking =  false;
	this.isIdle =  true;
	this.isAttacking = false;

//------------------------------------------------

	this.O3D_armTransform;
	this.O3D_arm;
	
	// methods
	// --------------------------------------------------
	// up/right/left/down
	//---------------------------
	this.up 	= function () {
		dx =  this.step*Math.sin(this.theta*3.14/180.0);
		dz = -this.step*Math.cos(this.theta*3.14/180.0);


		this.move(dx, dz);
	}

	this.down 	= function () {
		dx = -this.step*Math.sin(this.theta*3.14/180.0);
		dz =  this.step*Math.cos(this.theta*3.14/180.0);
		this.move(dx, dz);
	}

	this.right 	= function () {
		dx = this.step*Math.cos(this.theta*3.14/180.0);
		dz = this.step*Math.sin(this.theta*3.14/180.0);

		this.move(dx, dz);
	}

	this.left 	= function () {
		dx = -this.step*Math.cos(this.theta*3.14/180.0);
		dz = -this.step*Math.sin(this.theta*3.14/180.0);

		this.move(dx, dz);
	}

	this.move = function(dx, dz) {
		col = this.collision.check_collision(this.xc, this.zc, this.xc+dx, this.zc+dz);

		if( col==false) {
			this.xc += dx;
			this.zc += dz;
			this.xa += dx;
			this.za += dz;
		}
		this.update();
	}

	this.jump_up = function () {
		this.yc += this.step;
		this.isIdle= false;
		this.isJumpingDown=false;
		this.isJumpingUp=true;
		this.ya+=this.step;
		this.update();
	}

	this.jump_down = function () {
		this.yc -= this.step;
		this.isIdle= false;
		this.isJumpingDown=true;
		this.isJumpingUp=false;
		this.ya-=this.step;
		this.update();
	}

	this.turnright 	= function (a) {
		this.theta  = a*90;
		this.atheta = 270-a*90;
		this.update();
	}

	this.turnup = function(a){
		this.phi = a;
		this.aphi[2]=this.phi/-60;
		//this.aphi[3]=this.phi/-50;
		this.update();		
	}

	this.idle = function(){
		this.isIdle = true;
		this.isJumpingDown=false;
		this.isJumpingUp=false;
		this.isAttacking=false;
		this.timeOutJumping = 0.0;
		this.timeOutAttacking=0.0;
		this.yc = 2.0 ;
		this.O3D_armTransform.setTransform([this.xa,this.ya=1.4,this.za],
												this.aphi,this.atheta);
	}

	/****************************
	Manage the Animation of the player
	********************************/
	this.stateMachineAnimation = function () {
		if(this.isJumpingUp && !this.isJumpingDown){
    		this.timeOutJumping += .045;
    		this.jump_up();
    		if(this.timeOutJumping>1.0)
    			this.isJumpingDown=true;
    	}
    	if(this.isJumpingDown){
		    this.timeOutJumping += .045;
    		this.jump_down();
    		if(this.timeOutJumping>2.0)
    			this.idle();
    	}
    	if(this.isAttacking) {
    		this.timeOutAttacking += .05;
    		if(this.timeOutAttacking <0.3)
    			this.attack(1);
    		else if(this.timeOutAttacking < 0.5)
    			this.attack(-1);
    		else
    			this.idle();
    	}
	}

	this.initPlayer=function(arm2,textProgId,sg) {
		this.O3D_arm = new atomicGLSceneGraph('object3D','O3D_arm');
		this.O3D_arm.setObject3D(arm2,textProgId);
		this.O3D_arm.setTransform([this.xa,this.ya=1.4,this.za],
												this.aphi,this.atheta);
		this.O3D_armTransform = new atomicGLSceneGraph('transform','arm2');
		this.O3D_armTransform.setTransform([this.xa,this.ya=1.4,this.za],
												this.aphi,this.atheta);
		this.O3D_armTransform.addChild(this.O3D_arm);
		sg.addChild(this.O3D_armTransform);
	}


	this.update = function() {
		this.O3D_armTransform.setTransform([this.xa,this.ya,this.za],
												this.aphi,this.atheta);
	}

	this.attack = function(signe) {
		//console.log("attack");
		
		this.xa +=	+this.step*Math.sin(this.theta*3.14/180.0)*3.0 * signe;
		this.za += 	-this.step*Math.cos(this.theta*3.14/180.0)*3.0 * signe;
		
		this.update();
	}
}