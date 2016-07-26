function calcu(){
	//recuperation des valeurs
	c = Number(document.getElementById("c").value);
	G = Number(document.getElementById("G").value);
	h = Number(document.getElementById("h").value);
	k = Number(document.getElementById("k").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	t0 = document.getElementById("T0_annexes").value;
	h0 = document.getElementById("H0_annexes").value; 
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	omegalambda0 = Number(document.getElementById("omegalambda0_annexes").value);
	omegalambda0 = omegalambda0.toExponential();
	Or = document.getElementById("resultat_omegar0_annexes").innerHTML;
	
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
	H0enannee = H0parsec*(3600*24*nbrjours);
	H0engannee = H0enannee*Math.pow(10, 9);
	
	//calcul de omegak
	omegak0 = 1-Or-omegam0-omegalambda0;
	
	//on recupere les valeurs de z1 et z2
	z1 = document.getElementById("z1").value;
	z2 = document.getElementById("z2").value;
	
	//voir si on le garde
	if(z1 == "inf"){
		z1 = 5e6;//<----------------------------------------------------------
	}
	if(z2 == "inf"){
		z2 = 5e6;//<-------------------------------------------------
	}
	
	//détermine quelle formule sont utile pour la distance metrique, omegak positif 0 ou negatif
	if (omegak0>0){
		//integ = Math.sqrt( Math.abs(omegak0)) * simpson(Number(z1), Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z1), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_2 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		//dm=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ);
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_1);
		dm2=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_2);
		}else if (omegak0==0){
		//dm=(c/(H0parsec) * simpson(Number(z1), Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or)));
		dm1=(c/(H0parsec) * simpson(0, Number(z1), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or)));
		dm2=(c/(H0parsec) * simpson(0, Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or)));
		}else{
		//integ = Math.sqrt( Math.abs(omegak0)) * simpson(Number(z1), Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z1), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		integ_2 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(z2), 1e8, fonction_dm, omegam0, Number(omegalambda0), Number(Or));
		//dm=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ);
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_1);
		dm2=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_2);
	}
	
	dm = dm2 - dm1;
	//calcul de la distance du diametre apparent et distance lumiere
	dda=dm1/(1+z1);
	dl=dm*(1+(z2-z1));
	
	//agebetween = (1./H0engannee)*simpson(Number(z1), Number(z2), 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));
	
      
        //on regarde si on est dans la région no big bang
	w = 0;
	v = 0;
	Om0=1./omegam0-1.;
	
	if(omegam0 <= 0.5){
		w=(1./3.)*Math.log(Om0+Math.sqrt(Om0*Om0-1.0));
		Olambdalim=4.*omegam0*Math.cosh(w)*Math.cosh(w)*Math.cosh(w);
	}else{
		v =(1./3.)*Math.acos(Om0);
		Olambdalim=4.*omegam0*Math.cos(v)*Math.cos(v)*Math.cos(v);
	                  }



        if(Or > 0)      { 

        if(z2 <= 5e6){  
                     if(omegalambda0 >= Olambdalim) {
                     tempsReception = simpson(0, z2, 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or)) ;//<-----------------------------
                     }else{
		     tempsReception = simpson(Number(z2), 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or))+(1/(Math.pow(Or, 1/2)))*(1/(2*Math.pow(5e6, 2)))   };//<-----------------------
	}else{
                     if(omegalambda0 >= Olambdalim) {
                     tempsReception = simpson(0, 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or))+0.5*(1/(Math.pow(Or, 1/2)))*(1/Math.pow(5e6,2)-1/Math.pow(z2,2));//<-----------------------------
                     }else{
          	     tempsReception = (1/(Math.pow(Or, 1/2)))*(1/(2*Math.pow(z2, 2)))   };//<------------------------------
	}
	


        if(z1 <= 5e6){  
                     if(omegalambda0 >= Olambdalim) {
                     tempsEmission = simpson(0, z1, 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));//<-----------------------------
                     }else{
		     tempsEmission = simpson(Number(z1), 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or))+(1/(Math.pow(Or, 1/2)))*(1/(2*Math.pow(5e6, 2)))   };//<-----------------------
	}else{
                     if(omegalambda0 >= Olambdalim) {
                     tempsEmission = simpson(0, 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), Number(Or))+0.5*(1/(Math.pow(Or, 1/2)))*(1/Math.pow(5e6,2)-1/Math.pow(z1,2));//<-----------------------------
                     }else{
          	     tempsEmission = (1/(Math.pow(Or, 1/2)))*(1/(2*Math.pow(z1, 2)))   };//<------------------------------
	}

                        }
 


       if(Or == 0 && omegam0 != 0)      {  

        if(z2 <= 5e6){
		tempsReception = simpson(Number(z2), 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), 0.)+(1/(Math.pow(omegam0, 1/2)))*(2/(3*Math.pow(5e6, 3/2)));//<-----------------------
	}else{
		tempsReception = (1/(Math.pow(omegam0, 1/2)))*(2/(3*Math.pow(z2, 3/2)));//<------------------------------
	}
	if(z1 <= 5e6){
		tempsEmission = simpson(Number(z1), 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), 0.)+(1/(Math.pow(omegam0, 1/2)))*(2/(3*Math.pow(5e6, 3/2)));//<--------------------------
	}else{
		tempsEmission = (1/(Math.pow(omegam0, 1/2)))*(2/(3*Math.pow(z1, 3/2)));//<---------------------------------------
	}
                      }

     

        if(Or == 0 && omegam0== 0 && omegak0 != 0)      {  

        if(z2 <= 5e6){
		tempsReception = simpson(Number(z2), 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), 0.)+1/(Math.pow(omegak0, 1/2)*5e6);//<-----------------------
	}else{
		tempsReception = 1/(Math.pow(omegak0, 1/2)*z2);//<------------------------------
	}
	if(z1 <= 5e6){
		tempsEmission = simpson(Number(z1), 5e6, 1e8, fonction_integrale, omegam0, Number(omegalambda0), 0.)+1/(Math.pow(omegak0, 1/2)*5e6);//<--------------------------
	}else{
		tempsEmission = 1/(Math.pow(omegak0, 1/2)*z1);//<---------------------------------------
	}
                      }
					  
					  
	if(Or == 0 && omegam0== 0 && omegak0 == 0)      {  

       			tempsReception =Math.log(1+z2)/Math.pow(omegalambda0, 1/2) ;//<------------------------------
			    tempsEmission = Math.log(1+z1)/Math.pow(omegalambda0, 1/2);//<---------------------------------------
	            }				  



	tempsReception_sec = (1./H0parsec)*tempsReception;//<--------------------------
	tempsEmission_sec = (1./H0parsec)*tempsEmission;//<-----------------------
	
	tempsReception = (1./H0enannee)*tempsReception;//<-------------------------
	tempsEmission = (1./H0enannee)*tempsEmission;//<--------------------------
	
	agebetween = tempsReception - tempsEmission;
	agebetween_sec = tempsReception_sec - tempsEmission_sec;
	
	





