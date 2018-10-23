ProEvolutionQuidditch.menuState = function(game) {

}

var sKey;

ProEvolutionQuidditch.menuState.prototype = {

    preload: function() {
        //Iniciamos tecla 'p'
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

    },

    create: function() {

        bg = game.add.sprite(0, 0, 'backgroundMenu');

        snitch = game.add.sprite(400, 60, 'snitch');
        snitch.anchor.setTo(0.5);

        title = game.add.sprite(400, 120, 'title');
        title.anchor.setTo(0.5);
        title.scale.setTo(0.5, 0.5);

        griffindor = game.add.sprite(400, 300, 'griffindor');
        griffindor.anchor.setTo(0.5);
        griffindor.scale.setTo(0.8, 0.8);

        harry = game.add.sprite(200, 300, 'harry');
        harry.anchor.setTo(0.5);
        harry.scale.setTo(0.7, 0.7);

        harry2 = game.add.sprite(600, 300, 'harry');
        harry2.anchor.setTo(0.5);
        harry2.scale.setTo(0.7, 0.7);
        harry2.scale.x *= -1;

        pressStart = game.add.sprite(400, 500, 'pressStart');
        pressStart.anchor.setTo(0.5);
    },

    update: function() {
        if (this.sKey.isDown) {
            game.state.start('introState');
        }
    }
}