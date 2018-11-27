/** 
 * En este script se establece la estructura de las salas del tutorial.
 * 
 * Se necesita un array de salas.
 * 
 * 
 */

function NivelTutorial() {
  this.salasList = new Array(
    "Nada",
    "Combate",
    "Cofre",
    "Enfermería"
  );
  this.currentSala = 0;
}

NivelTutorial.prototype.paintSala = function () {

  if (this.currentSala >= 4) {
    this.endTutorial();
  }

  switch (this.currentSala) {
    case 0:
      new Sala("Nada").setNada();
      break;
    case 1:
      new Sala("Combate").setCombate();
      break;
    case 2:
      new Sala("Cofre").setCofre();
      break;
    case 3:
      new Sala("Nada").setNada();
      break;
    case 4:
      new Sala("Enfermeria").setEnfermeria();
      break;
  }
}

NivelTutorial.prototype.nextSala = function () {
  this.currentSala++;
}

NivelTutorial.prototype.endSala = function () {
  
}

NivelTutorial.prototype.endTutorial = function () {
  //Nivel acabado
}
