$("#menusBackground").css("display", "");
$("#hud").css("display", "none");
$("#menuPrincipal").css("display", "");
$("#menuOpciones").css("display", "none");
$("#menuPuntuaciones").css("display", "none");
$("#menuCreditos").css("display", "none");
$("#menuPausa").css("display", "none");
$("#hudGame").css("display", "none");
$("#hudGame").css("display", "none");

$(".idiomaESP").css("display", "");
$(".idiomaING").css("display", "none");


//Funcionalidad idiomas
$("#idiomaESPbtn").click(function () {
  $(".idiomaESP").css("display", "");
  $(".idiomaING").css("display", "none");
});

$("#idiomaINGbtn").click(function () {
  $(".idiomaESP").css("display", "none");
  $(".idiomaING").css("display", "");
});

//Funcionalidad botón volver
$(".volverAlMenu").click(function () {
  $("#menuPrincipal").css("display", "");
  $("#menuOpciones").css("display", "none");
  $("#menuPuntuaciones").css("display", "none");
  $("#menuCreditos").css("display", "none");
  $("#hudGame").css("display", "none");
  $("#hudGame").css("display", "none");
});

//Funcionalidad botón pausa
$("#pausaBtn").click(function () {
  $("#hud").css("display", "none");
  $("#menusBackground").css("display", "");
  $("#menuPrincipal").css("display", "none");
  $("#menuPausa").css("display", "");
  $("#tituloJuego").css("display", "none");
});

//Funcionalidad botón salir y continuar el juego
$("#salirBtn").click(function () {
  $("#menuPrincipal").css("display", "");
  $("#menuPausa").css("display", "none");
  $("#tituloJuego").css("display", "");
});

$("#continuarBtn").click(function () {
  $("#hud").css("display", "");
  $("#menusBackground").css("display", "none");
  $("#menuPrincipal").css("display", "");
  $("#menuPausa").css("display", "none");
  $("#tituloJuego").css("display", "none");
});

//Funcionalidad JugarBTN
$("#jugarBtn").click(function () {
  $("#menusBackground").css("display", "none");
  $("#menuPrincipal").css("display", "");
  $("#hud").css("display", "");
  $("#tituloJuego").css("display", "none");
});

//Funcionalidad OpcionesBTN
$("#opcionesBtn").click(function () {
  $("#menuPrincipal").css("display", "none");
  $("#menuOpciones").css("display", "");
});

//Funcionalidad CreditosBTN
$("#creditosBtn").click(function () {
  $("#menuPrincipal").css("display", "none");
  $("#menuCreditos").css("display", "");
});

//Funcionalidad SalirBTN
$("#salirBtn").click(function () {
  $("#menuPausa").css("display", "none");
  $("#menuPrincipal").css("display", "");
});

function onKeyDown(event) {
  switch (event.keyCode) {
    case 80:
      $("#menuPrincipal").css("display", "none");
      $("#menuPausa").css("display", "");
      break;
  }
}


window.addEventListener('keydown', onKeyDown, false);
