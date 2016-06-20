//206265 correspond a 1 radian
function calculD(){
	window.document.getElementById('diametre').value = (window.document.getElementById('theta').value/206265)* Number(dda);
}

function calcultheta(){
	window.document.getElementById('theta').value = 206265*window.document.getElementById('diametre').value/ Number(dda);
}	