function integrale(borneInf, borneSup, nbreInterval, callback, omegam0, omegalambda0, Or){
	var i = 0;
	var sommeInf = 0;
	var sommeSup = 0;
	var somme = 0;
	var interval = (borneSup - borneInf) / nbreInterval;
	for ( i = 0; i < nbreInterval; i++)
	{
		sommeInf += callback(borneInf + i * interval, omegam0, omegalambda0, Or) * interval;
	}
	for ( i = 1; i < nbreInterval + 1; i++)
	{
		sommeSup += callback(borneInf + i * interval, omegam0, omegalambda0, Or) * interval;
	}
	somme = (sommeInf + sommeSup) / 2;
	return somme;
}

function fonction_integrale(x, omegam0, omegalambda0, Or){
	return (1./H0parGan)*(1./(1.+x)) * Math.pow(Or*Math.pow(1.+x, 4) + omegam0*Math.pow(1.+x, 3) - (omegalambda0 + Or + omegam0 - 1.)*Math.pow(1.+x, 2) + omegalambda0, -1./2);
}

function fonction_dm(x, omegam0, omegalambda0, Or){
	return 1./Math.pow((Or*Math.pow((1.+x),4)+omegam0*Math.pow((1+x),3)+(1-Or-omegam0-omegalambda0)*Math.pow((1+x),2)+omegalambda0),(1./2.));
}

function simpson(a, b, n, f, omegam0, omegalambda0, Or){
    S = 0;
	somme1 = 0.0;
	somme2 = 0.0;
	h = (b-a)/n;
	
	xk1 = a+h;
	xk2 = a+2.0*h;
	
    for (i=1; i< n-2; i+=2){
        somme1+=f(xk1, omegam0, omegalambda0, Or);
        somme2+=f(xk2, omegam0, omegalambda0, Or);
        xk1+=2.0*h;
        xk2+=2.0*h;
	}
	somme1+=f(xk1, omegam0, omegalambda0, Or);
	S=(h/3.0) * ( f(a, omegam0, omegalambda0, Or) + 4.0*somme1 + 2.0*somme2 + f(b, omegam0, omegalambda0, Or));
	
    return S;
}