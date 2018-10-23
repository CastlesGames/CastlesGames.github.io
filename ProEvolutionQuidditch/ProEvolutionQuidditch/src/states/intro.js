ProEvolutionQuidditch.introState = function(game) {

}

var spaceKey;

ProEvolutionQuidditch.introState.prototype = {

    preload: function() {
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    create: function() {
        bg = game.add.sprite(0, 0, 'backgroundIntro');

        referee = game.add.sprite(400, 200, 'referee');
        referee.anchor.setTo(0.5);
        referee.scale.setTo(0.8, 0.8);

        clean = game.add.sprite(400, 420, 'clean');
        clean.anchor.setTo(0.5);
        clean.scale.setTo(0.5, 0.5);
    },

    update: function() {
        if (this.spaceKey.isDown) {
            game.state.start('levelState');
        }
    }
}