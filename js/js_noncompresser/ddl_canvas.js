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
	context_1.rect(125, 460, 480, 200);
	context_1.stroke(); 
	
	var text = 'Ω';
	context_1.font = "15pt Verdana";
	context_1.textAlign = "left";
	context_1.textBaseline = "top";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 470);
	context_1.font = "8pt Verdana";
	context_1.fillText("m0", 175, 483);
	context_1.font = "15pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegam0").innerHTML, 201, 470);
	
	var text = 'Ω';
	context_1.font = "15pt Verdana";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 492);
	context_1.font = "8pt Verdana";
	context_1.fillText("r0", 175, 505);
	context_1.font = "15pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegar0").innerHTML, 201, 492);
	
	var text = 'Ω';
	context_1.font = "15pt Verdana";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 517);
	context_1.font = "8pt Verdana";
	context_1.fillText("Λ0", 175, 530);
	context_1.font = "15pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegarlambda0").innerHTML, 201, 517);
	
	var text = 'Ω';
	context_1.font = "15pt Verdana";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 542);
	context_1.font = "8pt Verdana";
	context_1.fillText("k0", 175, 555);
	context_1.font = "15pt Verdana";
	context_1.fillText("= "+document.getElementById("resultat_omegak0").innerHTML, 201, 542);
	
	var text = 'T';
	context_1.font = "15pt Verdana";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 567);
	context_1.font = "8pt Verdana";
	context_1.fillText("0", 175, 580);
	context_1.font = "15pt Verdana";
	context_1.fillText("(K) = "+t0, 201, 567);
	
	var text = 'H';
	context_1.font = "15pt Verdana";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 592);
	context_1.font = "8pt Verdana";
	context_1.fillText("0", 175, 605);
	context_1.font = "15pt Verdana";
	context_1.fillText("(Km.s^-1.Mpc^-1) = "+h0, 201, 592);
	
	var text = document.getElementById("resultat_ageunivers").innerHTML;
	context_1.font = "15pt Verdana";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 615);
	
	var text = document.getElementById("resultat_bigcrunch").innerHTML;
	context_1.font = "15pt Verdana";
	context_1.fillStyle = "black";
	context_1.fillText(text, 160, 635);
	
	var text = 'Cosmograve 2016';
	context_1.font = "8pt Verdana";
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
		canvas_1.toBlob(function(blob) {
			saveAs(blob, "Cosmograve.png");
		});
		}else{
		data = context_1.getImageData(0, 0, w, h);
		var compositeOperation = context_1.globalCompositeOperation;
		context_1.globalCompositeOperation = "destination-over";
		context_1.fillStyle = "white";
		context_1.fillRect(0,0,w,h);
		
		canvas_1.toBlob(function(blob) {
			saveAs(blob, "Cosmograve."+document.getElementById('type').options[document.getElementById('type').selectedIndex].text);
		}, "image/"+document.getElementById("type").options[document.getElementById('type').selectedIndex].text);
		
		context_1.clearRect (0,0,w,h);
		context_1.putImageData(data, 0,0);
		context.globalCompositeOperation = compositeOperation;
	}
};