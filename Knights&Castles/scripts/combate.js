/**
 * SCRIPT COMBATE -> nivel (INTEGER) nos indica el nivel en el que se desarrolla el combate, dependiendo del nivel que sea, inicializará el combate con un enemigo u otro; Boss es un boolean que indica si estamos ante un combate con boss o no.
 **/
function Combate() {}

Combate.prototype.init = function (numNivel, boss) {
  this.enemigo;
  this.numNivel = numNivel;
  this.finCombate = false;
  this.boss = boss;
  player.restaurarBlockCartas();

  if (this.boss == false) {
    switch (this.numNivel) {
      case 1:
        this.enemigo = new Enemigo("Goblin", false, 45);
        break;
      case 2:
        this.enemigo = new Enemigo("Aprendiz de mago", false, 60);
        break;
      case 3:
        this.enemigo = new Enemigo("Caballero oscuro", false, 90);
        break;
      default:
        this.enemigo = new Enemigo("Goblin", false, 25);
        break;
    }
  } else {
    switch (this.numNivel) {
      case 1:
        this.enemigo = new Enemigo("HomoGoblin", true, 65);
        break;
      case 2:
        this.enemigo = new Enemigo("Mago corrupto", true, 80);
        break;
      case 3:
        this.enemigo = new Enemigo("Rey maldito", true, 150);
        break;
      default:
        this.enemigo = new Enemigo("HomoGoblin", true, 65);
        break;
    }
  }
  this.cartaSeleccionada = null;

  $("#posEnemigo").css("display", "");
  $("#posEnemigo").css("background-image", "url(" + this.enemigo.getRutaImg() + ")");
  $("#statsEnemigo").text(this.enemigo.getVida());
  $("#hudNavegacion").css("display", "none");
  $("#btnCombate").css("display", "");
  $("#attackGif").css("display", "none");
  background2Audio.pause();
  background2Audio.currentTime = 0;
  combateAudio.play();
  this.turnoJugador();
}

Combate.prototype.turnoJugador = function () {
  if (player.vida > 0) {
    //LOGICA DEL TURNO
    //Restauro Mana
    //Carta Seleccionada a Null
    //Pongo Botones en pantalla

    console.log("ESTOY EN TURNO JUGADOR");
    player.restaurarMana();
    player.restaurarArmadura();
    player.cartaSeleccionada = null;
    $("#usarCarta").css("display", "");
    $("#pasarTurno").css("display", "");
    $("#combateFeedback").text("¡ Tu turno !");
    
  } else {
    console.log("GAME OVER");
    combateAudio.pause();
    combateAudio.currentTime = 0;
    backgroundAudio.play();
    $("#gameOver").css("display", "");
  }
}

Combate.prototype.usoCarta = function () {
  if (player.cartaSeleccionada != null) {
    if (player.mana >= player.cartaSeleccionada.getMana()) {
      ataqueAudio.play();
      player.perderMana(player.cartaSeleccionada.getMana());
      $("#combateFeedback").text("¡ Usas la carta " + player.cartaSeleccionada.getNombre() + " !");

      //MECANICAS DE CARTAS
      switch (player.cartaSeleccionada.getTipo()) {
        case "Ataque":
          this.enemigo.perderVida(player.cartaSeleccionada.getDaño() + player.ataque);
          //AÑADIR ANIMACION DE ATAQUE SOBRE ENEMIGO
          $("#attackGif").css("display", "");
          $("#attackGif").css("left", "72%");
          setTimeout(function () {
            $("#attackGif").css("display", "none");
          }, 400);
          player.añadirArmadura(player.cartaSeleccionada.getArmadura());
          if (this.enemigo.vida <= 0) {
            this.endCombate();
          }
          break;
        case "Escudo":
          player.añadirArmadura(player.cartaSeleccionada.getArmadura());
          break;
        case "Magia":
          //this.enemigo.perderVida(player.cartaSeleccionada.getDaño() + player.ataque);
          player.añadirArmadura(player.cartaSeleccionada.getArmadura());
          //AÑADIR ANIMACION DE ATAQUE SOBRE ENEMIGO
          $("#attackGif").css("display", "");
          $("#attackGif").css("left", "72%");
          setTimeout(function () {
            $("#attackGif").css("display", "none");
          }, 400);
          player.curarseMagia(player.cartaSeleccionada.getCuracion());
          if (this.enemigo.vida <= 0) {
            this.endCombate();
          }
          break;
        default:
          console.log("[ERROR] Mecanica de carta: No programada");
          break;
      }
    } else {
      console.log("NO TIENES MANA");
      $("#combateFeedback").text("¡ No tienes mana !");
      player.cartaSeleccionada = null;
      //FEEDBACK VISUAL
    }
  } else {
    console.log("NO TENGO CARTA SELECCIONADA");
  }
}

