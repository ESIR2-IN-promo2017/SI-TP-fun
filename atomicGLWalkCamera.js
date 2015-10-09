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
	// camera orientation
	this.theta = 0.0 ;
	this.phi = 0.0 ;
	// step
	this.step = 0.10 ;
	// rot
	this.rot = 0.5 ;
	
	// methods
	// --------------------------------------------------
	// up/right/left/down
	//---------------------------
	this.up 	= function () {
		this.xc +=	+this.step*Math.sin(this.theta*3.14/180.0);
		this.zc += 	-this.step*Math.cos(this.theta*3.14/180.0);
	}
	this.down 	= function () {
		this.xc +=	-this.step*Math.sin(this.theta*3.14/180.0);
		this.zc +=	+this.step*Math.cos(this.theta*3.14/180.0);
	}
	this.right 	= function () {
		this.xc +=	+this.step*Math.cos(this.theta*3.14/180.0);
		this.zc += 	+this.step*Math.sin(this.theta*3.14/180.0);
	}
	this.left 	= function () {
		this.xc +=	-this.step*Math.cos(this.theta*3.14/180.0);
		this.zc += 	-this.step*Math.sin(this.theta*3.14/180.0);
	}
	this.jump = function () {
			var height = 2;
			this.yc += height;
			
			//On fait une pause pour marquer le saut puis on revient à la position initiale
			jump_down(height,1000);
			
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

}

function jump_down(height,miliseconds) {
           var currentTime = new Date().getTime();

           while (currentTime + miliseconds >= new Date().getTime()) {
           }
		   
		   this.yc -= height;
       }