//fonction qui permet de sauvegarder les nouvelles constantes
function save_para(){
	document.getElementById("c").value = document.getElementById('c_para').value;
	document.getElementById("k").value = document.getElementById('k_para').value;
	document.getElementById("h").value = document.getElementById('h_para').value;
	document.getElementById("G").value = document.getElementById('G_para').value;
	
	document.getElementById("typeannee").value = document.getElementById('typeannee_para').value;
	document.getElementById("nbr_precision").value = document.getElementById('nbr_precision_para').value;
}