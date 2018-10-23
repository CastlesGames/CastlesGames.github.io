ProEvolutionQuidditch.levelState = function(game) {

}

var harry;
var bg;
var snitch;

ProEvolutionQuidditch.levelState.prototype = {

    preload: function() {
        
    },

    create: function() {
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        puntuacion = 0;

        bg = game.add.sprite(0, 0, 'backgroundLevel');
        griffindor = game.add.sprite(50, 50, 'griffindor');
        griffindor.scale.setTo(0.4, 0.4);
        griffindor.anchor.setTo(0.5);

        snitch = game.add.sprite(game.rnd.integerInRange(0, 700), game.rnd.integerInRange(0, 500), 'snitch');
        snitch.scale.setTo(0.5, 0.5);

        harry = game.add.sprite(200, 200, 'harry');
        harry.scale.setTo(0.4, 0.4);

        game.physics.enable(harry, Phaser.Physics.ARCADE);
        game.physics.enable(snitch, Phaser.Physics.ARCADE);

        text = "Puntuacion: ";
        style = { font: "40px Arial", fill: "#000000", align: "left" };
        t = game.add.text(95, 25, puntuacion, style);
    },

    update: function() {
        if (this.wKey.isDown) {
            harry.y -= 3;
        }
        if (this.sKey.isDown) {
            harry.y += 3;
        }
        if (this.aKey.isDown) {
            harry.x -= 3;
        }
        if (this.dKey.isDown) {
            harry.x += 3;
        }

        var colision = game.physics.arcade.collide(harry, snitch);

        if (colision) {
            colisionHarry();
        }

        t.destroy();
        t = game.add.text(95, 25, puntuacion, style);

        function colisionHarry() {
            snitch.destroy();
            puntuacion++;

            //Pasamos al estado ending si la puntuacion es 3
            if (puntuacion == 3) { game.state.start('endingState'); }

            snitch = game.add.sprite(game.rnd.integerInRange(0, 700), game.rnd.integerInRange(0, 500), 'snitch');
            game.physics.enable(snitch, Phaser.Physics.ARCADE);
            snitch.scale.setTo(0.5, 0.5);
        }
    }
}