/**
 * SCRIPT COMBATE -> nivel (INTEGER) nos indica el nivel en el que se desarrolla el combate, dependiendo del nivel que sea, inicializará el combate con un enemigo u otro; Boss es un boolean que indica si estamos ante un combate con boss o no.
 **/
function Combate(numNivel, boss) {
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
  this.turnoJugadorBool = true;
  this.cartaSeleccionada = null;
}

Combate.prototype.init = function(){
  $("#posEnemigo").css("display", "");
  $("#posEnemigo").css("background-image", "url(" + this.enemigo.getRutaImg() + ")");
  $("#statsEnemigo").text(this.enemigo.getVida());
  $("#hudNavegacion").css("display", "none");

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
    if(player.mana > player.cartaSeleccionada.getMana()){
      player.mana = player.mana - player.cartaSeleccionada.getMana();
  
      //MECANICAS DE CARTAS
      switch(player.cartaSeleccionada.getTipo()){
        case "Ataque":
          this.enemigo.vida = this.enemigo.vida - player.cartaSeleccionada.getDaño();
          if(this.enemigo.vida <= 0){
            console.log("ENEMIGO MUERTO");
            this.endCombate();
          }
        break;
        case "Escudo":

        break;
        case "Magia":
        
        break;
        default:
        console.log("[ERROR] Mecanica de carta: No programada");
        break;
      }
    
      console.log("El enemigo " + this.enemigo.getNombre() + " le queda vida " + this.enemigo.getVida());
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
  console.log("VIDA ENEMIGO: " +this.enemigo.getVida());

  if(this.enemigo.getVida() <= 0){
    console.log("Enenmigo Muerto");
    this.endCombate();
  }
  else{
    console.log("Estoy en Turno Enemigo");
    var ataqueIA = this.enemigo.getAtaqueRandom();
    console.log("Enemigo " + this.enemigo.getNombre() + " usa ataque " + ataqueIA.getNombre()
    + " daña al jugador con " + ataqueIA.getDaño());

    console.log("Vida Jugador: " + player.vida);
    player.vida = player.vida - ataqueIA.getDaño();
    console.log("Vida Jugador: " + player.vida);

    if(player.vida <= 0){
      console.log("GAME OVER");
    }
    else{
      this.turnoJugador();
    }
  }
}

Combate.prototype.endCombate = function(){
  console.log("Limpio los sprites del combate");

  $("#posEnemigo").css("display", "none");
  $("#hudNavegacion").css("display", "");
  $("#hudCombate").css("display", "none");
  $("#hudCartas").css("display", "none");
}
