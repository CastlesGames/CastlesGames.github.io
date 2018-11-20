//Prototipo que implementa la funcionalidad de creacion de eventos en la sala: 
//  ENEMIGO , COFRE , NADA , ENFERMERÍA
// Se requieren los métodos:
// Inicializar la Sala => Init

function Sala(nombre){
    this.nombre = nombre;
}

Sala.prototype.init = function(){

    //MAQUETACION DE LA SALA! QUITAR BOTONES DE NAVEGACION
    var x = Math.floor((Math.random() * 4) + 1);
    switch(x){
        case 1:
            console.log("Inicializo un combate");
            //Llamo al objeto Combate.Init()
            break;
        case 2:
            console.log("Inicializo un Cofre");
            //Llamo al objeto Cofre.Init()
            var cofre = new Cofre("Name");
            cofre.init();
            break;
        case 3:
            console.log("Inicializo un NADA");
            //Pinto por pantalla: "SALA VACÍA"
            break;
        case 4:
            console.log("Inicializo una enfermería");
            //Llamo al objeto Enfermeria.Init()ç
            var enfermeria = new Enfermeria(60);
            enfermeria.init();
            enfermeria.curar();
            break;
    }
}
