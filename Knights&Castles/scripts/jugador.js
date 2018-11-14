function Jugador(nombre) {
  this.nombre = nombre;
  this.vida = 100;
  this.armadura = 0;
  this.ataque = 0;
  this.defensa = 0;
  this.magia = 0;
  this.mana = 3;
  this.inventario = new Array(new Item("", "", 0, 0, 0, 0, 0), new Item("", "", 0, 0, 0, 0, 0), new Item("", "", 0, 0, 0, 0, 0));

}



//Cada vez que se añade un objeto al inventario, se recalculan las características y se reestablecen por defecto a su valor máximo
Jugador.prototype.addItem = function (nuevoItem) {

  switch (nuevoItem.getTipo()) {
    case "Armadura":
      this.perderStats(this.inventario[0]);
      this.inventario[0] = nuevoItem;
      this.addStats(nuevoItem);
      break;

    case "Arma":
      this.perderStats(this.inventario[1]);
      this.inventario[1] = nuevoItem;
      this.addStats(nuevoItem);
      break;

    case "Amuleto":
      this.perderStats(this.inventario[2]);
      this.inventario[2] = nuevoItem;
      this.addStats(nuevoItem);
      break;
  }
}


//Método que recalcula las características del jugador cuando añade un nuevo obje-
//to al inventario.
Jugador.prototype.addStats = function (item) {
  this.vida = this.vida + item.getPlusVida();
  this.ataque = this.ataque + item.getPlusAtaque();
  this.defensa = this.defensa + item.getPlusDefensa();
  this.magia = this.magia + item.getPlusMagia();
  this.mana = this.mana + item.getPlusMana();
}

//Método que recalcula la características del jugador cuando pierde un objeto,
//o lo intercambia por otro en su lugar.
Jugador.prototype.perderStats = function (item) {
  this.vida = this.vida - item.getPlusVida();
  this.ataque = this.ataque - item.getPlusAtaque();
  this.defensa = this.defensa - item.getPlusDefensa();
  this.magia = this.magia - item.getPlusMagia();
  this.mana = this.mana - item.getPlusMana();
}


Jugador.prototype.perderVida = function (dañoRecibido) {
  this.vida = this.vida - (dañoRecibido - this.defensa);
}

//Restaura la vida del jugador al máximo.
Jugador.prototype.restaurarVida = function () {
  //Se llama a esta funcion cuando se entra en enfermería
  this.vida = 100 +
    this.inventario[0].getPlusVida() +
    this.inventario[1].getPlusVida() +
    this.inventario[2].getPlusVida();
}

//Se puede llamar a esta función en cada turno de combate, para restaurar el nivel de maná
Jugador.prototype.restaurarMana = function () {
  this.mana = 3 +
    this.inventario[0].getPlusMana() +
    this.inventario[1].getPlusMana() +
    this.inventario[2].getPlusMana();
}

/*//Métodos que sirven para calcular la nuevas caracteristicas del jugador según se aña-
//dan o no objetos al inventario.
Jugador.prototype.addVida = function () {
  //No te restaura la vida por completo, según la vida que tenga el jugador, se aumen-
  //ta con los valores de bonificacion de vida que le otorgan los objetos del inventario.
  this.vida = this.vida +
    this.inventario[0].getPlusVida() +
    this.inventario[1].getPlusVida() +
    this.inventario[2].getPlusVida();
}
Jugador.prototype.addAtaque = function (item) {
  this.ataque = 0 +
    this.inventario[0].getPlusAtaque() +
    this.inventario[1].getPlusAtaque() +
    this.inventario[2].getPlusAtaque();
}
Jugador.prototype.addDefensa = function (item) {
  this.defensa = 0 +
    this.inventario[0].getPlusDefensa() +
    this.inventario[1].getPlusDefensa() +
    this.inventario[2].getPlusDefensa();
}
Jugador.prototype.addMagia = function (item) {
  this.magia = 0 +
    this.inventario[0].getPlusMagia() +
    this.inventario[1].getPlusMagia() +
    this.inventario[2].getPlusMagia();
}
*/

//Te muestra las caracteristicas del jugador
Jugador.prototype.toString = function () {
  var txt =
    "CARACTERISTICAS DEL JUGADOR:" +
    "\nNombre: " + this.nombre +
    "\nVida: " + this.vida +
    "\nAtaque: " + this.ataque +
    "\nDefensa: " + this.defensa +
    "\nMagia: " + this.magia +
    "\nManá: " + this.mana +
    "\n"
  return console.log(txt);
}

//Te muestra el inventario del jugador y sus caracteristicas.
Jugador.prototype.inventarioToString = function () {

  for (var i = 0; i < this.inventario.length; i++) {
    this.inventario[i].toString();
  }

}
