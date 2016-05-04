function formreturn(isValid){
	if (isValid) {
		window.opener.document.getElementById('parametres').submit();
	}
 
	window.close();
}
 