function calcu(){
	//recuperation des valeurs
	c = Number(window.opener.document.getElementById("c").value);
	G = Number(window.opener.document.getElementById("G").value);
	h = Number(window.opener.document.getElementById("h").value);
	k = Number(window.opener.document.getElementById("k").value);
	typeannee = window.opener.document.getElementById("typeannee").value;
	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value; 
	omegam0 = Number(document.getElementById("omegam0").value);
	omegalambda0 = Number(document.getElementById("omegalambda0").value);
	omegalambda0 = omegalambda0.toExponential();
	Or = document.getElementById("resultat_omegar0").innerHTML;
	
	//definition du type d'annee
	if(typeannee == "Sidérale"){
		nbrjours = 365.256363051;
		}else if(typeannee == "Julienne"){
		nbrjours = 365.25;
		}else if(typeannee == "Tropique (2000)"){
		nbrjours = 365.242190517;
		}else{
		nbrjours = 365.2425;
	}
	
	//calcul de h0 par secondes et par gigaannees
	au = 149597870700;
	H0parsec = h0*1000/((au*(180*3600))/Math.PI*Math.pow(10, 6));
	H0parsec = H0parsec;
	H0engannee = H0parsec*(3600*24*nbrjours)*Math.pow(10, 9);
	
	//calcul de omegak
	omegak0 = 1-Or-omegam0-omegalambda0;
	
	//on recupere les valeurs de z1 et z2
	z1 = document.getElementById("z1").value;
	z2 = document.getElementById("z2").value;
	
	//voir si on le garde
	if(z1 == "inf"){
		z1 = 1e7;
	}
	if(z2 == "inf"){
		z2 = 1e7;
	}
	
	//détermine quelle formule sont utile pour la distance metrique, omegak positif 0 ou negatif
	if (omegak0>0){
		integ = Math.sqrt( Math.abs(omegak0)) * simpson(Number(z1), Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z1), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_2 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		dm=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ);
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_1);
		dm2=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_2);
		}else if (omegak0==0){
		dm=(c/(H0parsec) * simpson(Number(z1), Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or)));
		dm1=(c/(H0parsec) * simpson(0, Number(z1), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or)));
		dm2=(c/(H0parsec) * simpson(0, Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or)));
		}else{
		integ = Math.sqrt( Math.abs(omegak0)) * simpson(Number(z1), Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z1), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_2 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		dm=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ);
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_1);
		dm2=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_2);
	}
	
	//calcul de la distance du diametre apparent et distance lumiere
	dda=dm1/(1+z1);
	dl=dm*(1+(z2-z1));
	
	//agebetween = (1./H0engannee)*simpson(Number(z1), Number(z2), 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));
	tempsReception = (1./H0engannee)*simpson(0, Number(z2), 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));
	tempsEmission = (1./H0engannee)*simpson(0, Number(z1), 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));
	agebetween = tempsReception - tempsEmission;
	
	//les distances sont positives
	dm = Math.abs(dm);
	dm1 = Math.abs(dm1);
	dm2 = Math.abs(dm2);
	
	//on ajuste le nombre de decimale apres la virgule
	if(dm != 0){
		dm = dm.toPrecision(5);
	}
	if(dm1 != 0){
		dm1 = dm1.toPrecision(5);
	}
	if(dm2 != 0){
		dm2 = dm2.toPrecision(5);
	}
	if(agebetween != 0){
		agebetween = agebetween.toPrecision(9);
	}
	if(tempsReception != 0){
		tempsReception = tempsReception.toPrecision(9);
	}
	if(tempsEmission != 0){
		tempsEmission = tempsEmission.toPrecision(9);
	}
	
	//on change les champs pour informer l'utilisateur des resultats trouver
	document.getElementById("dm").innerHTML = dm;
	document.getElementById("dm1").innerHTML = dm1;
	document.getElementById("dm2").innerHTML = dm2;
	document.getElementById("agebetween").innerHTML = agebetween;
	document.getElementById("tempsReception").innerHTML = tempsReception;
	document.getElementById("tempsEmission").innerHTML = tempsEmission;
}