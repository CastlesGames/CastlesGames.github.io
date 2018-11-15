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

function Cofre(_sala){
    this.sala = _sala;
}

Cofre.prototype.init = function(){

}

Cofre.prototype.abrirCofre = function(){
    
}

Cofre.prototype.RecogerRecompensaCofre = function(){
    this.sala.end();
}