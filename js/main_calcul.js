function calcul(){   // fonction principale de cosmograve
	//on recupere les valeurs des variables
	c = Number(document.getElementById("c").value);
	G = Number(document.getElementById("G").value);
	h = Number(document.getElementById("h").value);
	k = Number(document.getElementById("k").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	
	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value;
	omegam0 = Number(document.getElementById("omegam0").value);
	omegalambda0 = Number(document.getElementById("omegalambda0").value);
	
	//on recupere le bon nombre de jour par an.
	if(typeannee == "Sidérale"){
		nbrjours = 365.256363051;
	}else if(typeannee == "Julienne"){
		nbrjours = 365.25;
	}else if(typeannee == "Tropique (2000)"){
		nbrjours = 365.242190517;
	}else{
		nbrjours = 365.2425;
	}
	
	//calcule des h0 par seconde par anneee et par gigaannee
	au = 149597870700;
	H0parsec = h0*1000/((au*(180*3600))/Math.PI*Math.pow(10, 6));
	H0enannee = H0parsec*(3600*24*nbrjours);
	H0engannee = H0parsec*(3600*24*nbrjours)*Math.pow(10, 9);
	
	//on calcule omegar si besoin
	Or = 0;
	if (document.getElementById("liste").options[2].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		Or=1.68*Or;
		Or = Or.toExponential();
		} else if (document.getElementById("liste").options[1].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		Or = Or.toExponential();
		} else {
	}
	//on s'occupe de changer la position du point sur le modèle
	PosX = 53+omegam0*230/3;
	PosY = 246;
	if(omegalambda0 >= 0){
		PosY += -omegalambda0*325/4.5;
		}else{
		PosY -= omegalambda0*325/4.5
	}
	update_point();
	
	//on calcule omegak
	omegak0 = 1-Or-omegam0-omegalambda0;
	
	Or = parseFloat(Or).toFixed(10);
	omegak0 = omegak0.toFixed(10);
	
	//donne les variables sous forme d'exposant si differente de 0
	if(omegalambda0 != 0){
		omegalambda0 = omegalambda0.toExponential();
	}
	if(omegak0 != 0){
		omegak0 = parseFloat(omegak0).toExponential();
		}else{
		omegak0 = 0;
	}
	if(Or != 0){
		Or = parseFloat(Or).toExponential();
		}else{
		Or = 0;
	}
	
	//affiche les imformations sur les paramètres cosmologique de la simulation
	document.getElementById("resultat_omegam0").innerHTML = omegam0;
	document.getElementById("resultat_omegar0").innerHTML = Or;
	document.getElementById("resultat_omegarlambda0").innerHTML = omegalambda0;
	document.getElementById("resultat_omegak0").innerHTML = omegak0;
	
	//calcul de l'age de l'univers
	age_sec = simpson(0, 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));
	age_sec = age_sec*(1./H0parsec);
	//on le passe en gigaannees
	age = age_sec/((3600*24*nbrjours)*Math.pow(10, 9));
	//on creer une variable limite en nombre de decimal pour l'affichage
	age_afficher = Number(age).toExponential(nbr_precision);
	age_sec_afficher = Number(age_sec).toExponential(nbr_precision);
	
	//on réinitialise les 3 champs pour eviter les erreurs d'affichage
	document.getElementById("resultat_ageunivers").innerHTML = "Pas de Big Bang";
	document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
	document.getElementById("resultat_dureeuniv").innerHTML = "";
	
	if(age >= 0){
		document.getElementById("resultat_ageunivers").innerHTML = "\302ge de l'univers = "+age_afficher+" Ga = "+age_sec_afficher+" s";
	}else{
		document.getElementById("resultat_ageunivers").innerHTML = "Pas de Big Bang";
		age = 0;
	}
	
	//on fait appel a la methode de rungekutta pour calculer les points de la courbe
	ymoinsrunge = [1,1];
	ymoinsrungederiv = [1,1];
	k = [0,0,0,0];
	j = [0,0,0,0];
	pas = 0.0001;
	m = 0;
	yrunge = 1;
	yrunge2 = 1;
	data = [];
	while (yrunge2 > 0 && yrunge2 < 5.){
		if(yrunge2<0.1){pas=Math.pow(10,-6);}
		yrunge2 = rungekutta_neg(m);
		ymoinsrunge[0] = ymoinsrunge[1];
		ymoinsrungederiv[0] = ymoinsrungederiv[1];
		data.push({date:age+m/H0engannee,close:yrunge2});
		m=m-pas;
	}
	data.reverse();
	
	//on refait appel à rungekutta pour la deuxieme partie
	i = 0;
	pas = 0.00001;
	ymoinsrunge = [1,1];
	ymoinsrungederiv = [1,1];
	k = [0,0,0,0];
	j = [0,0,0,0];
	//permet de recuperer la valeur de la generatrice
	if(omegam0 > 1){
	u_max=1./3.*(Math.acos((1./omegam0)-1));
	OlER_max=4.*omegam0*Math.cos((u_max+(4./3.)*Math.PI))*Math.cos((u_max+(4./3.)*Math.PI))*Math.cos((u_max+(4./3.)*Math.PI));
	}else{
		OlER_max = 0;
	}
	omegalambda0_bis = Number(omegalambda0);
	//suite rungekutta avec rajout du cas ou l'on serait sur la generatrice
	if(omegalambda0_bis < OlER_max){
		while (yrunge > -0.01 && yrunge < 50.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.25){pas=Math.pow(10,-6);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			data.push({date:age+i/H0engannee,close:yrunge});
			if(yrunge >= 50){alert("Univers avec Big Crunch, non calculer enti\350rement pour raison de stabilit\351.")}
			i=i+pas;
		}
		}else if(omegalambda0_bis == OlER_max){
			while (yrunge > -0.01 && yrunge < 5.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.1){pas=Math.pow(10,-6);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			data.push({date:age+i/H0engannee,close:yrunge});
			i=i+pas;
		}
			alert("Infiniment d\351rivable, Big Crunch sur un temps infini");
		}else{
		while (yrunge > -0.01 && yrunge < 5.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.1){pas=Math.pow(10,-6);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			data.push({date:age+i/H0engannee,close:yrunge});
			i=i+pas;
		}
	}
	
	//alert(yrunge+"	"+yrunge2+"	"+age_afficher+"	"+(h0<0));
	//Om=omegam0;
	//v =(1./3.)*Math.acos((1./Om)-1.);
	//OlER=4.*Om*Math.cos(v)*Math.cos(v)*Math.cos(v);
	//alert(OlER);
	
	//liste les differents cas pour afficher a l'utilisateur les informations
	if(age_afficher < 0){
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant le Big Crunch = "+Math.abs(age_afficher)+" Ga";
	}else if(yrunge <= 0.){
		tBC = i/H0engannee;
		tBC_afficher = Number(tBC).toExponential(nbr_precision);
		total = (Number(age_afficher)+Number(tBC_afficher)).toExponential(nbr_precision);
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant le Big Crunch = "+tBC_afficher+" Ga";
		document.getElementById("resultat_dureeuniv").innerHTML = (total)+" Ga";
	}else if(h0<0 && yrunge2 <= 0.){
		document.getElementById("resultat_bigcrunch").innerHTML = "Big Crunch &agrave; calculer";
	}else{
		document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
	}
	
	//on creer le graphique
	graphique_creation();
}