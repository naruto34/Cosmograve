<!--

function FindPosition(oElement)
{
	if(typeof( oElement.offsetParent ) != "undefined")
	{
		for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
		{
			posX += oElement.offsetLeft;
			posY += oElement.offsetTop;
		}
		return [ posX, posY ];
	}
	else
	{
		return [ oElement.x, oElement.y ];
	}
}

function GetCoordinates(e)
{
	PosX = 0;
	PosY = 0;
	var ImgPos;
	ImgPos = FindPosition(myImg);
	if (!e) var e = window.event;
	if (e.pageX || e.pageY)
	{
		PosX = e.pageX;
		PosY = e.pageY;
	}
	else if (e.clientX || e.clientY)
	{
		PosX = e.clientX + document.body.scrollLeft
		+ document.documentElement.scrollLeft;
		PosY = e.clientY + document.body.scrollTop
		+ document.documentElement.scrollTop;
	}
	PosX = PosX - ImgPos[0];
	PosY = PosY - ImgPos[1];
	
	if(PosX < 53){
		PosX = 53;
		}else if(PosX > 283){
		PosX = 283;
	}
	
	if(PosY > 354){
		PosY = 354;
		}else if(PosY < 29){
		PosY = 29;
	}
	
	//alert(PosX+"	"+PosY);
	
	//update_modele();
	
	PosX -= 53;
	PosY -= 29;
	
	PosX = PosX*3/230;
	if(PosY >= 217){
		PosY -= 217;
		PosY = -PosY*4.5/325;
		}else{
		PosY = 217-PosY;
		PosY = PosY*4.5/325
	}
	PosX = PosX.toFixed(3);
	PosY = PosY.toFixed(3);
	
	document.getElementById("omegam0").value = PosX;
	document.getElementById("omegalambda0").value = PosY;
	
	calcul();
}

function update_point(){
	context.clearRect (0,0,largeur,hauteur);
	context.putImageData(image_fond_temp, 0,0);
	context.beginPath();
	context.fillStyle="#F00000"
	context.arc(PosX, PosY, 3, 0, 2 * Math.PI);
	context.fill();
}

