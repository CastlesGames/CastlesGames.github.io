var showInventarioItem = false;
var eligiendoCamino = false;
var eligiendoNivel = false;
var btnAudio = document.getElementById("btnAudio");
var ataqueAudio = document.getElementById("ataqueAudio");
var backgroundAudio = document.getElementById("backgroundAudio");
var background2Audio = document.getElementById("background2Audio");
var ataqueEnemigoAudio = document.getElementById("ataqueEnemigoAudio");
var hitAudio = document.getElementById("hitAudio");
var pocaVidaAudio = document.getElementById("pocaVidaAudio");
var abrirCofreAudio = document.getElementById("abrirCofreAudio");
var recuperarVidaAudio = document.getElementById("recuperarVidaAudio");


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
$("#elegirCamino").css("display", "none");
$("#siguienteNivel").css("display", "none");
$("#hudCombate").css("display", "none");


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
  $("#nombreNivel").css("display", "none");
  $("#elegirCamino").css("display", "none");
  $("#siguienteNivel").css("display", "none");
  $("#hudCombate").css("display", "none");
  isPaused = true;
  hitAudio.play();
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
  $("#nombreNivel").css("display", "none");
  $("#hudCombate").css("display", "none");
  stopTime();
  backgroundAudio.play();
  background2Audio.pause();
  background2Audio.currentTime = 0;
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
  isPaused = false;
  if (enCombate) {
    $("#posEnemigo").css("display", "");
    $("#hudCombate").css("display", "");
  }
  
  if(eligiendoCamino){
    $("#elegirCamino").css("display", "");
  }
  
  if(eligiendoNivel){
    $("#siguienteNivel").css("display", "");
  }
  $("#nombreNivel").css("display", "");

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
  $("#nombreNivel").css("display", "");
  background2Audio.play();
  backgroundAudio.pause();
  backgroundAudio.currentTime = 0;

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
    $("#mensajeItemCarta").css("color", "transparent");
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
    $("#mensajeItemCarta").css("color", "white");
    $(".manoCartas").css("display", "");
    showInventarioItem = false;
  }

  hitAudio.play();
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
    $("#mensajeItemCarta").css("color", "transparent");
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
    $("#mensajeItemCarta").css("color", "white");
    $(".manoCartas").css("display", "");
    showInventarioItem = false;
  }

  hitAudio.play();
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
    $("#mensajeItemCarta").css("color", "transparent");
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
    $("#mensajeItemCarta").css("color", "white");
    $(".manoCartas").css("display", "");

    showInventarioItem = false;
  }

  hitAudio.play();
});

//Funcionalidad abrir cofre
$("#abrirCofre").click(function () {
  cofre.abrirCofre();
  $("#mensajeItemCarta").css("display", "");
  $("#hudCartas").css("display", "");
  $("#hudBtn").css("display", "");
  abrirCofreAudio.play();
});

$("#restaurarVida").click(function () {
  enfermeria.curar();
  recuperarVidaAudio.play();
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


$("#sceneToRight").click(function () {
  
  $("#mensajeItemCarta").css("display", "none");
  
  if (enTutorial) {
    nivelTutorial.nextSala();
    nivelTutorial.paintSala();
  } else {
    nivel.nextSala();
    nivel.paintSala();
  }

  hitAudio.play();
})

$(".btn").click(function () {
  btnAudio.play();
});

//Funcionalidad botones de dificultad
$("#dificultadNormal").click(function () {
  dificultadNormal = true;
});
$("#dificultadDificil").click(function () {
  dificultadNormal = false;
});
//Funcionalidad botones de audio ON y OFF
$("#musicaOff").click(function () {
  backgroundAudio.volume = 0;
  background2Audio.volume = 0;
  abrirCofreAudio.volume = 0;
  pocaVidaAudio.volume = 0;
  hitAudio.volume = 0;
  btnAudio.volume = 0;
  recuperarVidaAudio.volume = 0;
  ataqueEnemigoAudio.volume = 0;
  ataqueAudio.volume = 0;
});
$("#musicaOn").click(function () {
  backgroundAudio.volume = 1;
  background2Audio.volume = 1;
  abrirCofreAudio.volume = 1;
  pocaVidaAudio.volume = 1;
  hitAudio.volume = 1;
  btnAudio.volume = 1;
  recuperarVidaAudio.volume = 1;
  ataqueEnemigoAudio.volume = 1;
  ataqueAudio.volume = 1;
});

$("#caminoTorreon").click(function () {
  nivel = new Nivel("Torreon", "Tower");
  nivel.paintSala();
  $("#elegirCamino").css("display", "none");
  $("#nombreNivelESP").text(nivel.getNombre());
  $("#nombreNivelING").text(nivel.getNombreIngles());
});

$("#caminoJardin").click(function () {
  nivel = new Nivel("Jardines", "Gardens");
  nivel.paintSala();
  $("#elegirCamino").css("display", "none");
  $("#nombreNivelESP").text(nivel.getNombre());
  $("#nombreNivelING").text(nivel.getNombreIngles());
});

$("#caminoMazmorras").click(function () {
  nivel = new Nivel("Mazmorras", "Dungeons");
  nivel.paintSala();
  $("#elegirCamino").css("display", "none");
  $("#nombreNivelESP").text(nivel.getNombre());
  $("#nombreNivelING").text(nivel.getNombreIngles());
});

//Funcionalidad siguiente nivel
$(".nextlvl").click(function () {
  console.log("hola");
  var nombre = nivel.getNombre();
  switch (nombre) {
    case "Torreon":
      nivel = new Nivel("Torre de magia", "Magic tower");
      break;
    case "Jardines":
      nivel = new Nivel("Salon de fiestas", "Party room");
      break;
    case "Mazmorras":
      nivel = new Nivel("Aposentos de los guardias", "Chambers of the guards");
      break;
  }
  $("#siguienteNivel").css("display", "none");
  $("#nombreNivelESP").text(nivel.getNombre());
  $("#nombreNivelING").text(nivel.getNombreIngles());
  nivel.paintSala();
});

window.addEventListener('keydown', onKeyDown, false);
$(document).ready(function () {
  backgroundAudio.play();
});


