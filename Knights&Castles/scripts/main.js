//Armaduras deberían almacenarse en una matriz.
var item1 = new Item("Armadura legendaria", "Armadura", 50, 0, 5, 0, 0);
var item2 = new Item("Hacha de combate", "Arma", 10, 3, 0, 0, 0);
var item3 = new Item("Moneda del Rey", "Amuleto", 5, 2, 2, 0, 1);
var item4 = new Item("Anillo del diablo", "Amuleto", 10, 4, 4, 1, 2);

//Se instancia un nuevo jugador
var player = new Jugador("Gerald");

console.log("Jugador sin inventario (POR DEFECTO):");
player.toString();


console.log("Jugador dañado (ha recibido 68 de daño)");
player.perderVida(68);
player.toString();

console.log("Jugador con ARMADURA LEGENDARIA, HACHA DE COMBATE, MONEDA DEL REY");

console.log("Jugador encuentra ITEM 1: ")
player.addItem(item1);
player.toString();

console.log("Jugador encuentra ITEM 2: ")
player.addItem(item2);
player.toString();

console.log("Jugador encuentra ITEM 3: ")
player.addItem(item3);
player.toString();

console.log("Jugador ha pasado por enfermeria");
player.restaurarVida();
player.toString();

console.log("Jugador cambia el amuleto - VER CAMBIO DE STATS");
console.log("Jugador encuentra ITEM 4: ")
player.addItem(item4);
player.toString();

console.log("Jugador dañado (ha recibido un ataque de 20 de daño)");
player.perderVida(20);
player.toString();

