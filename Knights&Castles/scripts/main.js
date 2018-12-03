/*Variables globales*/
var player, cartas, items;
var nivelTutorial;
var cofre, enfermeria, combate;
var numNivel = 1;
var numCombateBoss = 0;
var nombreLocalizacion;
var enTutorial = true;
var dificultadNormal = true;
var isPaused = false;
var contador_seg, contador_min, seg, min, cronometro;
var gameUser;
var gameTimeMin;
var gameTimeSeg;
var bestUser;
var bestTimeMin;
var bestTimeSeg

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var currentEscenario;
var escenarioEntrada = [new Image(), new Image(), new Image(), new Image()];
var escenarioTorreon = [new Image(), new Image(), new Image(), new Image()];
var escenarioJardines = [new Image(), new Image(), new Image(), new Image()];
var escenarioMazmorras = [new Image(), new Image(), new Image(), new Image()];
var escenarioTorreMagia = [new Image(), new Image(), new Image(), new Image()];
var escenarioSalon = [new Image(), new Image(), new Image(), new Image()];
var escenarioAposentos = [new Image(), new Image(), new Image(), new Image()];

/************************/

function init() {
  var i;

  console.log("local storage");
  for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
  }

  initEscenarios();

  //Se instancia un nuevo jugador
  player = new Jugador("Gerald");

  //Se crean el array de Cartas
  cartas = new Array(
    new Carta("Espadazo", "Ataque", 10, 0, 0, 1, "assets/imgs/cartas/carta-espadazo.png"),
    new Carta("Mazazo", "Ataque", 25, 0, 0, 2, "assets/imgs/cartas/carta-mazazo.png"),
    new Carta("Golpe de escudo", "Ataque", 5, 10, 0, 1, "assets/imgs/cartas/carta-golpeDeEscudo.png"),
    new Carta("Flechazo", "Ataque", 7, 0, 0, 1, "assets/imgs/cartas/carta-flechazo.png"),
    new Carta("Incremento de armadura", "Escudo", 0, 25, 0, 1, "assets/imgs/cartas/carta-incrementoDeArmadura.png"),
    new Carta("Incremento de armadura II", "Escudo", 0, 40, 0, 2, "assets/imgs/cartas/carta-incrementoDeArmadura2.png"),
    new Carta("Fortificacion", "Escudo", 0, 50, 0, 3, "assets/imgs/cartas/carta-fortificacion.png"),
    new Carta("Bola de fuego", "Magia", 25, 0, 0, 2, "assets/imgs/cartas/carta-bolaDeFuego.png"),
    new Carta("Curar", "Magia", 0, 0, 25, 1, "assets/imgs/cartas/carta-curar.png"),
    new Carta("Curar II", "Magia", 0, 0, 50, 2, "assets/imgs/cartas/carta-curar2.png"),
    new Carta("Destello", "Magia", 5, 75, 0, 2, "assets/imgs/cartas/carta-destello.png"),
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

  numNivel = 1; //
  enTutorial = true; //
  eligiendoCamino = false;
  eligiendoNivel = false;

  nivelTutorial = new NivelTutorial("Entrada", "Entrance");
  nivelTutorial.paintSala();

  $("#nombreNivelESP").text(nivelTutorial.getNombre());
  $("#nombreNivelING").text(nivelTutorial.getNombreIngles());

  startTime();
}

function initCartas() {
  var manoJugador = player.getManoCartas();

  //Inicializamos la mano del jugador (de forma random no, establecer cartas iniciales.)
  player.changeCarta(cartas[7], 0);
  player.changeCarta(cartas[3], 1);
  player.changeCarta(cartas[4], 2);
  player.changeCarta(cartas[5], 3);

  $('#carta1').css("background-image", "url(" + manoJugador[0].getRutaImg() + ")");
  $('#carta2').css("background-image", "url(" + manoJugador[1].getRutaImg() + ")");
  $('#carta3').css("background-image", "url(" + manoJugador[2].getRutaImg() + ")");
  $('#carta4').css("background-image", "url(" + manoJugador[3].getRutaImg() + ")");
}

function initEscenarios() {
  escenarioEntrada[0].src = "assets/imgs/imagenesEscenarios/entrada0.png";
  escenarioEntrada[1] = escenarioEntrada[0];
  escenarioEntrada[2] = escenarioEntrada[0];
  escenarioEntrada[3] = escenarioEntrada[0];
  escenarioSalon[0].src = "assets/imgs/imagenesEscenarios/salon0.png";
  escenarioSalon[1] = escenarioSalon[0];
  escenarioSalon[2] = escenarioSalon[0];
  escenarioSalon[3] = escenarioSalon[0];
  escenarioTorreon[0].src = "assets/imgs/imagenesEscenarios/torreon0.png";
  escenarioTorreon[1].src = "assets/imgs/imagenesEscenarios/torreon1.png";
  escenarioTorreon[2].src = "assets/imgs/imagenesEscenarios/torreon2.png";
  escenarioTorreon[3].src = "assets/imgs/imagenesEscenarios/torreon3.png";
  escenarioJardines[0].src = "assets/imgs/imagenesEscenarios/jardin0.png";
  escenarioJardines[1].src = "assets/imgs/imagenesEscenarios/jardin1.png";
  escenarioJardines[2].src = "assets/imgs/imagenesEscenarios/jardin2.png";
  escenarioJardines[3].src = "assets/imgs/imagenesEscenarios/jardin3.png";
  escenarioTorreMagia[0].src = "assets/imgs/imagenesEscenarios/torremagia0.png";
  escenarioTorreMagia[1].src = "assets/imgs/imagenesEscenarios/torremagia1.png";
  escenarioTorreMagia[2].src = "assets/imgs/imagenesEscenarios/torremagia2.png";
  escenarioTorreMagia[3].src = "assets/imgs/imagenesEscenarios/torremagia3.png";
  currentEscenario = escenarioEntrada;
  $("#canvas").css("background-image", "url(" + currentEscenario[Math.floor(Math.random() * currentEscenario.length)].src + ")");
}

function initItems() {
  player.addItem(items[0]);
  player.addItem(items[7]);
  player.addItem(items[9]);
}

function startTime() {
  isPaused = false;
  contador_seg = 0;
  contador_min = 0;

  seg = document.getElementById("segundos");
  min = document.getElementById("minutos");

  cronometro = setInterval(
    function () {
      if (!isPaused) {
        if (contador_seg == 60) {
          contador_seg = 0;
          contador_min++;
          min.innerHTML = contador_min;

          if (contador_min == 60) {
            contador_min = 0;
          }
        }

        seg.innerHTML = contador_seg;
        contador_seg++;
      }
    }, 1000);

}

function stopTime() {
  clearInterval(cronometro);
  cronometro = null;
  contador_seg = 0;
  contador_min = 0;
  min.innerHTML = contador_min;
  seg.innerHTML = contador_seg;
}
