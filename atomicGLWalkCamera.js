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
	// camera position
	this.xc = 0.0 ;
	this.yc = 2.0 ;
	this.zc = 0.0 ;

	// arm position
	this.xa = 0.35;
	this.ya = 1.6;
	this.za = -1.7;


	// camera orientation
	this.theta = 0.0 ;
	this.phi = 0.0 ;
	// step
	this.step = 0.10 ;
	// rot
	this.rot = 0.5 ;

	//temps qui servira a effectué les transitions entre les animations
	this.timeOut =0.0;	
	//Hauteur du saut
	var height = 2;



/********************************************
	Variable d'état d'animation
************************************************/
	this.isJumpingUp = false;
	this.isJumpingDown = false;
	this.isWalking =  false;
	this.isIdle =  true;


	this.O3D_armTransform;

	
	// methods
	// --------------------------------------------------
	// up/right/left/down
	//---------------------------
	this.up 	= function () {
		this.xc +=	+this.step*Math.sin(this.theta*3.14/180.0);
		this.zc += 	-this.step*Math.cos(this.theta*3.14/180.0);
		this.xa +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.za += 	-this.step*Math.sin(this.theta*3.14/180.0);
		this.O3D_armTransform.setTransform([this.xa,this.ya,this.za],
												[-0.1,1,0],180.0);
	}
	this.down 	= function () {
		this.xc +=	-this.step*Math.sin(this.theta*3.14/180.0);
		this.zc +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.xa +=	-this.step*Math.cos(this.theta*3.14/180.0);
		this.za += 	+this.step*Math.sin(this.theta*3.14/180.0);
		this.O3D_armTransform.setTransform([this.xa,this.ya,this.za],
												[-0.1,1,0],180.0);

	}
	this.right 	= function () {
		this.xc +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.zc += 	+this.step*Math.sin(this.theta*3.14/180.0);
		this.xa +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.za += 	+this.step*Math.sin(this.theta*3.14/180.0);
		this.O3D_armTransform.setTransform([this.xa,this.ya,this.za],
												[-0.1,1,0],180.0);
	}
	this.left 	= function () {
		this.xc +=	-this.step*Math.cos(this.theta*3.14/180.0);
		this.zc += 	-this.step*Math.sin(this.theta*3.14/180.0);
		this.xa +=	-this.step*Math.cos(this.theta*3.14/180.0);
		this.za += 	-this.step*Math.sin(this.theta*3.14/180.0);
		this.O3D_armTransform.setTransform([this.xa,this.ya,this.za],
												[-0.1,1,0],180.0);
	}
	this.jump_up = function () {
			this.yc += this.step;
			this.isIdle= false;
			this.isJumpingDown=false;
			this.isJumpingUp=true;
			this.O3D_armTransform.setTransform([this.xa,this.ya+=this.step,this.za],
												[-0.1,1,0],180.0);

	}
	this.jump_down = function () {
			this.yc -= this.step;
			this.isIdle= false;
			this.isJumpingDown=true;
			this.isJumpingUp=false;
			this.O3D_armTransform.setTransform([this.xa,this.ya-=this.step,this.za],
												[-0.1,1,0],180.0);

	}
	this.turnright 	= function (a) {
		limit = 0.02;
		if( a >= limit || a <= -limit) {
			this.theta += +a ;
		}
	}
	this.turnleft 	= function (a) {		
		this.theta += +a ;
	}
	this.turnup = function(a){this.phi = a;}

	this.idle = function(){
		this.isIdle = true;
		this.isJumpingDown=false;
		this.isJumpingUp=false;
		this.timeOut = 0.0;
		this.yc = 2.0 ;
		this.O3D_armTransform.setTransform([this.xa,this.ya=1.6,this.za],
												[-0.1,1,0],180.0);
	}


	/****************************
	Manage the Animation of the player
	********************************/
	this.stateMachineAnimation = function () {
		if(cam.isJumpingUp && !cam.isJumpingDown){
    		cam.timeOut += .045;
    		cam.jump_up();
    		if(cam.timeOut>1.0)
    			cam.isJumpingDown=true;
    	}
    	if(cam.isJumpingDown){
		    cam.timeOut += .045;
    		cam.jump_down();
    		if(cam.timeOut>2.0)
    			cam.idle();
    	}
	}


	this.initPlayer=function(arm2,textProgId,sg) {

		var O3D_arm = new atomicGLSceneGraph('object3D','wall2roof');
		O3D_arm.setObject3D(arm2,textProgId);

		this.O3D_armTransform = new atomicGLSceneGraph('transform','arm2');
		this.O3D_armTransform.setTransform([this.xa,this.ya,this.za],[-0.1,1,0],180.0);
		this.O3D_armTransform.addChild(O3D_arm);
		sg.addChild(this.O3D_armTransform) ;
	}



}