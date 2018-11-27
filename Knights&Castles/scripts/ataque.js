function Ataque(nombre, poder){
  this.nombre = nombre;
  this.poder = poder;
}

Ataque.prototype.getNombre = function(){
  return this.nombre;
}

Ataque.prototype.setNombre = function(nombre){
  this.nombre = nombre;
}

Ataque.prototype.getDaño = function(){
  return this.poder;
}

Ataque.prototype.setDaño = function(poder){
  this.poder = poder;
}