/*
    Funcionalidad de la Sala Vacía
    Carga el escenario y llama directamente a end
*/

function Vacia() {
  }

  Vacia.prototype.init = function(){
      //Cargo el fondo
      console.log("CARGO el fondo del escenario");

      nivelTutorial.endSala();
  }