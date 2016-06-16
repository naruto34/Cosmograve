//reecrit une partie du canvas des generatrices pour hsup0 ou hmoins0
$( "#H0" ).change(function() {
	context.clearRect (0,0,largeur,hauteur);
	context.putImageData(image_fond, 0,0);
	
	context.save();
	if($( "#H0" ).val() >= 0){
		var text = 'Big Bang';
		}else{
		var text = 'Big Crunch';
	}
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "blue";
	context.rotate(-0.8);
	context.translate(-100,80);
	context.fillText(text,115,80);
	context.restore();
	
	if($( "#H0" ).val() >= 0){
		var text = 'Pas de BC';
		}else{
		var text = 'Big Crunch';
	}
	context.fillStyle = "green";
	context.fillText(text,140,220);
	
	if($( "#H0" ).val() >= 0){
		var text = 'Big Crunch';
		}else{
		var text = 'Pas de BC';
	}
	context.fillStyle = "green";
	context.fillText(text,170,260);
	
	if($( "#H0" ).val() < 0){
		var text = 'H0 < 0';
		context.fillStyle = "red";
		context.fillText(text, 15, 15);
	}
	
	image_fond_temp = context.getImageData(0, 0, largeur, hauteur);
	
	update_point();
});