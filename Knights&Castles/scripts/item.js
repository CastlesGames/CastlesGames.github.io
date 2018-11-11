function Item(nombre,
              tipo,
              plusvida,
              plusataque,
              plusdefensa,
              plusmagia,
              plusmana){
  this.nombre = nombre;
  this.tipo = tipo;
  this.plusVida = plusvida;
  this.plusAtaque = plusataque;
  this.plusDefensa = plusdefensa;
  this.plusMagia = plusmagia;
  this.plusMana = plusmana; 
}

//METHODS

Item.prototype.toString = function (){
  var txt = 
      "Nombre: " + this.nombre +
      "\nTipo: " + this.tipo + 
      "\nPlus de vida: " + this.plusVida + 
      "\nPlus de ataque: " + this.plusAtaque + 
      "\nPlus de defensa: " + this.plusDefensa +
      "\nPlus de magia: " + this.plusMagia +
      "\nPlus de mana: " + this.plusMana + 
      "\n"
      return console.log(txt);
}

//Getters
Item.prototype.getNombre = function(){
  return this.nombre;
}
Item.prototype.getTipo = function(){
  return this.tipo;
}
Item.prototype.getPlusVida = function (){
  return this.plusVida;
}
Item.prototype.getPlusAtaque = function (){
  return this.plusAtaque;
}
Item.prototype.getPlusDefensa = function (){
  return this.plusDefensa;
}
Item.prototype.getPlusMagia = function (){
  return this.plusMagia;
}
Item.prototype.getPlusMana = function (){
  return this.plusMana;
}
