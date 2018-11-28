/** 
 * En este script se establece la estructura de las salas del tutorial.
 * 
 * Se necesita un array de salas.
 * 
 * 
 */

function NivelTutorial(nombre, nombreIngles) {
  this.nombre = nombre;
  this.nombreIngles = nombreIngles;
  this.salasList = new Array(
    "Nada",
    "Combate",
    "Cofre",
    "Enfermeria",
    "Nada",
    "Random",
    "Combate",
    "Random",
    "Enfermeria",
    "CombateBoss"
  );
  this.currentSala = 0;
}

NivelTutorial.prototype.paintSala = function () {

  if (this.currentSala >= this.salasList.length) {
    this.endTutorial();
  }

  switch (this.currentSala) {
    case 0:
    case 4:
      new Sala("Nada").setNada();
      break;
    case 1:
    case 6:
      new Sala("Combate").setCombate();
      break;
    case 2:
      new Sala("Cofre").setCofre();
      break;
    case 3:
    case 8:
      new Sala("Enfermeria").setEnfermeria();
      break;
    case 5:
    case 7:
      new Sala("Random").initRandom();
      break;
    case 9:
      new Sala("CombateBoss").setCombateBoss();
  }
}


NivelTutorial.prototype.nextSala = function () {
  this.currentSala++;
}

NivelTutorial.prototype.endSala = function () {
  //mostrar la opción para elegir ruta
}

NivelTutorial.prototype.endTutorial = function () {
  //Nivel acabado
  new Sala("Nada").setNada();
  eligiendoCamino = true;
  $("#elegirCamino").css("display", "");
  $("#hudNavegacion").css("display","none");
  enTutorial = false;
  numNivel++;
}

NivelTutorial.prototype.getNombre = function(){
  return this.nombre;
}

NivelTutorial.prototype.getNombreIngles = function(){
  return this.nombreIngles;
}
