function arret() {
	pause = true;
	clearInterval(myInterval);
}
function pau(){
	pause = false;
	if (typeof myInterval !== 'undefined') {
		clearInterval(myInterval);
	}
}