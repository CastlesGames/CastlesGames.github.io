/** 
 * En este script se establece la estructura de las salas del tutorial.
 * 
 * Se necesita un array de salas.
 * 
 * 
*/

function NivelTutorial(){
    this.salasList = new Array(
        new Sala("Nada"),
        new Sala("El combate"),
        new Sala("El cofre"),
        new Sala("La enfermería")
      );
    this.currentSala = 0;
}

NivelTutorial.prototype.nextSala = function(){
    
    if(this.currentSala >= 4){
        this.endTutorial();
    }
    
    switch(this.currentSala){
        case 0:
            this.salasList[0].setNada();
        break;
        case 1:
            this.salasList[1].setCombate();
        break;
        case 2:
            this.salasList[2].setCofre();
        break;
        case 3:
            this.salasList[3].setEnfermeria();
        break;
    }
}

NivelTutorial.prototype.endSala = function(){
    console.log("Acabo sala");
    this.salasList[this.currentSala].endSala();
    this.currentSala++;
}

NivelTutorial.prototype.endTutorial = function(){
    console.log("Fin del tutorial");
}
