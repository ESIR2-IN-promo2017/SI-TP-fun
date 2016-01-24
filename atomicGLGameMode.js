
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
		var displayCommande= false;
		var displayCredits= false;
		if(this.isPaused==false){

       this.isPaused=true;
	  
		var ni = document.getElementById('myDiv');

 		var newdiv = document.createElement('div');
		newdiv.setAttribute("id", "newDiv");

  		newdiv.innerHTML = '<div class="container"><h3>Menu</h3><ul class="nav nav-pills nav-stacked"><li class="active"><a id="continue" href="#">Continuer</a></li><li><a id = "commandes" href="#">Commandes</a></li><li><a id="credits" href="#">Crédits</a></li><li><a id="quit"  href="#">Quitter</a></li></ul></div>';

  		ni.appendChild(newdiv);

		$('#continue').click(function(){ 
			//this.isPaused=false;
			$( '#newDiv' ).remove();
 			game.isPaused=false;				
		})

		$('#quit').click(function(){ 
			$( '#body' ).remove();
		})

		$('#commandes').click(function(){
			if(!displayCommande){
				displayCommande =true;
			var com = document.getElementById('commandes');
			var commandesDiv = document.createElement('div');
			commandesDiv.setAttribute("id", "commandesDiv");
	  		commandesDiv.innerHTML = '<div class="container"><h2> <p>Voici les Commandes associées au jeu</p></h2><table class="table table-bordered"> <thead><tr><th>Touches</th><th>Action associée</th></tr></thead><tbody>'
	  		+'<tr><td>Espace | Entrée</td>'
	  		+'<td>Saut</td></tr>'
	  		+'<tr><td>Fleche Haut | Z</td>'
	  		+'<td>Avancer</td></tr>'
	  		+'<tr><td>Fleche Bas | S</td>'
	  		+'<td>Reculer</td></tr>'
			+'<tr><td>Fleche Droite | D</td>'
	  		+'<td>Pas Vers La Droite</td></tr>'
			+'<tr><td>Fleche Gauche| Q</td>'
	  		+'<td>Pas Vers La Gauche</td></tr>'
			+'<tr><td>Clique Souris Gauche</td>'
	  		+'<td>Attaque Epée</td></tr>'
			+'<tr><td>Echape</td>'
	  		+'<td>Mettre Le Jeu En Pause</td></tr>'
	  		+'</tbody></table></div>'
	  		com.appendChild(commandesDiv);	
		}else{
			$( '#commandesDiv' ).remove();
			displayCommande =false;
		}
		})

		$('#credits').click(function(){ 
		if(!displayCredits){
				displayCredits =true;
				var cred = document.getElementById('credits');
				var credDiv = document.createElement('div');
				credDiv.setAttribute("id", "creditsDiv");
		  		credDiv.innerHTML = '<div class="container"><h2>Ce Tp Fun a été réalisé par :</h2><ul class="list-group">'+
    '<li class="list-group-item list-group-item-success">BANNIER Kévin</li>'+
    '<li class="list-group-item list-group-item-info">DELAMBILY Clémentine</li>'+
    '<li class="list-group-item list-group-item-warning">HELALI Billel</li>'+
    '<li class="list-group-item list-group-item-danger">LABOUREUR Nicolas</li>'+
    '<li class="list-group-item list-group-item-info">LOUARN Amaury</li>'+
    '<li class="list-group-item list-group-item-success">LOISEAU Anne-Claire</li>'+
 	'</ul>';
 			cred.appendChild(credDiv);
			}else{
				$( '#creditsDiv' ).remove();
				displayCredits =false;
		}



		})

		}

	  
	}
}
