function Enemigo(nombre, esBoss, vida) {
  this.nombre = nombre;
  this.esBoss = esBoss; //boolean que indica si es boss o no
  this.vida = vida;
  this.ataques = new Array(new Ataque("", 0), new Ataque("", 0));

  switch (this.nombre) {
    case "Goblin":
      this.ataques[0].setNombre();
      this.ataques[1].setDaño();
      break;
    case "HomoGoblin":
      this.ataques[0].setNombre();
      this.ataques[1].setDaño();
      break;
    case "Aprendiz de mago":
      this.ataques[0].setNombre();
      this.ataques[1].setDaño();
      break;
    case "Mago corrupto":
      this.ataques[0].setNombre();
      this.ataques[1].setDaño();
      break;
    case "Caballero oscuro":
      this.ataques[0].setNombre();
      this.ataques[1].setDaño();
      break;
    case "Rey maldito":
      this.ataques[0].setNombre();
      this.ataques[1].setDaño();
      break;
  }
}

Enemigo.prototype.getNombre = function(){
  return this.nombre;
}

Enemigo.prototype.getVida = function(){
  return this.vida;
}

Enemigo.prototype.getEsBoss = function(){
  return this.esBoss;
}

Enemigo.prototype.perderVida = function(dañoRecibido){
  this.vida = this.vida - dañoRecibido; 
}

Enemigo.prototype.getAtaqueRandom = function(){
  return this.nombre;
}