//les distances sont positives
	dm = Math.abs(dm);
	dm1 = Math.abs(dm1);
	dm2 = Math.abs(dm2);
	
	dm_pc = dm*3.2407557442396*Math.pow(10,-17);
	dm1_pc = dm1*3.2407557442396*Math.pow(10,-17);
	dm2_pc = dm2*3.2407557442396*Math.pow(10,-17);
	
	//on ajuste le nombre de decimale apres la virgule
	if(dm != 0){
		dm = dm.toExponential(nbr_precision);
	}
	if(dm1 != 0){
		dm1 = dm1.toExponential(nbr_precision);
	}
	if(dm2 != 0){
		dm2 = dm2.toExponential(nbr_precision);
	}
	
	if(dm_pc != 0){
		dm_pc = dm_pc.toExponential(4);
	}
	if(dm1_pc != 0){
		dm1_pc = dm1_pc.toExponential(4);
	}
	if(dm2_pc != 0){
		dm2_pc = dm2_pc.toExponential(4);
	}
	
	if(agebetween != 0){
		agebetween = agebetween.toExponential(nbr_precision);
	}
	if(tempsReception != 0){
		tempsReception = tempsReception.toExponential(nbr_precision);
	}
	if(tempsEmission != 0){
		tempsEmission = tempsEmission.toExponential(nbr_precision);
	}
	if(agebetween_sec != 0){
		agebetween_sec = agebetween_sec.toExponential(nbr_precision);
	}
	if(tempsReception_sec != 0){
		tempsReception_sec = tempsReception_sec.toExponential(nbr_precision);
	}
	if(tempsEmission_sec != 0){
		tempsEmission_sec = tempsEmission_sec.toExponential(nbr_precision);
	}
	
	//on change les champs pour informer l'utilisateur des resultats trouver
	document.getElementById("dm").innerHTML = dm;
	document.getElementById("dm1").innerHTML = dm1;
	document.getElementById("dm2").innerHTML = dm2;
	document.getElementById("dm_pc").innerHTML = dm_pc;
	document.getElementById("dm1_pc").innerHTML = dm1_pc;
	document.getElementById("dm2_pc").innerHTML = dm2_pc;
	document.getElementById("agebetween").innerHTML = agebetween;
	document.getElementById("tempsReception").innerHTML = tempsReception;
	document.getElementById("tempsEmission").innerHTML = tempsEmission;
	document.getElementById("agebetween_sec").innerHTML = agebetween_sec;
	document.getElementById("tempsReception_sec").innerHTML = tempsReception_sec;
	document.getElementById("tempsEmission_sec").innerHTML = tempsEmission_sec;
}