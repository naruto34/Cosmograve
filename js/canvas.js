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
	
	alert(PosX+"	"+PosY);
	
	update_modele();
	
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

function update_modele(){
	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');
	
	var zozor = new Image();
	zozor.src = './img/SCP2003SNeCMBClust-1.png'; // Image de 80x80 pixels
	
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(298, 0);
	context.lineTo(298, 400);
	context.lineTo(0, 400);
	context.closePath();
	context.fillStyle = "white";
	context.fill();
	//context.drawImage(zozor, 0, 0, 298, 400);
	
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
	
	context.beginPath();
	context.moveTo(207, 354);
	context.lineTo(207, 344);
	context.closePath();
	context.stroke();
	
	context.beginPath();
	context.moveTo(53, 247);
	context.lineTo(63, 247);
	context.closePath();
	context.stroke();
	
	context.beginPath();
	context.moveTo(53, 318);
	context.lineTo(63, 318);
	context.closePath();
	context.stroke();
	
	context.beginPath();
	context.moveTo(53, 174);
	context.lineTo(63, 174);
	context.closePath();
	context.stroke();
	
	context.beginPath();
	context.moveTo(53, 101);
	context.lineTo(63, 101);
	context.closePath();
	context.stroke();
	
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
	context.fillText(text,13,172);
	context.font = "16pt Verdana";
	context.fillText("λ", 35,185);
	
	var text = 'Pas de Big Bang';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text,55,50);
	
	var text = 'Fermé';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text,210,270);
	
	var text = 'Plat';
	context.font = "8pt Verdana";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillStyle = "black";
	context.fillText(text,170,290);
	
	context.beginPath();
	context.fillStyle="#F00000"
	context.arc(PosX, PosY, 4, 0, 2 * Math.PI);
	context.fill();
	
	Omo=53.;//abscisse de l'origine sur graphe canvas
	dtx=78;//un pas de 1 sur l'abscisse du graphe canvas 225
	dty=72; //un pas de 1 sur l'ordonnee du graphe canvas 112.5
	Olo=247;//ordonnee de l'origine sur graphe canvas 338
	
	context.beginPath();
	context.moveTo(53, 177);
	for (Om=0;Om<3;Om=Om+0.5){
		OlCO=-Om+1.;
		x=Omo+Om*dtx; //conversion pour correspondre au canvas
		y=Olo-(OlCO*dty);  //conversion
		
		//alert(x+"	"+y);
		context.lineTo(x, y);
		
		
	}
	context.stroke();
	
	context.beginPath();
	context.moveTo(53, 245);
	Om=0.;
	OlER=0.;
	y=Olo;
	x=Omo;
	context.lineTo(x, y);
	Om=1.;
	u = 0;
	while (Om<=3.){
		u=1./3.*(Math.acos((1./Om)-1));
		OlER=4.*Om*Math.cos((u+(4./3.)*Math.PI))*Math.cos((u+(4./3.)*Math.PI))*Math.cos((u+(4./3.)*Math.PI));
		x=Omo+Om*dtx;
		y=Olo-(OlER*dty); 
		context.lineTo(x, y);
		Om=Om+0.01;
	}
	context.stroke();
	
	context.beginPath();
	context.moveTo(53, 177);
	x=Omo;
	y=Olo-dty;
	context.lineTo(x, y);
	Om=0.01;
	w = 0;
	while (Om<=0.5){
		w=(1./3.)*Math.log(((1./Om)-1.)+Math.sqrt(((1./Om)-1.)*((1./Om)-1.)-1.0));
		OlER=4.*Om*Math.cosh(w)*Math.cosh(w)*Math.cosh(w);
		x=Omo+Om*dtx;
		y=Olo-(OlER*dty);
		context.lineTo(x, y);
		Om=Om+0.01;
	}
	Om=0.5;
	v = 0;
	while (Om<=1.5){
		v =(1./3.)*Math.acos((1./Om)-1.) ;
		OlER=4.*Om*Math.cos(v)*Math.cos(v)*Math.cos(v);
		x=Omo+Om*dtx;
		y=Olo-(OlER*dty);
		context.lineTo(x, y);
		Om=Om+0.01;
	}
	context.stroke();
}

//-->