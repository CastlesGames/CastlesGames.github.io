# *Wanted: Point and Shot (provisional)*
Título
: Documento de diseño de juego - *Wanted: Point and Shot (provisional)*

Autores
: Díaz Pérez, Diego
: Laso Cáceres, Juan Carlos
: Mena Molina, Guillermo
: Rodríguez Corpas, Laura
: Rodríguez Martínez, Francisco Javier

## 1. Concepto
   + **Título**:  *Wanted: Point and Shot (provisional)*.
   + **Estudio**: *Castle's Games*.
   + **Género**: Arcade.
   + **Arte**: 3D con estilo *cartoon*.
   + **Plataforma**: Smartphone y PC (Web Version)*.
   + **Versión:** 1.0.
   + **Sinopsis de jugabilidad y contenido**: *Wanted: Point and Shot (provisional)* es un juego arcade basado en progresión de niveles con una ambientación western donde el protagonista tiene que derrotar a los enemigos disparando su arma.
   + **Categoría**: *XXX* se puede comparar con el videojuego *Bounzy*, ya que tiene las mismas mecánicas. El valor diferenciador del juego es la temática Western. 
   + **Licencia**: *XXX* es totalmente original y no está basado en ningún libro o película. 
   + **Mecánica**: El protagonista utiliza su arma para disparar balas que rebotarán entre los enemigos mediante un sistema de físicas. Cada vez que una bala toque a un enemigo éste perderá un porcentaje de salud.
   + **Tecnología**: El juego será desarrollado íntegramente en **Unity**.  En cuanto al arte del videojuego, se utilizará el programa ***Adobe Photoshop CC 2018*** del paquete *Adobe*. Para el modelado en 3D se utilizarán ***Maya*** y ***3DS Max***.
   + **Público**: El público objetivo está entre el rango de edades de 16 a 30 años. Entre ellos, jugadores masculinos que disfruten la ambientación western y prefieran partidas rápidas o no tengan demasiado tiempo para dedicarle al juego.

## 2. Historial de versiones
| Versión 	| Fecha 	 | Comentarios|
|:---------:|:----------:|------------|
| 0.0 		| 19/11/2018 | Planteamiento del juego y construcción inicial del Documento de Diseño de Juego (*Game Document Design - G.D.D.*)|
| 0.1		| 30/11/2018 | Se definen *mecánicas*, *arte del juego*, *estructuración de niveles* |
| 1.0 		| 05/12/2018 | Se completa la primera versión del *G.D.D.* de *XXX*|

## 3. Visión general del videojuego
*Wanted: Point and Shot (provisional)* es un videojuego de género Arcade Free to Play en el que combina la fase de acción de Bounzy y una temática Western low poly, novedosa para este género. 

El jugador encarna al Sherif del condado cuya misión es acabar con la delincuencia, en cada nivel el jugador se encontrará con distintos enemigos y un boss final. El juego se basa en una progresión de niveles procedural en los que se aumenta la dificultad.

La fase de acción se basa en un sistema de turnos y una mecánica de disparo, en la que el jugador apunta hacia una parte de la pantalla y dispara una serie de elementos (balas) que rebotan en el escenario a través de un sistema de físicas, estos elementos infringen daño a los enemigos del tablero y dichos enemigos caen una posición en el tablero cada turno, cuando llegan al personaje del jugador le infringen daño.

 - Fase de acción - Bounzy
 
<img alt="Gameplay" src="assets/gameplay.png">

## 4. Mecánicas
   + **Cámara:** Videojuego en 3D con una cámara estática. Plano *top-down*. El jugador puede ver en todo momento todos los elementos del nivel.
   + **Controles:** En PC el jugador apunta moviendo el cursor del ratón y dispara haciendo *clic*. En *Smartphone* se apunta manteniendo el dedo pulsado en la dirección hacia la que quieres disparar y disparas levantando el dedo de la pantalla.
   + **Puntuación:** La puntuación final que haya obtenido el jugador es el número de nivel al que haya llegado.
   + **Guardar/Cargar:** El progreso del jugador se guardará automáticamente. Al iniciar el juego seguirás en el nivel en el que acabaras la última vez.
   + **Niveles**: El número de niveles será infinito y se generarán de forma procedural, el jugador puede avanzar niveles continuamente. Cada nivel se divide en un número de enemigos y un boss final.

