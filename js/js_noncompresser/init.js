function init(){
		getData();
}
//initialise les champs dans la fenetre calculs annexes
function getData(){
   document.getElementById("T0").innerHTML = parent.window.opener.document.getElementById('T0').value;
   document.getElementById("H0").innerHTML = parent.window.opener.document.getElementById('H0').value;
   document.getElementById("omegam0").innerHTML = parent.window.opener.document.getElementById('omegam0').value;
   document.getElementById("resultat_omegar0").innerHTML = parent.window.opener.document.getElementById("resultat_omegar0").innerHTML;
   document.getElementById("resultat_omegak0").innerHTML = parent.window.opener.document.getElementById("resultat_omegak0").innerHTML;
   document.getElementById("omegalambda0").innerHTML = parent.window.opener.document.getElementById('omegalambda0').value;
   document.getElementById("type").innerHTML = parent.window.opener.document.getElementById("liste").value;
   
   document.getElementById("T0").value = parent.window.opener.document.getElementById('T0').value;
   document.getElementById("H0").value = parent.window.opener.document.getElementById('H0').value;
   document.getElementById("omegam0").value = parent.window.opener.document.getElementById('omegam0').value;
   document.getElementById("omegalambda0").value = parent.window.opener.document.getElementById('omegalambda0').value;
   document.getElementById("resultat_omegak0").value = parent.window.opener.document.getElementById('resultat_omegak0').value;
}

//initialise les champs dans la fenetre constantes
function getData_para(){
	document.getElementById("c").value = parent.window.opener.document.getElementById('c').value;
	document.getElementById("k").value = parent.window.opener.document.getElementById('k').value;
	document.getElementById("h").value = parent.window.opener.document.getElementById('h').value;
	document.getElementById("G").value = parent.window.opener.document.getElementById('G').value;
	document.getElementById("typeannee").value = parent.window.opener.document.getElementById('typeannee').value;
	document.getElementById("nbr_precision").value = parent.window.opener.document.getElementById('nbr_precision').value;
}