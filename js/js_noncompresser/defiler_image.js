//fonction qui effectue le defiler d'image sur l'accueil
function suivante(){
	alert("te");
	document.images[I].style.display = "none" ;
	if ( I < Imax )
	I++;
	else
	I=0;    
	document.images[I].style.display = "inline";
	setTimeout(suivante, 4000);
}