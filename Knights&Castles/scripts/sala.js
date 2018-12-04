//Prototipo que implementa la funcionalidad de creacion de eventos en la sala: 
//  ENEMIGO , COFRE , NADA , ENFERMERÍA
// Se requieren los métodos:
// Inicializar la Sala => Init
var enCombate = false;
var combate;

function Sala(nombre) {
  this.nombre = nombre;
}

//Sala.prototype.initRandom
Sala.prototype.initRandom = function () {

  //MAQUETACION DE LA SALA! QUITAR BOTONES DE NAVEGACION

  $("#hudCartas").css("display", "none");
  $("#hudNavegacion").css("display", ""); //Siempre aparece, solo desaparece cuando hay un combate. No puede avanzar hasta pasar ese combate.
  $("#abrirCofre").css("display", "none");
  $("#restaurarVida").css("display", "none");

  var x = Math.floor((Math.random() * 4) + 1);
  switch (x) {
    case 1:
      this.setCombate();
      break;
    case 2:
      this.setCofre();
      break;
    case 3:
      this.setNada();
      break;
    case 4:
      this.setEnfermeria();
      break;
  }
}

Sala.prototype.setHud = function () {
  $("#hudCombate").css("display", "none"); //inicializo que no se vea, luego si entro en combate lo inicializo y lo hago visible
  $("#hudCartas").css("display", "none");
  $("#hudNavegacion").css("display", ""); //Siempre aparece, solo desaparece cuando hay un combate. No puede avanzar hasta pasar ese combate.
  $("#abrirCofre").css("display", "none");
  $("#restaurarVida").css("display", "none");
  $("#posEnemigo").css("display", "none");
}

Sala.prototype.setCofre = function () {
  this.setHud();
  $("#abrirCofre").css("display", "");
  enCombate = false;
  cofre = new Cofre("Name");
  cofre.init();
}

Sala.prototype.setCombate = function () {
  this.setHud();
  $("#hudCombate").css("display", "");
  $("#hudNavegacion").css("display", "none");
  $("#hudCartas").css("display", "");

  enCombate = true;

  if (combate == undefined) {

    combate = new Combate();

    $("#usarCarta").click(function () {
      combate.usoCarta();

      player.cartaSeleccionada.setDisabledCard(); //bloqueo la carta para que no vuelva a ser seleccionada
      var card = player.cartaSeleccionada;
      var manoCartas = player.getManoCartas();
      //Oscurezco la carta seleccionada
      if (card == manoCartas[0]) {
        $("#carta1").css("filter", "brightness(40%)");
      } else if (card == manoCartas[1]) {
        $("#carta2").css("filter", "brightness(40%)");
      } else if (card == manoCartas[2]) {
        $("#carta3").css("filter", "brightness(40%)");
      } else if (card == manoCartas[3]) {
        $("#carta4").css("filter", "brightness(40%)");
      } else if (card == manoCartas[4]) {
        $("#cartaExtra1").css("filter", "brightness(40%)");
      } else if (card == manoCartas[5]) {
        $("#cartaExtra2").css("filter", "brightness(40%)");
      }
      player.cartaSeleccionada = null;

    });
    $("#pasarTurno").click(function () {
      combate.finTurno();
    });
  }
  combate.init(numNivel, false);
}

Sala.prototype.setCombateBoss = function () {
  this.setHud();
  $("#hudCombate").css("display", "");
  $("#hudNavegacion").css("display", "none");
  $("#hudCartas").css("display", "");
  enCombate = true;
  numCombateBoss++;
  if (combate == undefined) {
    combate = new Combate();
    $("#usarCarta").click(function () {
      combate.usoCarta();
    });
    $("#pasarTurno").click(function () {
      combate.finTurno();
    });
  }
  combate.init(numNivel, true);
}

Sala.prototype.setEnfermeria = function () {
  this.setHud();
  $("#restaurarVida").css("display", "");
  enCombate = false;

  enfermeria = new Enfermeria();
  enfermeria.init();
}

Sala.prototype.setNada = function () {
  this.setHud();
  enCombate = false;

  //Pinto sala Vacía
  /*vacia = new Vacia();
  vacia.init();*/
}

Sala.prototype.endSala = function () {
  $("#hudBtn").css("display", "");

}
