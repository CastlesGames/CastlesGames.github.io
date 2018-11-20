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

    //NEW CARTA o NEW ITEM random
    this.recompensa = new Item("", "", 250, 40, 3, 2, 1);
}

Cofre.prototype.init = function(){
    var x = Math.floor((Math.random() * 4) + 1);
    console.log("Eligo Item");
    switch(x){
        case 1:
            console.log("Item 1");
            this.recompensa = item1;
            break;
        case 2:
            console.log("Item 2");
            this.recompensa = item2;
            break;
        case 3:
            console.log("Item 3");
            this.recompensa = item3;
            break;
        case 4:
            console.log("Item 4");
            this.recompensa = item4;
            break;
    }
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