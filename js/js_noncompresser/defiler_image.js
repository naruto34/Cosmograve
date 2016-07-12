//fonction qui effectue le defiler d'image sur l'accueil
function suivante(){
	document.getElementById("image_defile").getElementsByTagName('img')[I].style.display = "none" ;
	if ( I < Imax )
	I++;
	else
	I=0;    
	document.getElementById("image_defile").getElementsByTagName('img')[I].style.display = "inline";
	setTimeout(suivante, 4000);
}