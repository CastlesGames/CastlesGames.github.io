function Jugador(nombre) {
  this.nombre = nombre;
  this.vida = 100;
  this.maxVida = 100;
  this.armadura = 0;
  this.ataque = 0;
  this.defensa = 0;
  this.magia = 0;
  this.mana = 3;

  this.inventario = new Array(
    new Item("-", "-", 0, 0, 0, 0, 0),
    new Item("-", "-", 0, 0, 0, 0, 0),
    new Item("-", "-", 0, 0, 0, 0, 0)
  );

  this.manoCartas = new Array(
    new Carta("", "", 0, 0, 0, 0, ""),
    new Carta("", "", 0, 0, 0, 0, ""),
    new Carta("", "", 0, 0, 0, 0, ""),
    new Carta("", "", 0, 0, 0, 0, "")
  );
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
  this.maxVida = this.maxVida + item.getPlusVida();
  
  var currentLife = $("#healthBar").prop("value");
  var maxLife = this.maxVida;
  
  $("#healthBar").attr({value: this.vida});
  $("#statsVida").text(this.vida + " / " + this.maxVida);
}

//Método que recalcula la características del jugador cuando pierde un objeto,
//o lo intercambia por otro en su lugar.
Jugador.prototype.perderStats = function (item) {
  this.vida = this.vida - item.getPlusVida();
  this.ataque = this.ataque - item.getPlusAtaque();
  this.defensa = this.defensa - item.getPlusDefensa();
  this.magia = this.magia - item.getPlusMagia();
  this.mana = this.mana - item.getPlusMana();
  this.maxVida = this.maxVida - item.getPlusVida();
}


Jugador.prototype.perderVida = function (dañoRecibido) {
  this.vida = this.vida - (dañoRecibido - this.defensa);
  $("#healthBar").val(this.vida);
  $("#statsVida").text(this.vida + " / " + this.maxVida);
}

//Restaura la vida del jugador al máximo.
Jugador.prototype.restaurarVida = function () {
  //Se llama a esta funcion cuando se entra en enfermería
  this.vida = 100 +
    this.inventario[0].getPlusVida() +
    this.inventario[1].getPlusVida() +
    this.inventario[2].getPlusVida();

  $("#healthBar").val(this.vida);
  $("#statsVida").text(this.vida + " / " + this.maxVida);
}

//Se puede llamar a esta función en cada turno de combate, para restaurar el nivel de maná
Jugador.prototype.restaurarMana = function () {
  this.mana = 3 +
    this.inventario[0].getPlusMana() +
    this.inventario[1].getPlusMana() +
    this.inventario[2].getPlusMana();
}

Jugador.prototype.getArmaduraItem = function () {
  return this.inventario[0];
}

Jugador.prototype.getArmaItem = function () {
  return this.inventario[1];
}

Jugador.prototype.getAmuletoItem = function () {
  return this.inventario[2];
}

Jugador.prototype.addCarta = function (carta) {
  if (this.manoCartas.length < 6) {
    this.manoCartas.push(carta);
    console.log("Carta añadida.")
  } else {
    console.log("No se puede añadir otra carta, descártate de una antes.")
  }
}

Jugador.prototype.changeCarta = function (carta, num) {
  //num es la posicion de la carta en el array a cambiar
  this.manoCartas[num] = carta;
}

//Te muestra el inventario del jugador y sus caracteristicas.
Jugador.prototype.inventarioToString = function () {
  for (var i = 0; i < this.inventario.length; i++) {
    this.inventario[i].toString();
  }
}

Jugador.prototype.manoToString = function () {
  for (var i = 0; i < this.manoCartas.length; i++) {
    this.manoCartas[i].toString();
  }
}

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

Jugador.prototype.getCartaSeleccionada = function (idDivCarta) {
  switch (idDivCarta) {
    case "carta1":
      return this.manoCartas[0];
      break;
    case "carta2":
      return this.manoCartas[1];
      break;
    case "carta3":
      return this.manoCartas[2];
      break;
    case "carta4":
      return this.manoCartas[3];
      break;
    case "cartaExtra1":
      return this.manoCartas[4];
      break;
    case "cartaExtra2":
      return this.manoCartas[5];
      break;
    default:
      console.log("ERROR EN JUGADOR.GETCARTASELECCIONADA()");
      break;
  }
}

Jugador.prototype.getManoCartas = function(){
  return this.manoCartas;
}
