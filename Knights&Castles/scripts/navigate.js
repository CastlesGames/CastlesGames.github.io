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
$("#abrirCofre").css("display", "none");
$("#restaurarVida").css("display", "none");
$("#mensajeItemCarta").css("display", "none");
$("#mostrarCarta").css("display", "none");
$("#mostrarItem").css("display", "none");
$("#hudNavegacion").css("display", "none");
$("#mostrarItem").css("display", "none");
$("#cartaExtra1").css("background-image", "none");
$("#cartaExtra2").css("background-image", "none");
$("#cambioCarta").css("display", "none");

$("#posPersonaje").css("display", "none");
$("#posEnemigo").css("display", "none");


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
  $("#posPersonaje").css("display", "none");
  $("#posEnemigo").css("display", "none");
});

//Funcionalidad botón salir y continuar el juego
$("#salirBtn").click(function () {
  $("#menuPrincipal").css("display", "");
  $("#background").css("display", "");
  $("#backgroundNiebla").css("display", "");
  $("#menuPausa").css("display", "none");
  $("#tituloJuego").css("display", "");
  $("#mensajeItemCarta").css("display", "none");
  $("#mostrarCarta").css("display", "none");
  $("#mostrarItem").css("display", "none");
  $("#cambioCarta").css("display", "none");
  $("#posPersonaje").css("display", "none");
  $("#posEnemigo").css("display", "none");
});

$("#continuarBtn").click(function () {
  $("#hud").css("display", "");
  $("#menusBackground").css("display", "none");
  $("#background").css("display", "none");
  $("#backgroundNiebla").css("display", "none");
  $("#menuPrincipal").css("display", "");
  $("#menuPausa").css("display", "none");
  $("#tituloJuego").css("display", "none");
  $("#posPersonaje").css("display", "");
  if (enCombate) {
    $("#posEnemigo").css("display", "");
  }

});

//Funcionalidad JugarBTN
$("#jugarBtn").click(function () {
  $("#menusBackground").css("display", "none");
  $("#background").css("display", "none");
  $("#backgroundNiebla").css("display", "none");
  $("#menuPrincipal").css("display", "");
  $("#hud").css("display", "");
  $("#tituloJuego").css("display", "none");
  $("#mensajeItemCarta").css("display", "none");
  $("#cartaExtra1").css("background-image", "none");
  $("#cartaExtra2").css("background-image", "none");
  $("#cambioCarta").css("display", "none");
  $("#posPersonaje").css("display", "");

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
  $("#mensajeItemCarta").css("display", "none");
  $("#cartaExtra1").css("background-image", "none");
  $("#cartaExtra2").css("background-image", "none");
  $("#posPersonaje").css("display", "none");
  $("#posEnemigo").css("display", "none");

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

//Funcionalidad abrir cofre
$("#abrirCofre").click(function () {
  cofre.abrirCofre();
  $("#mensajeItemCarta").css("display", "");
  $("#hudCartas").css("display", "");
  $("#hudBtn").css("display", "");

});

$("#restaurarVida").click(function () {
  enfermeria.curar();
});

//Funcionalidad añadir o dejar item
$("#cogerItemCarta").click(function () {
  var tipoRecompensa = cofre.tipoRecompensa;
  if (tipoRecompensa == "Carta") {
    player.addCarta(cofre.getRecompensa());
  } else {
    player.addItem(cofre.getRecompensa());
  }
  $("#abrirCofre").addClass("disabledbutton");
});

$("#dejarItemCarta").click(function () {
  $("#mensajeItemCarta").css("display", "none");
  $("#mostrarCarta").css("display", "none");
  $("#mostrarItem").css("display", "none");

  $("#abrirCofre").addClass("disabledbutton"); //No se le da la opción al jugador de poder abrir de nuevo el cofre.
});

$("#carta1").click(function () {
  if (eligiendoCartaDescarte) {
    player.changeCarta(cofre.getRecompensa(), 0);
    eligiendoCartaDescarte = false;
  } else {
    player.getCartaSeleccionada($(this).attr("id"));
  }
});
$("#carta2").click(function () {
  if (eligiendoCartaDescarte) {
    player.changeCarta(cofre.getRecompensa(), 1);
    eligiendoCartaDescarte = false;
  } else {
    player.getCartaSeleccionada($(this).attr("id"));
  }
});
$("#carta3").click(function () {
  if (eligiendoCartaDescarte) {
    player.changeCarta(cofre.getRecompensa(), 2);
    eligiendoCartaDescarte = false;
  } else {
    player.getCartaSeleccionada($(this).attr("id"));
  }
});
$("#carta4").click(function () {
  if (eligiendoCartaDescarte) {
    player.changeCarta(cofre.getRecompensa(), 3);
    eligiendoCartaDescarte = false;
  } else {
    player.getCartaSeleccionada($(this).attr("id"));
  }
});
$("#cartaExtra1").click(function () {
  if (eligiendoCartaDescarte) {
    player.changeCarta(cofre.getRecompensa(), 4);
    eligiendoCartaDescarte = false;
  } else {
    player.getCartaSeleccionada($(this).attr("id"));
  }
});
$("#cartaExtra2").click(function () {
  if (eligiendoCartaDescarte) {
    player.changeCarta(cofre.getRecompensa(), 5);
    eligiendoCartaDescarte = false;
  } else {
    player.getCartaSeleccionada($(this).attr("id"));
  }
});

$("#sceneToRight").click(function(){
  nivelTutorial.nextSala();
  nivelTutorial.paintSala();
})

window.addEventListener('keydown', onKeyDown, false);
