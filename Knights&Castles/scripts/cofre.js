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
  player.restaurarBlockCartas();
  //Se crean el array de Cartas
  this.cartasCofre = cartas;

  //Se crea el array de Items
  this.itemsCofre = items;
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