## 5. Estados del juego
A continuación se presenta el diagrama de estados del juego sobre las posibles pantallas de la interfaz en las que el jugador se puede encontrar:

<img alt="Diferentes estados del juego" src="assets/estados.png" >

> Diferentes estados del juego

Estos estados se describen más detenidamente en el apartado siguiente - ***6. Interfaces***

## 6. Interfaces
   + **Menú principal**: Es la pantalla inicial que se encuentra el jugador al iniciar el juego. El jugador podrá localizar en ella dos botones con los que tendrá la opción de abrir el menú de opciones y de iniciar una partida. Estos botones se disponen alineados verticalmente uno encima de otro con una separación entre ellos. No hay *background*, en su defecto se enseña el propio escenario en el que se jugará la partida.
      + Estados del juego: 
	      + Hacia el **menú de opciones** pulsando en el botón *Opciones*.
	      + Hacia la **pantalla de juego** pulsando en el botón *Play*.
   + **Menú de opciones**: Pantalla en la cual el jugador puede eligir el *idioma* del juego (Castellano o Inglés) y habilitar/deshabilitar la *música y sonido*. Además, en esta pantalla se podrán ver los créditos del juego. La pantalla dispondrá de un botón para volver al *menú principal*.
      + Estados del juego: 
	      + Hacia el **menú principal** pulsando en el botón con una flecha la cual indica *volver a la pantalla anterior*.
   + **Pantallas de juego /** ***Heads-up Display***: pantalla que muestra toda la información necesaria al jugador durante la partida. Se distribuyen de la siguiente manera:
	   + PC: 
			+ El jugador siempre aparecerá en la parte inferior de la pantalla, dejando el resto de la pantalla para ver a los enemigos.
		   + La barra de vida del jugador se colocará en la esquina inferior izquierda de la pantalla y en color verde.
		   + El número de nivel en el que se encuentra el jugador aparecerá en la esquina superior izquierda.
		   + En la esquina superior derecha se le mostrará un botón de pausa al jugador para que pueda pausar la partida en cualquier momento. Esta acción también podrá llevarse a cabo pulsando la tecla *p* en el teclado en el caso de *PC*.
	   + Estados del juego:
		   +  Hacia el **menú de pausa** pulsando sobre el botón de pausa situado en la esquina superior derecha.
   + **Pantalla de pausa**: Pantalla donde el jugador puede parar el estado de la partida, durante el tiempo que quiera. Esta pantalla dispondrá de dos botones para volver al menú principal o bien reanudar la partida. Estos botones se encuentran centrados en pantalla y alineados verticalmente uno del otro. 
      + Estados del juego: 
	      + Hacia el **menú principal** pulsando en el botón *Menú principal*.
	      + Hacia la **pantalla de juego** pulsando en el botón *Volver al juego*.
   + **Pantalla fin del juego / puntuación**: Pantalla donde se le muestra la puntuación obtenida al finalizar el juego. Consta de la información y un sólo botón para volver al menú principal, ya sea para comenzar una partida nueva o salir del juego.
      + Estados del juego:
	      + Hacia el **menú principal** pulsando en el botón *Menú principal*.
      
## 7. Niveles
El juego consta de **tres niveles** en los cuales la dificultad de los enemigos irá aumentando para el jugador. 

Cada nivel consta de **cinco salas** y la estructura de cada nivel será de una primera sala fija, tres salas aleatorias y la sala final con el *Enemy Boss* correspondiente a ese nivel. ***El jugador no podrá volver hacia una sala anterior o nivel anterior en ningún momento***.

En las tres salas aleatorias el jugador se podrá encontrar diferentes sucesos los cuales aparecerán de forma totalmente aleatoria en cada partida. :
+ Un **enemigo**: da lugar a un combate.
+ Un **cofre**: el jugador puede obtener nuevas cartas o *items* con los que equiparse.
+ Un **evento aleatorio**:
+ Una **enfermería**: el jugador recupera sus puntos de vida perdidos en combates anteriores.  

El jugador deberá atravesar todas las salas para avanzar al siguiente nivel. Una vez el jugador derrote al enemigo final del nivel podrá avanzar al siguiente nivel de la partida.

A continuación se describe con más detalle los tres niveles del juego:

+ ***Nivel 1*** **- Entrada**
	+ **Entrada**:  primer nivel del juego y el más sencillo. Este nivel consta de cinco salas. La 1ª Sala será un combate contra un enemigo básico, que nos servirá también como tutorial para aprender las mecánicas básicas del juego. Luego encontraremos tres salas más donde se darán los diferentes sucesos descritos anteriormente. Por último, una sala final con el *Enemy Boss* de este nivel. Una vez derrotado se abrirá la opción de elegir entre **tres caminos** para avanzar.
		+ *Objetivos*: el jugador deberá atravesar todas las salas para avanzar al siguiente nivel. Una vez el jugador derrote al enemigo final del nivel podrá avanzar al siguiente nivel de la partida.
		+ *Enemigos*: Goblin, HomoGoblin.
		+ *Música y efectos de sonido*: 
 + ***Nivel 2*** **- Torreón / Jardines / Mazmorras**
	 + **Torreón**: segundo nivel del juego con una dificultad intermedia. Este nivel consta de cinco salas. La 1ª Sala será una sala con cofre para recompensar al jugador por haber derrotado al *Enemy Boss* del nivel anterior. En esta sala también nos curaremos la vida por completo. Luego encontraremos tres salas más donde se darán los diferentes sucesos descritos anteriormente. Por último, una sala final con el *Enemy Boss* de este nivel. Una vez derrotado podremos avanzar hacia la **Torre de Magia**.
		+ *Objetivos*: el jugador deberá atravesar todas las salas para avanzar al siguiente nivel. Una vez el jugador derrote al enemigo final del nivel podrá avanzar al siguiente nivel de la partida.
		+ *Enemigos*: Aprendiz de mago, Mago corrupto.
		+ *Música y efectos de sonido*: 
	 + **Jardines**: segundo nivel del juego con una dificultad intermedia. Este nivel consta de cinco salas. La 1ª Sala será una sala con cofre para recompensar al jugador por haber derrotado al *Enemy Boss* del nivel anterior. En esta sala también nos curaremos la vida por completo. Luego encontraremos tres salas más donde se darán los diferentes sucesos descritos anteriormente. Por último, una sala final con el *Enemy Boss* de este nivel. Una vez derrotado podremos avanzar hacia el **Salón de fiestas**.
		+ *Objetivos*: el jugador deberá atravesar todas las salas para avanzar al siguiente nivel. Una vez el jugador derrote al enemigo final del nivel podrá avanzar al siguiente nivel de la partida.
		+ *Enemigos*: Aprendiz de mago, Mago corrupto.
		+ *Música y efectos de sonido*: 
	 + **Mazmorras**: segundo nivel del juego con una dificultad intermedia. Este nivel consta de cinco salas. La 1ª Sala será una sala con cofre para recompensar al jugador por haber derrotado al *Enemy Boss* del nivel anterior. En esta sala también nos curaremos la vida por completo. Luego encontraremos tres salas más donde se darán los diferentes sucesos descritos anteriormente. Por último, una sala final con el *Enemy Boss* de este nivel. Una vez derrotado podremos avanzar hacia los **Aposentos de los guardias**.
		+ *Objetivos*: el jugador deberá atravesar todas las salas para avanzar al siguiente nivel. Una vez el jugador derrote al enemigo final del nivel podrá avanzar al siguiente nivel de la partida.
		+ *Enemigos*: Aprendiz de mago, Mago corrupto.
		+ *Música y efectos de sonido*: 
  + ***Nivel 3*** **- Torre de magia / Salón de fiestas / Aposentos de los guardias / Sala del Trono**
	 + **Torre de magia**: tercer nivel del juego con una dificultad alta. Este nivel consta de cinco salas. La 1ª Sala será una sala con cofre para recompensar al jugador por haber derrotado al *Enemy Boss* del nivel anterior. En esta sala también nos curaremos la vida por completo. Luego encontraremos tres salas más donde se darán los diferentes sucesos descritos anteriormente. Al superar la cuarta sala, accederemos a la **Sala del Trono** para enfrentarnos al *Boss* final del juego.
		+ *Objetivos*: el jugador deberá completar todas las salas del nivel para poder acceder a la Sala del Trono.
		+ *Enemigos*: Caballero oscuro.
		+ *Música y efectos de sonido*: 
	 + **Salón de fiestas**: tercer nivel del juego con una dificultad alta. Este nivel consta de cinco salas. La 1ª Sala será una sala con cofre para recompensar al jugador por haber derrotado al *Enemy Boss* del nivel anterior. En esta sala también nos curaremos la vida por completo. Luego encontraremos tres salas más donde se darán los diferentes sucesos descritos anteriormente. Al superar la cuarta sala, accederemos a la **Sala del Trono** para enfrentarnos al *Boss* final del juego.
		+ *Objetivos*: el jugador deberá completar todas las salas del nivel para poder acceder a la Sala del Trono.
		+ *Enemigos*: Caballero oscuro.
		+ *Música y efectos de sonido*: 
	 + **Aposentos de los guardias**: tercer nivel del juego con una dificultad alta. Este nivel consta de cinco salas. La 1ª Sala será una sala con cofre para recompensar al jugador por haber derrotado al *Enemy Boss* del nivel anterior. En esta sala también nos curaremos la vida por completo. Luego encontraremos tres salas más donde se darán los diferentes sucesos descritos anteriormente. Al superar la cuarta sala, accederemos a la **Sala del Trono** para enfrentarnos al *Boss* final del juego.
		+ *Objetivos*: el jugador deberá completar todas las salas del nivel para poder acceder a la Sala del Trono.
		+ *Enemigos*: Caballero oscuro.
		+ *Música y efectos de sonido*: 
	 + **Sala del trono**: último nivel del Juego, solo dispone de una sala. Esta es el combate más complicado de todo el juego ya que nos enfrentaremos al *Final Boss*.
		+ *Objetivos*: el jugador deberá derrotar al *Final Boss* del juego para poder ganar la partida.
		+ *Enemigos*: Rey maldito
		+ *Música y efectos de sonido*: 
## 8. Progreso del juego
En la siguiente ilustración se muestra el diagrama de progreso de juego:

<img alt="Progreso del juego" src="imgs/progreso-juego.jpeg">

> Diagrama progreso de juego


## 9. Personaje/s
   - **Personaje principal**:
	  + *Nombre*: se desconoce.
      + *Descripción*: Es el sheriff encargado de eliminar a los bandidos.
      + *Concepto*: El personaje será un varón adulto. Su vestimenta tendrá estilo cowboy.
      + *Encuentro*: El jugador se encontrará con este personaje al iniciar cada partida, y jugará siempre con él.
      + *Características*: El personaje solo tendrá una salud máxima.
      + *Jugable/No-Jugable*: Jugable.
 
## 10. Enemigos
A continuación se da una breve descripción de los personajes que sirven de enemigo para el jugador en el juego:
   - **Enemigo Verde**
      + *Nombre*: **Forajido**.
      + *Descripción*: Enemigos de color verde, son los más débiles del juego.
      + *Imagen*:
      + *Salud*: 5.
      + *Ataque*: 1.
   - **Enemigo Azul**
      + *Nombre*: **Forajido**.
      + *Descripción*: Enemigos de color azul, es 
      + *Imagen*:
      + *Salud*: 10.
      + *Ataque*: 3.
    
## Logros

## Música y sonidos

## Imágenes de concepto
A continuación se muestran algunos primeros *concepts* del juego.

+ **Pantalla de juego**

<img alt="Pantalla de juego" src="assets/Concept - Pantalla de juego.png">

## Miembros del equipo
1. Game designer
2. Programadores
3. Artistas 2D
4. Maquetadores web

## Detalles de produccion
Fecha de inicio del videojuego: ***13 noviembre 2018***
Fecha de terminación del videojuego: ***21 diciembre 2018***

