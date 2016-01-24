
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


// constructor
//------------------------
// inputs
//------------------------
atomicGLGameMode = function(agl){

	this.elapsedTime=0.0;
	this.isPaused=false;



	//à modifier! Ajout du menu sur un canvas! 
	this.displayMenu = function (){

		if(this.isPaused==false){

       this.isPaused=true;
	  
		var ni = document.getElementById('myDiv');

 		var newdiv = document.createElement('div');
		newdiv.setAttribute("id", "newDiv");

  		newdiv.innerHTML = '<div class="container"><h3>Menu</h3><ul class="nav nav-pills nav-stacked"><li class="active"><a id="continue" href="#">Continuer</a></li><li><a id = "test" href="#">Commandes</a></li><li><a href="#">Crédits</a></li><li><a href="#">Quitter</a></li></ul></div>';

  		ni.appendChild(newdiv);

		$('#continue').click(function(){ 

			//this.isPaused=false;
			$( '#newDiv' ).remove();
 			game.isPaused=false;
		})

		}

	  
	}
}
