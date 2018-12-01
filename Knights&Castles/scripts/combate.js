/**
 * SCRIPT COMBATE -> nivel (INTEGER) nos indica el nivel en el que se desarrolla el combate, dependiendo del nivel que sea, inicializará el combate con un enemigo u otro; Boss es un boolean que indica si estamos ante un combate con boss o no.
 **/
function Combate() {
}

Combate.prototype.init = function(numNivel, boss){

  this.enemigo;
  this.numNivel = numNivel;
  this.finCombate = false;
  this.boss = boss;

  if (this.boss == false) {
    switch (this.numNivel) {
      case 1:
        this.enemigo = new Enemigo("Goblin", false, 25);
        break;
      case 2:
        this.enemigo = new Enemigo("Aprendiz de mago", false, 40);
        break;
      case 3:
        this.enemigo = new Enemigo("Caballero oscuro", false, 60);
        break;
      default:
        this.enemigo = new Enemigo("Goblin", false, 25);
        break;
    }
  } else {
    switch (this.numNivel) {
      case 1:
        this.enemigo = new Enemigo("HomoGoblin", true, 50);
        break;
      case 2:
        this.enemigo = new Enemigo("Mago corrupto", true, 70);
        break;
      case 3:
        this.enemigo = new Enemigo("Rey maldito", true, 100);
        break;
      default:
        this.enemigo = new Enemigo("HomoGoblin", true, 25);
        break;
    }
  }
  this.cartaSeleccionada = null;
  
  $("#posEnemigo").css("display", "");
  $("#posEnemigo").css("background-image", "url(" + this.enemigo.getRutaImg() + ")");
  $("#statsEnemigo").text(this.enemigo.getVida());
  $("#hudNavegacion").css("display", "none");
  $("#btnCombate").css("display","");
  $("#attackGif").css("display","none");
  this.turnoJugador();
}

Combate.prototype.turnoJugador = function(){
  if(player.vida > 0){
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
      $("#combateFeedback").text("¡ Tú turno !");
  }
  else{
    console.log("GAME OVER");
  }
}

Combate.prototype.usoCarta = function (){
  if(player.cartaSeleccionada != null){
    if(player.mana >= player.cartaSeleccionada.getMana()){
      player.perderMana(player.cartaSeleccionada.getMana());
      $("#combateFeedback").text("¡ Usas la carta " + player.cartaSeleccionada.getNombre() + " !");
      
      //MECANICAS DE CARTAS
      switch(player.cartaSeleccionada.getTipo()){
        case "Ataque":
          this.enemigo.perderVida(player.cartaSeleccionada.getDaño()+ player.ataque);
          //AÑADIR ANIMACION DE ATAQUE SOBRE ENEMIGO
          $("#attackGif").css("display","");
          $("#attackGif").css("left","72%");
          setTimeout(function(){
            $("#attackGif").css("display","none");
          },400);
          player.añadirArmadura(player.cartaSeleccionada.getArmadura());
          if(this.enemigo.vida <= 0){
            this.endCombate();
          }
        break;
        case "Escudo":
          player.añadirArmadura(player.cartaSeleccionada.getArmadura());
        break;
        case "Magia":
          this.enemigo.perderVida(player.cartaSeleccionada.getDaño()+ player.ataque);
          //AÑADIR ANIMACION DE ATAQUE SOBRE ENEMIGO
          player.curarseMagia(player.cartaSeleccionada.getCuracion());
          if(this.enemigo.vida <= 0){
            this.endCombate();
          }
        break;
        default:
        console.log("[ERROR] Mecanica de carta: No programada");
        break;
      }
    }
    else{
      console.log("NO TIENES MANA");
      //FEEDBACK VISUAL
    }  
  }
  else{
    console.log ("NO TENGO CARTA SELECCIONADA");
  }
}

Combate.prototype.finTurno = function(){
  $("#usarCarta").css("display", "none");
  $("#pasarTurno").css("display", "none");
  $("#combateFeedback").text("¡ Fin de Turno!");
  var t = this;
  setTimeout(function(){t.turnoEnemigo();}, 1000);
}

Combate.prototype.turnoEnemigo = function(){
  var t = this;
  if(this.enemigo.getVida() <= 0){
    this.endCombate();
  }
  else{
    $("#combateFeedback").text("¡ Turno Enemigo!");
    var ataqueIA = this.enemigo.getAtaqueRandom();
    
    setTimeout(function(){
    $("#combateFeedback").text("Ataque del enemigo " + ataqueIA.getDaño());
    //AÑADIR ANIMACION DE ATAQUE SOBRE PERSONAJE
    $("#attackGif").css("display","");
    $("#attackGif").css("left","22%");
    setTimeout(function(){
      $("#attackGif").css("display","none");
    },400);
    player.perderVida(ataqueIA.getDaño());

    if(player.vida <= 0){
      console.log("GAME OVER");
    }
    else{
      setTimeout(function (){t.turnoJugador();},2000);
    }
    },1000);
    
  }
}

Combate.prototype.endCombate = function(){

  $("#posEnemigo").css("display", "none");
  $("#hudNavegacion").css("display", "");
  $("#hudCombate").css("display", "none");
  $("#btnCombate").css("display","none");
  $("#hudCartas").css("display", "none");
}
