function calcul(){   // declaration de la fonction
	c = 299792458;
	G = 6.67384*Math.pow(10, -11);
	
	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value; 
	omegam0 = Number(document.getElementById("omegam0").value);
	omegalambda0 = Number(document.getElementById("omegalambda0").value);
	
	H0parGan = 0;
	Or = 0;
	if (document.getElementById("liste").options[2].selected) {
		Or=(1.412171e-41)*Math.pow(t0,4)/(3*Math.pow(h0/(3.085678e19),2));
		Or=1.68*Or;
		Or = Or.toExponential();
		} else if (document.getElementById("liste").options[1].selected) {
		Or=(1.412171e-41)*Math.pow(t0,4)/(3*Math.pow(h0/(3.085678e19),2));
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
	
	update_modele();
	
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
	
	document.getElementById("resultat_omegar0").innerHTML = Or;
	document.getElementById("resultat_omegarlambda0").innerHTML = omegalambda0;
	document.getElementById("resultat_omegak0").innerHTML = omegak0;
	
	H0parGan = h0*1.02269032*Math.pow(10, -3);
	
	age = simpson(0, 1e5, 1e6, fonction_integrale, omegam0, Number(omegalambda0), Number(Or));
	
	if(age >= 0){
		document.getElementById("resultat_ageunivers").innerHTML = "Temps depuis le Big Bang = "+age+" Ga";
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
data.push({date:age+m/H0parGan,close:yrunge2});
m=m-pas;
}

data.reverse();
i = 0;
pas = 0.001;
ymoinsrunge = [1,1]; //variable necessaire pour eviter une recurence longue
ymoinsrungederiv = [1,1];
k = [0,0,0,0];
j = [0,0,0,0];
while (yrunge > -0.01 && yrunge < 5.){ // permet de boucler sur une veleur de reference
if(yrunge<0.1){pas=Math.pow(10,-6);}
yrunge = rungekutta(i); //position f(x) Runge-Kutta
data.push({date:age+i/H0parGan,close:yrunge});
i=i+pas;
}

if(yrunge <= 0.){
tBC = i/H0parGan;
document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant le Big Crunch = "+tBC+" Ga";
document.getElementById("resultat_dureeuniv").innerHTML = (age+tBC)+" Ga";
}else{
document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
document.getElementById("resultat_dureeuniv").innerHTML = "";
}

graphique_creation();
}