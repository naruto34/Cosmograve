//change la valeur de omegalambda0 si univers plat avec omegar0 ou prise en compte radiation...
$( "#omegam0, #univ_plat, #liste" ).change(function() {
	if(true == document.getElementById("univ_plat").checked){
		Or_pre = 0;
		c = Number(document.getElementById("c").value);
		G = Number(document.getElementById("G").value);
		h = Number(document.getElementById("h").value);
		k = Number(document.getElementById("k").value);
		//si besoin calcul omegar0
		if (document.getElementById("liste").options[2].selected) {
			sigma_pre = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
			rho_r_pre = (4*sigma_pre*Math.pow(t0, 4))/(Math.pow(c, 3));
			Or_pre =(8*Math.PI*G*rho_r_pre)/(3*Math.pow(H0parsec, 2));
			Or_pre=1.68*Or_pre;
			} else if (document.getElementById("liste").options[1].selected) {
			sigma_pre = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
			rho_r_pre = (4*sigma_pre*Math.pow(t0, 4))/(Math.pow(c, 3));
			Or_pre =(8*Math.PI*G*rho_r_pre)/(3*Math.pow(H0parsec, 2));
			} else {
		}
		document.getElementById("omegalambda0").value = 1 - Number(document.getElementById("omegam0").value) - Number(Or_pre);
		update_point();
	}
});

//change omegar0 si univers plat avec un changement de omegalambda0
$( "#omegalambda0" ).change(function() {
	if(true == document.getElementById("univ_plat").checked){
		Or_pre = 0;
		c = Number(document.getElementById("c").value);
		G = Number(document.getElementById("G").value);
		h = Number(document.getElementById("h").value);
		k = Number(document.getElementById("k").value);
		if (document.getElementById("liste").options[2].selected) {
			sigma_pre = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
			rho_r_pre = (4*sigma_pre*Math.pow(t0, 4))/(Math.pow(c, 3));
			Or_pre =(8*Math.PI*G*rho_r_pre)/(3*Math.pow(H0parsec, 2));
			Or_pre=1.68*Or_pre;
			} else if (document.getElementById("liste").options[1].selected) {
			sigma_pre = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
			rho_r_pre = (4*sigma_pre*Math.pow(t0, 4))/(Math.pow(c, 3));
			Or_pre =(8*Math.PI*G*rho_r_pre)/(3*Math.pow(H0parsec, 2));
			} else {
		}
		document.getElementById("omegam0").value = 1 - Number(document.getElementById("omegalambda0").value) - Or_pre;
	}
});