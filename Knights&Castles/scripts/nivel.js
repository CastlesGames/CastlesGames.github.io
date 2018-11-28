/** 
 * En este script se establece la estructura de las salas del tutorial.
 * 
 * Se necesita un array de salas.
 * 
 * 
 */

function Nivel(nombreNivel, nombreNivelIngles) {
  //Lo podemos hacer del tamaño que queramos, en principio, de 10 salas cada nivel
  /**
   * 2 ENFERMERIAS POR NIVEL -> una al principio tras el combate con el Boss, otra al final, antes del combate con el Boss del nivel.
   * 2 COMBATES (mínimo) POR NIVEL + 1 BOSS
   * 1 COFRE  (mínimo)   POR NIVEL
   * 1 ZONA VACÍA (mínimo) POR NIVEL
   * 3 ZONAS ALEATORIAS
   */
  this.ordenSalas = new Array(
    "Enfermeria",
    "Random",
    "Cofre",
    "Random",
    "Combate",
    "Nada",
    "Random",
    "Combate",
    "Enfermeria",
    "Combate Boss"
  );
  this.nombreNivel = nombreNivel;
  this.nombreNivelIngles = nombreNivelIngles;
  this.currentSala = 0;
}

Nivel.prototype.paintSala = function () {

  if (this.currentSala >= this.ordenSalas.length) {
    this.endNivel();
  }

  switch (this.currentSala) {
    case 0:
    case 8:
      new Sala("Enfermeria").setEnfermeria();
      break;
    case 1:
    case 3:
    case 6:
      new Sala("Random").initRandom();
      break;
    case 2:
      new Sala("Cofre").setCofre();
      break;
    case 4:
    case 7:
      new Sala("Combate").setCombate();
      break;
    case 5:
      new Sala("Nada").setNada();
      break;
    case 9:
      new Sala("Combate boss").setCombateBoss();
      break;
  }
}

Nivel.prototype.nextSala = function () {
  this.currentSala++;
}

Nivel.prototype.endSala = function () {
  console.log("Acabo sala");
  this.salasList[this.currentSala].endSala();
  this.currentSala++;
}

Nivel.prototype.endNivel = function () {
  if (numNivel < 3) {
    //Nivel acabado
    new Sala("Nada").setNada();
    $("#siguienteNivel").css("display", "");
    switch (this.getNombre()) {
      case "Torreon":
        $("#siguienteNivelESP").text("Torre de magia");
        $("#siguienteNivelING").text("Magic tower");
        break;
      case "Jardines":
        $("#siguienteNivelESP").text("Salon fiestas");
        $("#siguienteNivelING").text("Party room");
        break;
      case "Mazmorras":
        $("#siguienteNivelESP").text("Aposentos");
        $("#siguienteNivelING").text("Chambers");
        break;
    }

    $("#hudNavegacion").css("display", "none");
    eligiendoNivel = true;
    numNivel++;
  }
}

Nivel.prototype.getNombre = function () {
  return this.nombreNivel;
}

Nivel.prototype.getNombreIngles = function () {
  return this.nombreNivelIngles;
}
