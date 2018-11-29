//Prototipo que implementa la funcionalidad de creacion de eventos en la sala: 
//  ENEMIGO , COFRE , NADA , ENFERMERÍA
// Se requieren los métodos:
// Inicializar la Sala => Init
var enCombate = false;

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

Sala.prototype.setHud = function(){
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
  combate = new Combate(numNivel, false);
  combate.init();
  //combate.start();
}

Sala.prototype.setCombateBoss = function(){
    this.setHud();
  $("#hudCombate").css("display", "");
  $("#hudNavegacion").css("display", "none");
  $("#hudCartas").css("display", "");
  enCombate = true;
  combate = new Combate(numNivel, true);
  combate.init();
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
  console.log("Pinto la flecha");
  $("#hudBtn").css("display", "");

}
