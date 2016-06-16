//fonction pour telecharger le graphique et ces informations
function dlCanvas() {
	svg = $('svg').parent().html()
	canvg('canvas_1', svg);
	canvas_1 = document.getElementById("canvas_1");
	context_1 = canvas_1.getContext('2d');
	var w = canvas_1.width;
	var h = canvas_1.height;
	
	//trace un canvas ainsi que les informations en plus
	data = context_1.getImageData(0, 0, w, h);//
	context_1.clearRect (0,0,w,h);//
	canvas_1.height = 680;
	canvas_1.width = 760;
	context_1.putImageData(data, 0,0);//
	var w = canvas_1.width;
	var h = canvas_1.height;
	
	context_1.beginPath();
	context_1.rect(125, 460, 450, 200);
	context_1.stroke(); 
	
	var text = 'O';
	context_1.font = "18pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 470);
	context_1.font = "11pt Verdana";
	context_1.fillText("m0", 184, 483);
	context_1.font = "18pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegam0").innerHTML, 210, 470);
	
	var text = 'O';
	context_1.font = "18pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 495);
	context_1.font = "11pt Verdana";
	context_1.fillText("r0", 184, 508);
	context_1.font = "18pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegar0").innerHTML, 210, 495);
	
	var text = 'O';
	context_1.font = "18pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 520);
	context_1.font = "11pt Verdana";
	context_1.fillText("?0", 184, 533);
	context_1.font = "18pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegarlambda0").innerHTML, 210, 520);
	
	var text = 'O';
	context_1.font = "18pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 545);
	context_1.font = "11pt Verdana";
	context_1.fillText("k0", 184, 558);
	context_1.font = "18pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegak0").innerHTML, 210, 545);
	
	var text = 'T';
	context_1.font = "18pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 570);
	context_1.font = "11pt Verdana";
	context_1.fillText("0", 184, 583);
	context_1.font = "18pt Verdana";
	context_1.fillText("(K) = "+t0, 210, 570);
	
	var text = 'H';
	context_1.font = "18pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 595);
	context_1.font = "11pt Verdana";
	context_1.fillText("0", 184, 608);
	context_1.font = "18pt Verdana";
	context_1.fillText("(Km.s^-1.Mpc^-1) = "+h0, 210, 595);
	
	var text = document.getElementById("resultat_ageunivers").innerHTML;
	context_1.font = "18pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 620);
	
	var text = 'Cosmograve 2016';
	context_1.font = "11pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 290, 665);
	
	//effectue l'action en fonction de ce qui est demander
	if(document.getElementById("type").options[document.getElementById('type').selectedIndex].text == "pdf"){
		data = context_1.getImageData(0, 0, w, h);
		var compositeOperation = context_1.globalCompositeOperation;
		context_1.globalCompositeOperation = "destination-over";
		context_1.fillStyle = "white";
		context_1.fillRect(0,0,w,h);
		
		var imgData = canvas_1.toDataURL("image/jpeg", 1.0);
		var pdf = new jsPDF();
		
		context_1.clearRect (0,0,w,h);
		context_1.putImageData(data, 0,0);
		context.globalCompositeOperation = compositeOperation;
		
		pdf.addImage(imgData, 'JPEG', 0, 0);
		
		pdf.save("Cosmograve.pdf");
		}else if(document.getElementById("type").options[document.getElementById('type').selectedIndex].text == "png"){
		img = canvas_1.toDataURL("image/"+document.getElementById("type").options[document.getElementById('type').selectedIndex].text);
		img = img.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
		img = img.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Cosmograve.'+document.getElementById("type").options[document.getElementById('type').selectedIndex].text);
		document.getElementById("dl").setAttribute("download", "Cosmograve."+document.getElementById('type').options[document.getElementById('type').selectedIndex].text);
		this.href = img;
		}else{
		data = context_1.getImageData(0, 0, w, h);
		var compositeOperation = context_1.globalCompositeOperation;
		context_1.globalCompositeOperation = "destination-over";
		context_1.fillStyle = "white";
		context_1.fillRect(0,0,w,h);
		
		img = canvas_1.toDataURL("image/"+document.getElementById("type").options[document.getElementById('type').selectedIndex].text);
		
		context_1.clearRect (0,0,w,h);
		context_1.putImageData(data, 0,0);
		context.globalCompositeOperation = compositeOperation;
		
		img = img.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
		img = img.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Cosmograve.'+document.getElementById("type").options[document.getElementById('type').selectedIndex].text);
		document.getElementById("dl").setAttribute("download", "Cosmograve."+document.getElementById('type').options[document.getElementById('type').selectedIndex].text);
		
		this.href = img;
	}
};