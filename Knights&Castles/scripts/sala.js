//Prototipo que implementa la funcionalidad de creacion de eventos en la sala: 
//  ENEMIGO , COFRE , NADA , ENFERMERÍA
// Se requieren los métodos:
// Inicializar la Sala => Init
// Fin de la Sala => End

function Sala(/*Una sala recibe un objeto combate, cofre y enfermería*/ ){}

Sala.prototype.init = function(){
    var x = Math.floor((Math.random() * 4) + 1);
    switch(x){
        case 1:
            console.log("Inicializo un combate");
            //Llamo al objeto Combate.Init()
            break;
        case 2:
            console.log("Inicializo un Cofre");
            //Llamo al objeto Cofre.Init()
            var cofre = new Cofre(this);
            cofre.init;
            break;
        case 3:
            console.log("Inicializo un NADA");
            //Pinto por pantalla: "SALA VACÍA"
            //Llamo a Sala.prototype.end
            end();
            break;
        case 4:
            console.log("Inicializo una enfermería");
            //Llamo al objeto Enfermeria.Init()
            break;
    }
}

Sala.prototype.end = function(){
    //Cuando se acaba el Combate, Cofre o enfermería. Llaman a la sala para:
    //Dar acceso al jugador a moverse.
    
}
