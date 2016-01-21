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
	this.xa = 0.;
	this.ya = 1.4;
	this.za = 0.;


	// camera orientation
	this.theta = 0.0 ;
	
	this.phi = 0.0 ;
	//vector and angle of the arm rotation
	this.atheta = 270.0 ;
	this.aphi =[-.2,1,0];

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
	this.O3D_arm;
	
	// methods
	// --------------------------------------------------
	// up/right/left/down
	//---------------------------
	this.up 	= function () {
		this.xc +=	+this.step*Math.sin(this.theta*3.14/180.0);
		this.zc += 	-this.step*Math.cos(this.theta*3.14/180.0);
		this.xa +=	+this.step*Math.sin(this.theta*3.14/180.0);
		this.za += 	-this.step*Math.cos(this.theta*3.14/180.0);
		this.update();
	}
	this.down 	= function () {
		this.xc +=	-this.step*Math.sin(this.theta*3.14/180.0);
		this.zc +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.xa +=	-this.step*Math.sin(this.theta*3.14/180.0);
		this.za += 	+this.step*Math.cos(this.theta*3.14/180.0);
		this.update();;

	}
	this.right 	= function () {
		this.xc +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.zc += 	+this.step*Math.sin(this.theta*3.14/180.0);
		this.xa +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.za += 	+this.step*Math.sin(this.theta*3.14/180.0);
		this.update();
	}
	this.left 	= function () {
		this.xc +=	-this.step*Math.cos(this.theta*3.14/180.0);
		this.zc += 	-this.step*Math.sin(this.theta*3.14/180.0);
		this.xa +=	-this.step*Math.cos(this.theta*3.14/180.0);
		this.za += 	-this.step*Math.sin(this.theta*3.14/180.0);
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
		limit = 0.02;
		if( a >= limit || a <= -limit) {
			this.rotateArm(-a,-1);
		}
	}
	this.turnleft 	= function (a) {		
		this.rotateArm(a,1);
	}
	this.turnup = function(a){
		this.phi = a;
		this.aphi[2]=this.phi/-60;
		this.aphi[3]=this.phi/-50;
		this.update();		
	}

	this.idle = function(){
		this.isIdle = true;
		this.isJumpingDown=false;
		this.isJumpingUp=false;
		this.timeOut = 0.0;
		this.yc = 2.0 ;
		this.O3D_armTransform.setTransform([this.xa,this.ya=1.4,this.za],
												this.aphi,this.atheta);
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

		this.O3D_arm = new atomicGLSceneGraph('object3D','wall2roof');
		this.O3D_arm.setObject3D(arm2,textProgId);
		this.O3D_arm.setTransform([this.xa,this.ya=1.4,this.za],
												this.aphi,this.atheta);
		
		
		this.O3D_armTransform = new atomicGLSceneGraph('transform','arm2');
		this.O3D_armTransform.setTransform([this.xa,this.ya=1.4,this.za],
												this.aphi,this.atheta);
		
		this.O3D_armTransform.addChild(this.O3D_arm);
	
		sg.addChild(this.O3D_armTransform) ;
	}



	this.rotateArm=function(a,signe) {
		
		this.atheta += -a*signe ;
		this.theta += +a*signe ;
		//this.xa +=  .1*Math.cos(this.theta*3.14/180.0);
		//this.za +=  .1*Math.sin(this.theta*3.14/180.0);
		this.update();
	}

	this.update = function() {
		this.O3D_armTransform.setTransform([this.xa,this.ya,this.za],
												this.aphi,this.atheta);

	}

}