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
  player.restaurarDefensa();
  
  $("#posEnemigo").css("display", "");
  $("#posEnemigo").css("background-image", "url(" + this.enemigo.getRutaImg() + ")");
  $("#statsEnemigo").text(this.enemigo.getVida());
  $("#hudNavegacion").css("display", "none");
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
      player.cartaSeleccionada = null;
      $("#btnCombate").css("display", "");
  }
  else{
    console.log("GAME OVER");
  }
}

Combate.prototype.usoCarta = function (){
  if(player.cartaSeleccionada != null){
    console.log("Mana del jugador" + player.mana + " vs " + player.cartaSeleccionada.getMana() + "Lo Llamo desde" +this);
    if(player.mana >= player.cartaSeleccionada.getMana()){
      player.perderMana(player.cartaSeleccionada.getMana());
  
      //MECANICAS DE CARTAS
      switch(player.cartaSeleccionada.getTipo()){
        case "Ataque":
          this.enemigo.perderVida(player.cartaSeleccionada.getDaño());
          $("#statsEnemigo").text(this.enemigo.getVida());
          if(this.enemigo.vida <= 0){
            this.endCombate();
          }
        break;
        case "Escudo":
          player.modificarDefensa(player.cartaSeleccionada.getArmadura());
        break;
        case "Magia":
        
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
  $("#btnCombate").css("display", "none");
  
  this.turnoEnemigo();
}

Combate.prototype.turnoEnemigo = function(){

  if(this.enemigo.getVida() <= 0){
    this.endCombate();
  }
  else{
    console.log("Estoy en Turno Enemigo");
    var ataqueIA = this.enemigo.getAtaqueRandom();
    player.perderVida(ataqueIA.getDaño());

    if(player.vida <= 0){
      console.log("GAME OVER");
    }
    else{
      this.turnoJugador();
    }
  }
}

Combate.prototype.endCombate = function(){

  $("#posEnemigo").css("display", "none");
  $("#hudNavegacion").css("display", "");
  $("#hudCombate").css("display", "none");
  $("#hudCartas").css("display", "none");
}
