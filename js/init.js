function init(){
		getData();
}

function getData(){
   document.getElementById("T0").innerHTML = window.opener.document.getElementById('T0').value;
   document.getElementById("H0").innerHTML = window.opener.document.getElementById('H0').value;
   document.getElementById("omegam0").innerHTML = window.opener.document.getElementById('omegam0').value;
   document.getElementById("resultat_omegar0").innerHTML = window.opener.document.getElementById("resultat_omegar0").innerHTML;
   document.getElementById("omegalambda0").innerHTML = window.opener.document.getElementById('omegalambda0').value;
   document.getElementById("type").innerHTML = window.opener.document.getElementById("liste").value;
   
   document.getElementById("T0").value = window.opener.document.getElementById('T0').value;
   document.getElementById("H0").value = window.opener.document.getElementById('H0').value;
   document.getElementById("omegam0").value = window.opener.document.getElementById('omegam0').value;
   document.getElementById("omegalambda0").value = window.opener.document.getElementById('omegalambda0').value;
}

function getData_para(){
	document.getElementById("c").value = window.opener.document.getElementById('c').value;
	document.getElementById("k").value = window.opener.document.getElementById('k').value;
	document.getElementById("h").value = window.opener.document.getElementById('h').value;
	document.getElementById("G").value = window.opener.document.getElementById('G').value;
}