/**
 * SCRIPT COMBATE -> nivel (INTEGER) nos indica el nivel en el que se desarrolla el combate, dependiendo del nivel que sea, inicializará el combate con un enemigo u otro; Boss es un boolean que indica si estamos ante un combate con boss o no.
 **/
function Combate(numNivel, boss) {
  this.enemigo;
  this.numNivel = numNivel;
  this.finCombate = false;
  this.boss = boss;

  if (this.boss == false) {
    switch (this.numNivel) {
      case 1:
        this.enemigo = new Enemigo("Goblin", false, 25);
        break;
      case 2:
        this.enemigo = new Enemigo("Aprendiz de mago", false, 40);
        break;
      case 3:
        this.enemigo = new Enemigo("Caballero oscuro", false, 60);
        break;
      default:
        this.enemigo = new Enemigo("Goblin", false, 25);
        break;
    }
  } else {
    switch (this.numNivel) {
      case 1:
        this.enemigo = new Enemigo("HomoGoblin", true, 50);
        break;
      case 2:
        this.enemigo = new Enemigo("Mago corrupto", true, 70);
        break;
      case 3:
        this.enemigo = new Enemigo("Rey maldito", true, 100);
        break;
      default:
        this.enemigo = new Enemigo("HomoGoblin", true, 25);
        break;
    }
  }
}

Combate.prototype.init = function(){
  $("#posEnemigo").css("display", "");
  $("#posEnemigo").css("background-image", "url(" + this.enemigo.getRutaImg() + ")");
  $("#statsEnemigo").text(this.enemigo.getVida());
  $("#hudNavegacion").css("display", "");
}
