/*
    Prototipo que implementa la funcionalidad de los cofres
        En el métodos

        Init() => Pinta por pantalla un botón de Cofre en el centro 
        y elige un item que contiene aleatoriamente.

        AbrirCofre() => Da funcionalidad al botón de cofre. Aparece una pantalla con
        el item conseguido y aparece un botón de Recoger Recompensa

        RecogerRecompensaCofre() => Da funcionalidad al botón y 
        llama al jugador y al método .addItem con el item recogido.
        Quita las imágenes y botones y llama a la sala .end
*/


function Cofre(nombre) {
  this.nombre = nombre;
  this.recompensa = null;
  this.tipoRecompensa = null;

  //Se crean el array de Cartas
  this.cartasCofre = new Array(
    new Carta("Espadazo", "Ataque", 10, 0, 0, 1, "assets/imgs/cartas/carta-espadazo.png"),
    new Carta("Mazazo", "Ataque", 25, 0, 0, 2, "assets/imgs/cartas/carta-mazazo.png"),
    new Carta("Golpe de escudo", "Ataque", 5, 10, 0, 1, "assets/imgs/cartas/carta-golpeDeEscudo.png"),
    new Carta("Flechazo", "Ataque", 7, 0, 0, 1, "assets/imgs/cartas/carta-flechazo.png"),
    new Carta("Incremento de armadura", "Escudo", 0, 10, 0, 1, "assets/imgs/cartas/carta-incrementoDeArmadura.png"),
    new Carta("Incremento de armadura II", "Escudo", 0, 25, 0, 2, "assets/imgs/cartas/carta-incrementoDeArmadura2.png"),
    new Carta("Fortificacion", "Escudo", 0, 50, 0, 3, "assets/imgs/cartas/carta-fortificacion.png"),
    new Carta("Bola de fuego", "Magia", 35, 0, 0, 2, "assets/imgs/cartas/carta-bolaDeFuego.png"),
    new Carta("Curar", "Magia", 0, 0, 15, 1, "assets/imgs/cartas/carta-curar.png"),
    new Carta("Curar II", "Magia", 0, 0, 25, 2, "assets/imgs/cartas/carta-curar2.png"),
    new Carta("Destello", "Magia", 0, 0, 0, 2, "assets/imgs/cartas/carta-destello.png"),
  )

  //Se crea el array de Items
  this.itemsCofre = new Array(
    new Item("Armadura de cuero", "Armadura", 10, 0, 1, 0, 0),
    new Item("Armadura de metal", "Armadura", 15, 0, 2, 0, 0),
    new Item("Armadura de oro", "Armadura", 20, 0, 3, 0, 0),
    new Item("Armadura legendaria", "Armadura", 50, 0, 5, 0, 0),
    new Item("Espada rota", "Arma", 0, 1, 0, 0, 0),
    new Item("Espada", "Arma", 0, 2, 0, 0, 0),
    new Item("Hacha de combate", "Arma", 0, 3, 0, 0, 0),
    new Item("Excalibur", "Arma", 0, 5, 0, 0, 0),
    new Item("Colgante de rubí", "Amuleto", 0, 0, 0, 2, 0),
    new Item("Anillo de zafiro", "Amuleto", 0, 0, 0, 0, 1),
    new Item("Moneda del Rey", "Amuleto", 5, 2, 2, 0, 1),
    new Item("Corona del Rey", "Amuleto", 20, 1, 1, 1, 2),
  )
}

Cofre.prototype.init = function () {

  $("#abrirCofre").css({
    "display": "",
    "background-image": "url(assets/imgs/iconos/ClosedChest.png)",
    "background-position": "center",
    "background-color": "transparent"
  });

  $("#restaurarVida").css("display", "none");
  
  $("#cambioCarta").css("display", "none");
  $("#abrirCofre").removeClass("disabledbutton");
  
  var x = Math.floor((Math.random() * 2)); //Random para elegir una Carta o un Item
  var numCartaRandom = Math.floor((Math.random() * this.cartasCofre.length)); //Random entre el conjunto de cartas que hay
  var numItemRandom = Math.floor((Math.random() * this.itemsCofre.length)); //Random entre el conjunto de cartas que hay

  switch (x) {
    case 0:
      this.recompensa = this.cartasCofre[numCartaRandom];
      this.tipoRecompensa = "Carta";
     // console.log("ha entrado por aqui - carta");
      break;
    case 1:
      this.recompensa = this.itemsCofre[numItemRandom];
      this.tipoRecompensa = "Item";
      //console.log("ha entrado por aqui - item");
      break;
  }

}

Cofre.prototype.abrirCofre = function () {
  $("#abrirCofre").css("background-image", "url(assets/imgs/iconos/OpenChest.png)");

  //console.log(this.tipoRecompensa);
  if (this.tipoRecompensa == "Carta") {
    $("#mostrarCarta").css("display", "");
    $("#mostrarCarta").css("background-image", "url(" + this.recompensa.getRutaImg() + ")");
  } else {
    $("#mostrarItem").css("display", "");
    $("#nombreItemCofre").text(this.recompensa.getNombre());
    $("#tipoItemCofre").text(this.recompensa.getTipo());
    $("#plusvidaItemCofre").text(this.recompensa.getPlusVida());
    $("#plusataqueItemCofre").text(this.recompensa.getPlusAtaque());
    $("#plusdefensaItemCofre").text(this.recompensa.getPlusDefensa());
    $("#plusmagiaItemCofre").text(this.recompensa.getPlusMagia());
    $("#plusmanaItemCofre").text(this.recompensa.getPlusMana());
  }
}

Cofre.prototype.getRecompensa = function () {
  return this.recompensa;
}

Cofre.prototype.recogerRecompensaCofre = function () {

  //FUNCIONALIDAD DE RECOGER
  player.addItem(this.recompensa);
  console.log("Recompensa añadida");

  player.toString();
}
