//206265 correspond a 1 radian
function calculD(){
	window.document.getElementById('diametre').value = ((window.document.getElementById('theta').value/206265)* Number(dda)).toFixed(6);
}

function calcultheta(){
	window.document.getElementById('theta').value = (206265*window.document.getElementById('diametre').value/ Number(dda)).toExponential(6);
}	