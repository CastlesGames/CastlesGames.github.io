var player;
var cartas;
var items;
var nivelTutorial;

function init() {
  //Se instancia un nuevo jugador
  player = new Jugador("Gerald");
  nivelTutorial = new NivelTutorial();

  //Se crean el array de Cartas
  cartas = new Array(
    new Carta("Espadazo", "Ataque", 10, 0, 0, 1, "/../assets/imgs/cartas/carta-espadazo.png"),
    new Carta("Mazazo", "Ataque", 25, 0, 0, 2, "/../assets/imgs/cartas/carta-mazazo.png"),
    new Carta("Golpe de escudo", "Ataque", 5, 10, 0, 1, "/../assets/imgs/cartas/carta-golpeDeEscudo.png"),
    new Carta("Flechazo", "Ataque", 7, 0, 0, 1, "/../assets/imgs/cartas/carta-flechazo.png"),
    new Carta("Incremento de armadura", "Escudo", 0, 10, 0, 1, "/../assets/imgs/cartas/carta-incrementoDeArmadura.png"),
    new Carta("Incremento de armadura II", "Escudo", 0, 25, 0, 2, "/../assets/imgs/cartas/carta-incrementoDeArmadura2.png"),
    new Carta("Fortificacion", "Escudo", 0, 50, 0, 3, "/../assets/imgs/cartas/carta-fortificacion.png"),
    new Carta("Bola de fuego", "Magia", 35, 0, 0, 2, "/../assets/imgs/cartas/carta-bolaDeFuego.png"),
    new Carta("Curar", "Magia", 0, 0, 15, 1, "/../assets/imgs/cartas/carta-curar.png"),
    new Carta("Curar II", "Magia", 0, 0, 25, 2, "/../assets/imgs/cartas/carta-curar2.png"),
    new Carta("Destello", "Magia", 0, 0, 0, 2, "/../assets/imgs/cartas/carta-destello.png"),
  )

  //Se crea el array de Items
  items = new Array(
    new Item("Armadura de cuero", "Armadura", 10, 0, 1, 0, 0),
    new Item("Armadura de metal", "Armadura", 15, 0, 2, 0, 0),
    new Item("Armadura de oro", "Armadura", 20, 0, 3, 0, 0),
    new Item("Armadura legendaria", "Armadura", 50, 0, 5, 0, 0),
    new Item("Espada rota", "Arma", 0, 1, 0, 0, 0),
    new Item("Espada", "Arma", 0, 2, 0, 0, 0),
    new Item("Hacha de combate", "Arma", 0, 3, 0, 0, 0),
    new Item("Excalibur", "Arma", 0, 5, 0, 0, 0),
    new Item("Colgante de rubí", "Amuleto", 0, 0, 0, 2, 0),
    new Item("Anillo de zafiro", "Amuleto", 0, 0, 0, 0, 1),
    new Item("Moneda del Rey", "Amuleto", 5, 2, 2, 0, 1),
    new Item("Corona del Rey", "Amuleto", 20, 1, 1, 1, 2),
  )

  initCartas();
  initItems();
}

function initCartas() {
  var manoJugador = player.getManoCartas();
  player.changeCarta(cartas[Math.floor((cartas.length-3) * Math.random())], 0);
  player.changeCarta(cartas[Math.floor((cartas.length-3) * Math.random())], 1);
  player.changeCarta(cartas[Math.floor((cartas.length-3) * Math.random())], 2);
  player.changeCarta(cartas[Math.floor((cartas.length-3) * Math.random())], 3);
  
  
  $('#carta1').css("background-image", "url(" + manoJugador[0].getRutaImg() + ")"); 
  $('#carta2').css("background-image", "url(" + manoJugador[1].getRutaImg() + ")"); 
  $('#carta3').css("background-image", "url(" + manoJugador[2].getRutaImg() + ")"); 
  $('#carta4').css("background-image", "url(" + manoJugador[3].getRutaImg() + ")"); 
}

function initItems() {
  player.addItem(items[Math.floor(items.length * Math.random())]);
  player.addItem(items[Math.floor(items.length * Math.random())]);
  player.addItem(items[Math.floor(items.length * Math.random())]);
}

$("#carta1").click(function(){
  player.perderVida(20);
});

$("#carta2").click(function(){
   player.addItem(items[11]);
});

$("#carta3").click(function(){
   player.perderVida(5);
});

$("#carta4").click(function(){
   player.restaurarVida();
});

$("#jugarBtn").click(function(){
    nivelTutorial.nextSala();
});

$("#sceneToRight").click(function(){
  nivelTutorial.nextSala();
});


