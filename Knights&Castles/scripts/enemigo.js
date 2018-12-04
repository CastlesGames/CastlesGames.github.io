function Enemigo(nombre, esBoss, vida) {
  this.nombre = nombre;
  this.esBoss = esBoss; //boolean que indica si es boss o no
  if (dificultadNormal) {
    this.vida = vida;
  } else {
    this.vida = vida * 2;
  }

  this.ataques = new Array(new Ataque("", 0), new Ataque("", 0));
  this.rutaImg = "";
  this.dropItem = new Array(
    cartas[Math.floor(Math.random() * cartas.length)],
    items[Math.floor(Math.random() * items.length)]
  );

  switch (this.nombre) {
    case "Goblin":
      this.ataques[0].setNombre("Ataque con daga");
      this.ataques[0].setDaño(25);
      this.ataques[1].setNombre("Ataque con daga");
      this.ataques[1].setDaño(25);
      this.rutaImg = "assets/imgs/sprites/enemigos/nivel1/goblin64.png";
      break;
    case "HomoGoblin":
      this.ataques[0].setNombre("Ataque con porra");
      this.ataques[0].setDaño(45);
      this.ataques[1].setNombre("Ataque con porra");
      this.ataques[1].setDaño(45);
      this.rutaImg = "assets/imgs/sprites/enemigos/nivel1/goblin128.png";
      break;
    case "Aprendiz de mago":
      this.ataques[0].setNombre("Hechizo de fuego");
      this.ataques[0].setDaño(35);
      this.ataques[1].setNombre("Gran bola de fuego");
      this.ataques[1].setDaño(60);
      this.rutaImg = "assets/imgs/sprites/enemigos/nivel2/Apprentice128.png";
      break;
    case "Mago corrupto":
      this.ataques[0].setNombre("Gran bola de fuego");
      this.ataques[0].setDaño(50);
      this.ataques[1].setNombre("Hielo corrupto");
      this.ataques[1].setDaño(70);
      this.rutaImg = "assets/imgs/sprites/enemigos/nivel2/Mage128.png";
      break;
    case "Caballero oscuro":
      this.ataques[0].setNombre("Espadazo");
      this.ataques[0].setDaño(50);
      this.ataques[1].setNombre("Espadazo");
      this.ataques[1].setDaño(50);
      this.rutaImg = "assets/imgs/sprites/enemigos/nivel3/DarkKnigth128.png";
      break;
    case "Rey maldito":
      this.ataques[0].setNombre("Golpe de cetro");
      this.ataques[0].setDaño(75);
      this.ataques[1].setNombre("Golpe con espada");
      this.ataques[1].setDaño(90);
      this.rutaImg = "assets/imgs/sprites/enemigos/nivel3/King128.png";
      break;
  }

  if (!dificultadNormal) {
    var multiplicador = 25;
    this.ataques[0].setDaño(this.ataques[0].getDaño()+multiplicador);
    this.ataques[1].setDaño(this.ataques[1].getDaño()+multiplicador);
  } 
}

Enemigo.prototype.getNombre = function () {
  return this.nombre;
}

Enemigo.prototype.getVida = function () {
  return this.vida;
}

Enemigo.prototype.getEsBoss = function () {
  return this.esBoss;
}

Enemigo.prototype.perderVida = function (dañoRecibido) {
  this.vida = this.vida - dañoRecibido;
  $("#statsEnemigo").text(this.vida);
}

Enemigo.prototype.getAtaqueRandom = function () {
  var x = Math.floor((Math.random() * 2));
  return this.ataques[x];
}

Enemigo.prototype.getRutaImg = function () {
  return this.rutaImg;
}

Enemigo.prototype.getDropItem = function () {
  var x = Math.floor(Math.random() * 2);

  if (x == 0) {
    return this.dropItem[0]; //Dropea una carta
  } else {
    return this.dropItem[1]; //Dropea un Item
  }
}
