var showInventarioItem = false;
$("#menusBackground").css("display", "");
$("#hud").css("display", "none");
$("#menuPrincipal").css("display", "");
$("#menuOpciones").css("display", "none");
$("#menuPuntuaciones").css("display", "none");
$("#menuCreditos").css("display", "none");
$("#menuPausa").css("display", "none");
$("#hudGame").css("display", "none");
$("#hudInventario").css("display", "none");


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
  $("#background").css("display", "");
  $("#backgroundNiebla").css("display", "");
  $("#menuPrincipal").css("display", "none");
  $("#menuPausa").css("display", "");
  $("#tituloJuego").css("display", "none");
});

//Funcionalidad botón salir y continuar el juego
$("#salirBtn").click(function () {
  $("#menuPrincipal").css("display", "");
  $("#background").css("display", "");
  $("#backgroundNiebla").css("display", "");
  $("#menuPausa").css("display", "none");
  $("#tituloJuego").css("display", "");
});

$("#continuarBtn").click(function () {
  $("#hud").css("display", "");
  $("#menusBackground").css("display", "none");
  $("#background").css("display", "none");
  $("#backgroundNiebla").css("display", "none");
  $("#menuPrincipal").css("display", "");
  $("#menuPausa").css("display", "none");
  $("#tituloJuego").css("display", "none");
});

//Funcionalidad JugarBTN
$("#jugarBtn").click(function () {
  $("#menusBackground").css("display", "none");
  $("#background").css("display", "none");
  $("#backgroundNiebla").css("display", "none");
  $("#menuPrincipal").css("display", "");
  $("#hud").css("display", "");
  $("#tituloJuego").css("display", "none");
  
  new init();
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

$("#armadura").click(function () {
  if (!showInventarioItem) {
    var item = player.getArmaduraItem();
    $("#nombreItem").text(item.getNombre());
    $("#tipoItem").text(item.getTipo());
    $("#plusvidaItem").text(item.getPlusVida());
    $("#plusataqueItem").text(item.getPlusAtaque());
    $("#plusdefensaItem").text(item.getPlusDefensa());
    $("#plusmagiaItem").text(item.getPlusMagia());
    $("#plusmanaItem").text(item.getPlusMana());

    $("#hudInventario").css("display", "");
    $(".manoCartas").css("display", "none");
    showInventarioItem = true;
  } else {
    $("#nombreItem").text("");
    $("#tipoItem").text("");
    $("#plusvidaItem").text("");
    $("#plusataqueItem").text("");
    $("#plusdefensaItem").text("");
    $("#plusmagiaItem").text("");
    $("#plusmanaItem").text("");

    $("#hudInventario").css("display", "none");
    $(".manoCartas").css("display", "");
    showInventarioItem = false;
  }
});

$("#arma").click(function () {
  if (!showInventarioItem) {
    var item = player.getArmaItem();
    $("#nombreItem").text(item.getNombre());
    $("#tipoItem").text(item.getTipo());
    $("#plusvidaItem").text(item.getPlusVida());
    $("#plusataqueItem").text(item.getPlusAtaque());
    $("#plusdefensaItem").text(item.getPlusDefensa());
    $("#plusmagiaItem").text(item.getPlusMagia());
    $("#plusmanaItem").text(item.getPlusMana());

    $("#hudInventario").css("display", "");
    $(".manoCartas").css("display", "none");
    showInventarioItem = true;
  } else {
    $("#nombreItem").text("");
    $("#tipoItem").text("");
    $("#plusvidaItem").text("");
    $("#plusataqueItem").text("");
    $("#plusdefensaItem").text("");
    $("#plusmagiaItem").text("");
    $("#plusmanaItem").text("");

    $("#hudInventario").css("display", "none");
    $(".manoCartas").css("display", "");
    showInventarioItem = false;
  }
});

$("#amuleto").click(function () {
  if (!showInventarioItem) {
    var item = player.getAmuletoItem();
    $("#nombreItem").text(item.getNombre());
    $("#tipoItem").text(item.getTipo());
    $("#plusvidaItem").text(item.getPlusVida());
    $("#plusataqueItem").text(item.getPlusAtaque());
    $("#plusdefensaItem").text(item.getPlusDefensa());
    $("#plusmagiaItem").text(item.getPlusMagia());
    $("#plusmanaItem").text(item.getPlusMana());

    $("#hudInventario").css("display", "");
    $(".manoCartas").css("display", "none");
    showInventarioItem = true;
  } else {
    $("#nombreItem").text("");
    $("#tipoItem").text("");
    $("#plusvidaItem").text("");
    $("#plusataqueItem").text("");
    $("#plusdefensaItem").text("");
    $("#plusmagiaItem").text("");
    $("#plusmanaItem").text("");

    $("#hudInventario").css("display", "none");
    $(".manoCartas").css("display", "");
    showInventarioItem = false;
  }
});

window.addEventListener('keydown', onKeyDown, false);