Combate.prototype.finTurno = function () {
  $("#usarCarta").css("display", "none");
  $("#pasarTurno").css("display", "none");
  $("#combateFeedback").text("¡ Fin de Turno!");
  
  player.restaurarBlockCartas();  //restauramos las cartas al pasar al turno del jugador
  
  var t = this;
  setTimeout(function () {
    t.turnoEnemigo();
  }, 1000);
}

Combate.prototype.turnoEnemigo = function () {
  
  var t = this;
  if (this.enemigo.getVida() <= 0) {
    this.endCombate();
  } else {
    $("#combateFeedback").text("¡ Turno del enemigo !");
    var ataqueIA = this.enemigo.getAtaqueRandom();

    setTimeout(function () {
      $("#combateFeedback").text("Ataque del enemigo " + ataqueIA.getDaño());
      //AÑADIR ANIMACION DE ATAQUE SOBRE PERSONAJE
      $("#attackGif").css("display", "");
      $("#attackGif").css("left", "22%");
      ataqueEnemigoAudio.play();
      setTimeout(function () {
        $("#attackGif").css("display", "none");
      }, 400);
      player.perderVida(ataqueIA.getDaño());

      if (player.vida <= 0) {
        console.log("GAME OVER");
        $("#hud").css("display", "none");
        $("#menusBackground").css("display", "");
        $("#background").css("display", "");
        $("#backgroundNiebla").css("display", "");
        $("#menuPrincipal").css("display", "none");
        $("#menuPausa").css("display", "none");
        $("#tituloJuego").css("display", "none");
        $("#posPersonaje").css("display", "none");
        $("#posEnemigo").css("display", "none");
        $("#nombreNivel").css("display", "none");
        $("#elegirCamino").css("display", "none");
        $("#siguienteNivel").css("display", "none");
        $("#hudCombate").css("display", "none");
        combateAudio.pause();
        combateAudio.currentTime = 0;
        backgroundAudio.play();
        $("#gameOver").css("display", "");
      } else {
        setTimeout(function () {
          t.turnoJugador();
        }, 2000);
      }
    }, 1000);

  }
}

Combate.prototype.endCombate = function () {
  combateAudio.pause();
  combateAudio.currentTime = 0;
  background2Audio.play();

  $("#posEnemigo").css("display", "none");
  $("#hudNavegacion").css("display", "");
  $("#hudCombate").css("display", "none");
  $("#btnCombate").css("display", "none");
  $("#hudCartas").css("display", "none");
  $("#combateGanado").css("display", "");
  setTimeout(function () {
    $("#combateGanado").css("display", "none");
  }, 1000);
  
  player.restaurarBlockCartas();  //restauramos las cartas al finalizar el combate
  

  if (numCombateBoss > 3) {
    gameTimeMin = contador_min;
    gameTimeSeg = contador_seg;

    stopTime();

    $("#hud").css("display", "none");
    $("#menusBackground").css("display", "");
    $("#background").css("display", "");
    $("#backgroundNiebla").css("display", "");
    $("#menuPrincipal").css("display", "none");
    $("#menuPausa").css("display", "none");
    $("#tituloJuego").css("display", "none");
    $("#posPersonaje").css("display", "none");
    $("#posEnemigo").css("display", "none");
    $("#nombreNivel").css("display", "none");
    $("#elegirCamino").css("display", "none");
    $("#siguienteNivel").css("display", "none");
    $("#hudCombate").css("display", "none");
    $("#finalpartida").css("display", "");
    $("#finalScore").text(gameTimeMin + "'" + gameTimeSeg + "''");

    setTimeout(function () {
      gameUser = prompt("Introduce tu nombre", "Anonimo");
      localStorage.setItem("gameUser", gameUser);
      localStorage.setItem("gameTimeMin", gameTimeMin);
      localStorage.setItem("gameTimeSeg", gameTimeSeg);
      bestUser = localStorage.getItem("bestUser");
      bestTimeMin = localStorage.getItem("bestTimeMin");
      bestTimeSeg = localStorage.getItem("bestTimeSeg");

      console.log(bestUser + " " + bestTimeMin + " " + bestTimeSeg + " ");
      if (bestUser == null) {
        localStorage.setItem("bestUser", gameUser);
        localStorage.setItem("bestTimeMin", gameTimeMin);
        localStorage.setItem("bestTimeSeg", gameTimeSeg);
      } else {
        if (bestTimeMin >= gameTimeMin) {
          if (bestTimeSeg >= gameTimeSeg) {
            localStorage.setItem("bestUser", gameUser);
            localStorage.setItem("bestTimeMin", gameTimeMin);
            localStorage.setItem("bestTimeSeg", gameTimeSeg);
          }
        }
      }


    });

  }
}
