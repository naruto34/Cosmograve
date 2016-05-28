function save_para(){
	window.opener.document.getElementById("c").value = document.getElementById('c').value;
	window.opener.document.getElementById("k").value = document.getElementById('k').value;
	window.opener.document.getElementById("h").value = document.getElementById('h').value;
	window.opener.document.getElementById("G").value = document.getElementById('G').value;
	alert(window.opener.document.getElementById("c").value);
}