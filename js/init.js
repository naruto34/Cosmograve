function init(){
		getData();
}

function getData(){
   document.getElementById("T0").innerHTML = window.opener.document.getElementById('T0').value;
   document.getElementById("H0").innerHTML = window.opener.document.getElementById('H0').value;
   document.getElementById("omegam0").innerHTML = window.opener.document.getElementById('omegam0').value;
   document.getElementById("omegalambda0").innerHTML = window.opener.document.getElementById('omegalambda0').value;
   document.getElementById("type").innerHTML = window.opener.document.getElementById("liste").value;
   
   document.getElementById("T0").value = window.opener.document.getElementById('T0').value;
   document.getElementById("H0").value = window.opener.document.getElementById('H0').value;
   document.getElementById("omegam0").value = window.opener.document.getElementById('omegam0').value;
   document.getElementById("omegalambda0").value = window.opener.document.getElementById('omegalambda0').value;
}