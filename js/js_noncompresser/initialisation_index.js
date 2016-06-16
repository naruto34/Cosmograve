//pour creer les onglets
$(function() {
	$("#tabs-a").tabs();
	$("#tabs-b").tabs();
	$( "#tabs" ).tabs();
});

//fait apparaitre le bouton avec la roue dentele
$(function() {
	$( "#para" ).button({
		icons: {
			primary: "ui-icon-gear"
		},
		text: false
	});
});

//pour adapter la fenetre
var largeur_fenetre = $(window).width();
var hauteur_fenetre = $(window).height();