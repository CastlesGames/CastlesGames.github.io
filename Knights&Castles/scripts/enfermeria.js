/*
    Prototipo que implementa la funcionalidad de la enfermeria
        En el métodos

        Init() => Pinta por pantalla el icono de curar.

        CurarPlayer() => Da funcionalidad al botón de curar. Cura al jugador.
        Quita las imágenes y botones y llama a la sala .end
*/

function Enfermeria(curacion) {
    this.curacion = curacion;
  }

Enfermeria.prototype.init = function(){
    //MAQUETACION DE ENFERMERIA
}

Enfermeria.prototype.curar = function(){
    //FUNCIONALIDAD DE CURARSE
    player.restaurarVida();
    console.log(player.vida);
}