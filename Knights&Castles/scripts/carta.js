function Carta(
            nombre, 
            tipo,
            daño,
            armadura,
            curacion,
            mana,
            rutaImg
            )
{
    this.nombre = nombre;
    this.tipo = tipo;   //Ataque, Escudo, Magia
    this.daño = daño;
    this.armadura = armadura;
    this.curacion = curacion;
    this.mana = mana;
    this.rutaImg = rutaImg;
  this.cartaBloqueada = false;
}

Carta.prototype.toString = function(){
      var txt = 
      "Nombre: " + this.nombre +
      "\nTipo: " + this.tipo + 
      "\nDaño de ataque: " + this.daño + 
      "\nAumento armadura: " + this.armadura + 
      "\nCuracion: " + this.curacion +
      "\nCoste de maná: " + this.mana +
      "\nRuta de la imagen: " + this.rutaImg
      "\n"
      return console.log(txt);
}

Carta.prototype.getNombre = function(){
    return this.nombre;
}

Carta.prototype.getTipo = function(){
    return this.tipo;
}

Carta.prototype.getMana = function(){
    return this.mana;
}

Carta.prototype.getDaño = function(){
    return this.daño;
}

Carta.prototype.getArmadura = function(){
    return this.armadura;
}

Carta.prototype.getCuracion = function(){
    return this.curacion;
}

Carta.prototype.getRutaImg = function(){
    return this.rutaImg;
}

Carta.prototype.setDisabledCard = function(){
  this.cartaBloqueada = true;
}

Carta.prototype.setActiveCard = function(idCarta){
  this.cartaBloqueada = false;
}

Carta.prototype.getBloqueoCarta = function(){
  return this.cartaBloqueada;
}



