function calcul(){   // declaration de la fonction
	c = Number(document.getElementById("c").value);
	G = Number(document.getElementById("G").value);
	h = Number(document.getElementById("h").value);
	k = Number(document.getElementById("k").value);
	typeannee = document.getElementById("typeannee").value;
	
	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value;
	omegam0 = Number(document.getElementById("omegam0").value);
	omegalambda0 = Number(document.getElementById("omegalambda0").value);
	
	if(typeannee == "Sid�rale"){
		nbrjours = 365.256363051;
	}else if(typeannee == "Julienne"){
		nbrjours = 365.25;
	}else if(typeannee == "Tropique (2000)"){
		nbrjours = 365.242190517;
	}else{
		nbrjours = 365.2425;
	}
	
	//H0parGan = h0*1.02269032*Math.pow(10, -3);
	//H0parsec = h0/(3.085677581*Math.pow(10, 19));
	
	au = 149597870700;
	H0engannee = h0*1000/((au*(180*3600))/Math.PI*Math.pow(10, 6));
	H0parsec = H0engannee;
	H0engannee = H0engannee*(3600*24*nbrjours)*Math.pow(10, 9);
	
	Or = 0;
	if (document.getElementById("liste").options[2].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		//Or=(1.412171e-41)*Math.pow(t0,4)/(3*Math.pow(h0/(3.085678e19),2));
		Or=1.68*Or;
		Or = Or.toExponential();
		} else if (document.getElementById("liste").options[1].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		//Or=(1.412171e-41)*Math.pow(t0,4)/(3*Math.pow(h0/(3.085678e19),2));
		Or = Or.toExponential();
		} else {
	}
	//on s'occupe de changer la position du point sur le mod�le
	PosX = 53+omegam0*230/3;
	PosY = 246;
	if(omegalambda0 >= 0){
		PosY += -omegalambda0*325/4.5;
		}else{
		PosY -= omegalambda0*325/4.5
	}
	
	update_point();
	
	omegak0 = 1-Or-omegam0-omegalambda0;
	
	Or = parseFloat(Or).toFixed(10);
	omegak0 = omegak0.toFixed(10);
	
	//on reprend le calcul principale
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
	
	document.getElementById("resultat_omegam0").innerHTML = omegam0;
	document.getElementById("resultat_omegar0").innerHTML = Or;
	document.getElementById("resultat_omegarlambda0").innerHTML = omegalambda0;
	document.getElementById("resultat_omegak0").innerHTML = omegak0;
	
	age = simpson(0, 1e5, 1e6, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));
	age_afficher = Number(age.toFixed(6));
	
	if(age >= 0){
		document.getElementById("resultat_ageunivers").innerHTML = "Temps depuis le Big Bang = "+age_afficher+" Ga";
		}else{
		document.getElementById("resultat_ageunivers").innerHTML = "Pas de Big Bang";
		age = 0;
	}
	
	
	ymoinsrunge = [1,1]; //variable necessaire pour eviter une recurence longue
	ymoinsrungederiv = [1,1];
	k = [0,0,0,0];
	j = [0,0,0,0];
	pas = 0.001;
	
	m = 0;
	yrunge = 1;
	yrunge2 = 1;
	data = [];
	while (yrunge2 > 0 && yrunge2 < 5.){
		if(yrunge2<0.1){pas=Math.pow(10,-6);}
		yrunge2 = rungekutta_neg(m);
		data.push({date:age+m/H0engannee,close:yrunge2});
		m=m-pas;
	}
	
	data.reverse();
	i = 0;
	pas = 0.001;
	ymoinsrunge = [1,1]; //variable necessaire pour eviter une recurence longue
	ymoinsrungederiv = [1,1];
	k = [0,0,0,0];
	j = [0,0,0,0];
	if(omegam0 > 1){
	u_max=1./3.*(Math.acos((1./omegam0)-1));
	OlER_max=4.*omegam0*Math.cos((u_max+(4./3.)*Math.PI))*Math.cos((u_max+(4./3.)*Math.PI))*Math.cos((u_max+(4./3.)*Math.PI));
	}else{
		OlER_max = 0;
	}
	omegalambda0_bis = Number(omegalambda0);
	if(omegalambda0_bis < OlER_max){
		while (yrunge > -0.01 && yrunge < 50.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.1){pas=Math.pow(10,-6);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			data.push({date:age+i/H0engannee,close:yrunge});
			if(yrunge >= 50){alert("Univers avec Big Crunch, non calculer pour raison de stabiliter.")}
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
	
	if(age_afficher < 0){
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant le Big Crunch = "+Math.abs(age_afficher)+" Ga";
		document.getElementById("resultat_dureeuniv").innerHTML = "";
	}else if(yrunge <= 0.){
		tBC = i/H0engannee;
		tBC_afficher = Number(tBC.toFixed(2));
		total = Number((age_afficher+tBC_afficher).toFixed(2));
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant le Big Crunch = "+tBC_afficher+" Ga";
		document.getElementById("resultat_dureeuniv").innerHTML = (total)+" Ga";
		}else{
		document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
		document.getElementById("resultat_dureeuniv").innerHTML = "";
	}
	
	graphique_creation();
}