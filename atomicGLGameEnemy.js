
// atomicGL
//----------------------------------------------------------------------------------------
// author: RC				
// contact: cozot@irisa.fr
// version: 0.1
// current version date: 2015/09/05
//----------------------------------------------------------------------------------------
// atomicGLCube
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


	

	this.spearmanAnimation;

	this.texture;
/////////////////

	this.playerDetected;
	this.isAttacking;
	this.isIdle;


	this.atime =0;	




// constructor
//------------------------
// inputs
//------------------------
atomicGLGameEnemy = function(obj,textProgId,sg) {

	this.playerDetected = false;
	this.isAttacking = false;
	this.isIdle = true;

	this.spearmanAnimation=obj;
	this.texture =textProgId;

	

	var obj1 = new atomicGLSceneGraph('object3D','obj');
	obj1.setObject3D(this.spearmanAnimation[0],this.texture);


	var obj2 = new atomicGLSceneGraph('object3D','obj');
	obj2.setObject3D(this.spearmanAnimation[1],this.texture);
	//obj2.setTransform([0.0,5,20],[0,0,0],0.0);

	var obj3 = new atomicGLSceneGraph('object3D','obj');
	obj3.setObject3D(this.spearmanAnimation[1],this.texture);
	//obj3.setTransform([0.0,0,0],[0,0,0],0.0);

	var obj1Transform = new atomicGLSceneGraph('transform','obj');
	obj1Transform.setTransform([-7.0,7,-111],[0,1,0],0.0);	
	
	var obj2Transform = new atomicGLSceneGraph('transform','obj');
	obj2Transform.setTransform([-25.0,0,-60],[0,1,0],70.0);	

	var obj3Transform = new atomicGLSceneGraph('transform','obj');
	obj3Transform.setTransform([10.0,0,-50],[0,1,0],-90.0);	



	obj1Transform.addChild(obj1);
	obj2Transform.addChild(obj2);
	obj3Transform.addChild(obj3);

	sg.addChild(obj1Transform);
	sg.addChild(obj2Transform);
	sg.addChild(obj3Transform);


	/****************************
	Manage the Animation of the enemy
	********************************/
	this.stateMachineAnimation = function () {
	
/*	if(this.isIdle){
		obj1.setObject3D(this.spearmanAnimation[1],this.texture);
		obj1.setTransform([0.0,0,0],[0,1,0],0.0);
	}else{
		obj1.setObject3D(this.spearmanAnimation[0],this.texture);
		obj1.setTransform([0.0,0,0],[0,1,0],0.0);
	}
	obj1Transform.addChild(obj1);
	*/
	}

	this.idle = function(){
	/*	this.isIdle = true;
		this.isisAttacking=false;
		if(this.timeOut >1.0)
			this.animationIdle();
*/
	}

	this.animationIdle = function(){
	//var obj = new atomicGLObj('spearman', new 01idle_spearman(),		1.0,1.0) ;
	//obj1.setObject3D(obj,textProgId);

	}


}