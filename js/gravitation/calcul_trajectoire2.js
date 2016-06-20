function trajectoire() {

// Déclaration des variables.--------------------------------------------------------------//

/*	var r_init,A_init,x1part,y1part,x2part,y2part,x1obs,y1obs,x2obs,y2obs;
	var phi,k,j,phi2,k2,j2;
	var dtau,dt,rmax;	
	var gm,gmp,fm;
*/

// Affectation des variables.-------------------------------------------------------------//

//-------- Nos variables Globales ( de c à L) --------//
	c = 299792458;													
	G = 6.6742*Math.pow(10,-11);						
	r0 = Number(document.getElementById("r0").value);				
	vphi = Number(document.getElementById("vphi").value); 
	M = Number(document.getElementById("M").value);
	vr = Number(document.getElementById("vr").value); 
	m = G*M/Math.pow(c,2);
	L = vphi*r0/c;
	
//--------------------------------------------------------------------------------------//

//Cette Partie traite le calcul de la trajectoire de la particule, dans son référentiel propre, et aussi dans celui de l'observateur//
	

	phi = 0.0;
	phi2 = 0.0;
	temps_chute_libre = Math.PI*r0*Math.sqrt(r0/(2*G*M))/2;
	//dtau = (-Math.sqrt(Math.pow(vr,2)+Math.pow(vphi,2))+Math.sqrt(Math.pow(vr,2)+Math.pow(vphi,2)+2*9.81*r0))/100000;
	dtau = temps_chute_libre/1000;
	E = Math.sqrt(Math.pow(vr/c,2)+(1-2*m/r0)*(1+Math.pow(L/r0,2)));
	A_init = vr;
	r_init = r0;
	rayon_trouNoir = 2*m;
	rmax = eq3d(L,m,E);
	dr = rmax/1000;
	data1 = [];
	temps_particule = 0; 
	temps_observateur = 0;
	bool = true;
// Ici, les positions de départ de la particule, dans son référentiel et dans celui de l'observateur//
	
	if ( E > 1 ) { rmax=5*r0; }	

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
	//window.onload = function()
			
			//{
				
				var canvas = document.getElementById("myCanvas");
				
				if(!canvas)
				
				{
					
					alert("Impossible de récupérer le canvas");
					
					return;
					
				}
				
				
				
				var context = canvas.getContext("2d");
				
				if(!context)
				
				{
					
					alert("Impossible de récupérer le context");
					
					return;
					
				}

				/*if(document.getElementById("axe").checked == true) {
				
				context.beginPath();
				context.moveTo(0, canvas.height/2.0);
				context.lineTo(canvas.width, canvas.height/2);
				context.closePath();
				context.stroke();
				
				context.beginPath();
				context.moveTo(canvas.width/2, 0);
				context.lineTo(canvas.width/2, canvas.height);
				context.closePath();
				context.stroke();*/
				
				//}
				
				diametre_particule = 2;
				diametre_observateur = 2;
				
				// La position de départ est le milieu de la fenêtre d'affichage auquel on ajoute la position initiale de la particule.     
				
				posX1 = (canvas.width/2.0) + x1part;
				
				posY1 = (canvas.height/2.0) + y1part;

				posX2 = (canvas.width/2.0) + x1obs;
				
				posY2 = (canvas.height/2.0) + y1obs;

				posX3 = (canvas.width/2.0);
				
				posY3 = (canvas.height/2.0);
				
				

				

				// Ici on va créer l'animation avec setinerval, laquelle prend comme paramètres la fonction animate() définie ci-après et qui calcul les coordonnées de la particule à cahque instant.    
				
				myInterval = setInterval(animate,1000/300);
				
				
				
				function animate() {
					
					element = document.params.traj;
					
					if (element[1].checked) {
			
						diametre_particule = 10;
						diametre_observateur = 10;
						context.clearRect(0, 0, canvas.width, canvas.height);
					
					}
					
					
					
					//Tracé de la particule
					
					context.beginPath();

					context.fillStyle = '#008B8B';
					
					context.arc(posX1, posY1, diametre_particule/2, 0, Math.PI*2);

					context.lineWidth="1";
					
					context.fill();


					/*context.beginPath();

					context.fillStyle = '#FF7F50';
					
					context.arc(posX2, posY2, diametre_observateur/2, 0, Math.PI*2);
					
					context.fill();*/

				
					context.beginPath();

					context.fillStyle = '#FF0000';
					
					context.arc(posX3, posY3, rayon_trouNoir*canvas.width/rmax, 0, Math.PI*2);
					
					context.lineWidth="1";

					context.stroke();
					
					
					if(r0!=0.0) {
						
						document.getElementById('plusvite').addEventListener('click', function() {

						var nbClick = 0;
						var nbClickMax = 2;
						
						nbClick++;
						
						if (nbClick <= nbClickMax) {
							if (nbClick == 1) {
							dtau = temps_chute_libre/500;
							}
							else if (nbClick == nbClickMax) {
							dtau = temps_chute_libre/400;
							}
						}	 

					
			 			}, false);

						temps_particule += dtau;
						

						r_part = rungekutta(dtau);
						
						
						if(r_part < 0.0) {
							
							r_part = 0.0;
							
						}
						
						phi = phi + (c*L*dtau/Math.pow(r_part,2));
						
						posX1 = x2part = 200*r_part*Math.cos(phi)/rmax+canvas.width/2;
						posY1 = y2part = 200*r_part*Math.sin(phi)/rmax+canvas.height/2;
						
						dt = E*dtau*(1/(1-2*m/r_part));
						temps_observateur += dt;
						
						
						vrm=Math.pow(c*E,2)-Math.pow(c,2)*(1-2*m/r_part)*(1+Math.pow(L/r_part,2));
						vpm=Math.pow(c*L/r_part,2);
						vm=Math.sqrt(vrm+vpm);
						// Test en fonction de r à faire.
						// Si r plus petit que 10 metres plus de Warning.
						gm=-Math.pow(c,2)*(2*m/Math.pow(r_part,2)-2*Math.pow(L,2)/Math.pow(r_part,3)+6*m*Math.pow(L,2)/Math.pow(r_part,4))/2;
						gmp=-Math.pow(c,2)*(2*m/Math.pow(r_part+1,2)-2*Math.pow(L,2)/Math.pow(r_part+1,3)+6*m*Math.pow(L,2)/Math.pow(r_part+1,4))/2;
						fm=Math.abs(gm-gmp);

						// Ici le code pour l'alerte quand la gravité devient trop importante.
						
						
						
							
						clignotement = function(){

	   						if (document.getElementById('DivClignotante').style.visibility=='visible') {

		 						document.getElementById('DivClignotante').style.visibility='hidden';

							}
							
							else {
								
									document.getElementById('DivClignotante').style.visibility='visible';
									
							}
						}; 
							

					

						periode = setInterval(clignotement, 2000);

						

								
						//Ici le bout de code pour le bouton Reset, quand on clique dessus, la fonction appelé efface le canvas en entier.

						document.getElementById('clear').addEventListener('click', function() {

				
							context.clearRect(0, 0, canvas.width, canvas.height);
							arret();
							

			 			}, false);

						//vitesse_particule = r_part/dtau;

						//document.getElementById("to").innerHTML = temps_observateur.toExponential(4);
						document.getElementById("tp").innerHTML = temps_particule.toExponential(4);
						document.getElementById("vp").innerHTML = vm.toExponential(3);						
						document.getElementById("ga").innerHTML = fm.toExponential(3);
						document.getElementById("m").innerHTML = m.toExponential(3);
						document.getElementById("L").innerHTML = L.toExponential(3);
						document.getElementById("E").innerHTML = E.toExponential(3);

						//r_obs = rungekutta(dt);
						/*if(r_obs<0) {

							r_obs = 0;

						}*/

						/*if(Double.isNaN(r_obs)) {

							r_obs = 0;

						}
						
						
						phi2 = phi2 + (c*L*dt/Math.pow(r_obs,2));
		
						x2obs = 190*r_obs*Math.cos(phi2)/rmax;
						y2obs = 190*r_obs*Math.sin(phi2)/rmax;
					
						posX2 = x2obs = 200*r_obs*Math.cos(phi2)/rmax+canvas.width/2;
						posY2 = y2obs = 200*r_obs*Math.sin(phi2)/rmax+canvas.width/2; */

						if(r_part > rmax*1.1) { 
								
							alert("La Particule sort du champ gravitationnel du corps attractif");
							arret(); 

						}

						/*if(r_obs < rayon_trouNoir) { 
							
							arret();

						}*/

					}
					
			 
					
				}

				


for(r=rayon_trouNoir;r<rmax*1.1;r+=dr) {

	
		V=(1-(2*m)/r)*(1+Math.pow(L/r,2))/c*c; 
		data1.push({date:r,close:V}); 
		
							}

graphique_creation_pot();


}




	
