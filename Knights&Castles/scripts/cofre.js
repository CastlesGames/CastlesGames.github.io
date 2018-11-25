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

        items = new Array(
    0 new Item("Armadura de cuero", "Armadura", 10, 0, 1, 0, 0),
    1 new Item("Armadura de metal", "Armadura", 15, 0, 2, 0, 0),
    2 new Item("Armadura de oro", "Armadura", 20, 0, 3, 0, 0),
    3 new Item("Armadura legendaria", "Armadura", 50, 0, 5, 0, 0),
    4 new Item("Espada rota", "Arma", 0, 1, 0, 0, 0),
    5 new Item("Espada", "Arma", 0, 2, 0, 0, 0),
    6 new Item("Hacha de combate", "Arma", 0, 3, 0, 0, 0),
    7 new Item("Excalibur", "Arma", 0, 5, 0, 0, 0),
    8 new Item("Colgante de rubí", "Amuleto", 0, 0, 0, 2, 0),
    9 new Item("Anillo de zafiro", "Amuleto", 0, 0, 0, 0, 1),
    10 new Item("Moneda del Rey", "Amuleto", 5, 2, 2, 0, 1),
    11 new Item("Corona del Rey", "Amuleto", 20, 1, 1, 1, 2),
  )
*/

function Cofre(nombre) {
    this.nombre = nombre;

    //NEW CARTA o NEW ITEM random
    this.recompensa = new Item("", "", 250, 40, 3, 2, 1);
}

Cofre.prototype.init = function(){
    var x = Math.floor((Math.random() * 11) + 0);
    console.log("Eligo Item " +  x);
    this.recompensa = items[x];
    
    //MAQUETACION DE COFRE
}

Cofre.prototype.abrirCofre = function(){
    //PINTAR A this.recompensa
    //PONER BOTÓN DE RECOGER
    
    //pintas por escena el elmento recogido, sacar new DIV mostrado el objeto
}

Cofre.prototype.recogerRecompensaCofre = function(){
    
    //FUNCIONALIDAD DE RECOGER
    player.addItem(this.recompensa);
    console.log("Recompensa añadida");

    player.toString();
}