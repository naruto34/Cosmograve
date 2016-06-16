function fonction(x){
	return (-Or/(Math.pow(x,3))-(0.5)*omegam0/(Math.pow(x,2))+x*omegalambda0);
}

function valeurtest4(n, n2){ // 4 valeur test pour Runge-Kutta
	k[0]=fonction(n)*pas;
	j[0] = n2*pas;
	
	k[1]=fonction(n+j[0]/2)*pas;
	j[1] =(n2+k[0]/2)*pas;
	
	k[2]=fonction(n+j[1]/2)*pas;
	j[2] =(n2+k[1]/2)*pas;
	
	k[3]=fonction(n+j[2])*pas;
	j[3] =(n2+k[2])*pas;
}

function rungekutta(n){ // Fonction Runge-Kutta
	ymoinsrunge[1]=ymoinsrunge[0]+(1./6.)*(j[0]+2.*(j[1]+j[2])+j[3]);
	ymoinsrunge[0] = ymoinsrunge[1];
	ymoinsrungederiv[1]=ymoinsrungederiv[1]+(1./6.)*(k[0]+2.*(k[1]+k[2])+k[3]);
	ymoinsrungederiv[0] = ymoinsrungederiv[1];
	
	valeurtest4(ymoinsrunge[1], ymoinsrungederiv[1]);
	return ymoinsrunge[1];
}

function rungekutta_neg(n){ // Fonction Runge-Kutta
	ymoinsrunge[1]=ymoinsrunge[0]-(1./6.)*(j[0]+2.*(j[1]+j[2])+j[3]);
	ymoinsrunge[0] = ymoinsrunge[1];
	ymoinsrungederiv[1]=ymoinsrungederiv[1]-(1./6.)*(k[0]+2.*(k[1]+k[2])+k[3]);
	ymoinsrungederiv[0] = ymoinsrungederiv[1];
	
	valeurtest4(ymoinsrunge[1], ymoinsrungederiv[1]);
	return ymoinsrunge[1];
}