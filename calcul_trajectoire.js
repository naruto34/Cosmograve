function trajectoire() {

// Déclaration des variables.--------------------------------------------------------------//

	var c,G,r0,vphi,vr,M,m,L;
	var r_part,A_part,r_obs,A_obs,x1part,y1part,x2part,y2part,x1obs,y1obs,x2obs,y2obs;
	var phi,k,j,phi2,k2,j2;
	var dtau,dt,rmax;	
	var gm,gmp,fm;

// Affectation des variables.-------------------------------------------------------------//

//-------- Nos variables Globales ( de c à L) --------//
	c = 299792458;													
	G = 6.6742*Math.pow(10,-11);						
	r0 = Number(document.getElementById("r0").value);				
	vphi = Number(document.getElementById("vphi").value) ; 
	M = Number(document.getElementById("M").value);
	vr = Number(document.getElementById("vr").value); 
	m = G*M/Math.pow(c,2);
	L = vphi*r0/c;
//--------------------------------------------------------------------------------------//

//Cette Partie traite le calcul de la trajectoire de la particule, dans son référentiel propre, et aussi dans celui de l'observateur//


	phi = 0.0;
	phi2 = 0.0;
	rmax = eq3d(L,m,E);
	dtau = (-Math.sqrt(Math.pow(vr,2)+Math.pow(vphi,2))+Math.sqrt(Math.pow(vr,2)+Math.pow(vphi,2)+2*9.81*r0))/100000;
	E = Math.sqrt(Math.pow(vr/c,2)+(1-2*m/r0)*(1+Math.pow(L/r0,2)));
	A_part = vr;
	A_obs = vr;
	r_part = r0;
	r_obs = r0;
	
// Ici, les positions de départ de la particule, dans son référentiel et dans celui de l'observateur//

	x1part=190*r0*Math.cos(phi)/rmax;
	y1part=190*r0*Math.sin(phi)/rmax;
	x1obs=190*r0*Math.cos(phi)/rmax;
	y1obs=190*r0*Math.sin(phi)/rmax;	   

									    
	k=[0,0,0,0];
	j=[0,0,0,0];
	k2=[0,0,0,0];
	j2=[0,0,0,0];	


/*
	L'enjeu ici est donc de calculer pour chaque itérations les coordonnées de la particule x2_part y2_part, x2_obs y2_obs 
 	on a donc d'abord besoin de calculer r_part et r_obs par Runge-Kutta, puis d'en déduire le calucl de phi et phi2, le
	tout nous permettra donc de calculer x2 et y2 et les autres paramètres comme la force de marée en chaque point de la trajectoire
																																		*/
	
	if(r0!=0.0) {

		r_part = rungekutta1(dtau);

		if(r_part < 0.0) {
            
			r_part = 0.0;

						 }

		phi = phi + (c*L*dtau/Math.pow(r_part,2));
		
		x2_part = 190*r_part*Math.cos(phi)/rmax;
		y2_part = 190*r_part*Math.sin(phi)/rmax;

		dt = Math.abs(E*dtau/(1+2*m/r_part));
		
		r_obs = rungekutta(dt);
		
		if(r_obs < 0.0) {

			r_obs = 0.0;

						}

		phi2 = phi2 + (c*L*dt/Math.pow(r_obs,2));
		
		x2_obs = 190*r_obs*Math.cos(phi2)/rmax;
		y2_obs = 190*r_obs*Math.sin(phi2)/rmax;

		A_part = rungekutta2(dtau);
		A_obs = rungekutta2(dtau);

		x1_part = x2_part;
		y1_part = y2_part;
		x1_obs = x2_obs;
		y1_obs = y2_obs;

		gm = (1/2)*fonction(r_part);
		gmp = (1/2)*foncion(r_part + 1);
		fm = Math.abs(gm-gmp);


			

	}






	