function update_modele(){
	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');
	
	var zozor = new Image();
	
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(298, 0);
	context.lineTo(298, 400);
	context.lineTo(0, 400);
	context.closePath();
	context.fillStyle = "white";
	context.fill();
	
	context.beginPath();
	context.moveTo(53, 29);
	context.lineTo(283, 29);
	context.lineTo(283, 354);
	context.lineTo(53, 354);
	context.closePath();
	context.stroke();
	
	context.beginPath();
	context.moveTo(131, 354);
	context.lineTo(131, 344);
	context.closePath();
	context.stroke();
	
	var text = '1';
	context.font = "12pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text, 125, 362);
	
	context.beginPath();
	context.moveTo(207, 354);
	context.lineTo(207, 344);
	context.closePath();
	context.stroke();
	
	var text = '2';
	context.font = "12pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text,204,362);
	
	var text = '0';
	context.font = "12pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text, 47, 362);
	
	context.beginPath();
	context.moveTo(53, 247);
	context.lineTo(63, 247);
	context.closePath();
	context.stroke();
	
	var text = '0';
	context.font = "12pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text, 40, 240);
	
	context.beginPath();
	context.moveTo(53, 318);
	context.lineTo(63, 318);
	context.closePath();
	context.stroke();
	
	var text = '-1';
	context.font = "12pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text, 35, 312);
	
	context.beginPath();
	context.moveTo(53, 174);
	context.lineTo(63, 174);
	context.closePath();
	context.stroke();
	
	var text = '1';
	context.font = "12pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text, 40, 168);
	
	context.beginPath();
	context.moveTo(53, 101);
	context.lineTo(63, 101);
	context.closePath();
	context.stroke();
	
	var text = '2';
	context.font = "12pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text, 40, 95);
	
	var text = 'Ω';
	context.font = "23pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text,140,362);
	context.font = "16pt Verdana";
	context.fillText("m", 164,375);
	
	var text = 'Ω';
	context.font = "23pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text,10,172);
	context.font = "16pt Verdana";
	context.fillText("Λ", 32,185);
	
	context.save();
	var text = 'Pas de BB';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "blue";
	context.rotate(-0.8);
	context.translate(-80,60);
	context.fillText(text,55,45);
	context.fillText('Pas de BC',65,60);
	context.restore();
	
	context.save();
	var text = 'Fermé';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "red";
	context.rotate(0.7);
	context.translate(160,-180);
	context.fillText(text,210,270);
	context.restore();
	
	context.save();
	var text = 'Ouvert';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "red";
	context.rotate(0.7);
	context.translate(160,-180);
	context.fillText(text,110,300);
	context.restore();
	
	context.save();
	var text = 'Plat';
	context.font = "bold 8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "red";
	context.rotate(0.7);
	context.translate(160,-180);
	context.fillText(text,170,290);
	context.restore();
	
	Omo=53.;//abscisse de l'origine sur graphe canvas
	dtx=78;//un pas de 1 sur l'abscisse du graphe canvas 225
	dty=72; //un pas de 1 sur l'ordonnee du graphe canvas 112.5
	Olo=247;//ordonnee de l'origine sur graphe canvas 338
	
	context.save();
	context.beginPath();
	context.moveTo(53, 177);
	context.strokeStyle='red';
	for (Om=0;Om<3;Om=Om+0.5){
		OlCO=-Om+1.;
		x=Omo+Om*dtx; //conversion pour correspondre au canvas
		y=Olo-(OlCO*dty);  //conversion
		
		//alert(x+"	"+y);
		context.lineTo(x, y);
		
		
	}
	context.stroke();
	context.restore();
	
	context.save();
	context.beginPath();
	context.moveTo(53, 245);
	context.strokeStyle='green';
	Om=0.;
	OlER=0.;
	y=Olo;
	x=Omo;
	context.lineTo(x, y);
	Om=1.;
	u = 0;
	liste_valeur = [];
	while (Om<=2.95){
		u=1./3.*(Math.acos((1./Om)-1));
		OlER=4.*Om*Math.cos((u+(4./3.)*Math.PI))*Math.cos((u+(4./3.)*Math.PI))*Math.cos((u+(4./3.)*Math.PI));
		x=Omo+Om*dtx;
		y=Olo-(OlER*dty); 
		context.lineTo(x, y);
		Om=Om+0.01;
	}
	context.stroke();
	context.restore();
	
	context.save();
	context.beginPath();
	context.moveTo(53, 177);
	context.strokeStyle='blue';
	x=Omo;
	y=Olo-dty;
	context.lineTo(x, y);
	Om=0.01;
	w = 0;
	while (Om<=0.5){
		w=(1./3.)*Math.log(((1./Om)-1.)+Math.sqrt(((1./Om)-1.)*((1./Om)-1.)-1.0));
		OlER=4.*Om*cosh(w)*cosh(w)*cosh(w);
		x=Omo+Om*dtx;
		y=Olo-(OlER*dty);
		context.lineTo(x, y);
		Om=Om+0.01;
	}
	Om=0.5;
	v = 0;
	while (Om<=1.4){
		v =(1./3.)*Math.acos((1./Om)-1.) ;
		OlER=4.*Om*Math.cos(v)*Math.cos(v)*Math.cos(v);
		x=Omo+Om*dtx;
		y=Olo-(OlER*dty);
		context.lineTo(x, y);
		Om=Om+0.01;
	}
	context.stroke();
	context.restore();
	
	largeur = canvas.width;
	hauteur = canvas.height;
	image_fond = context.getImageData(0, 0, largeur, hauteur);
	
	omegam0 = Number(document.getElementById("omegam0").value);
	omegalambda0 = Number(document.getElementById("omegalambda0").value);
	
	PosX = 53+omegam0*230/3;
	PosY = 246;
	if(omegalambda0 >= 0){
		PosY += -omegalambda0*325/4.5;
		}else{
		PosY -= omegalambda0*325/4.5
	}
	
	context.save();
	var text = 'Big Bang';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "blue";
	context.rotate(-0.8);
	context.translate(-100,80);
	context.fillText(text,115,80);
	context.restore();
	
	var text = 'Pas de BC';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "green";
	context.fillText(text,140,220);
	
	var text = 'Big Crunch';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "green";
	context.fillText(text,170,260);
	
	image_fond_temp = context.getImageData(0, 0, largeur, hauteur);
	
	update_point();	
}

//-->