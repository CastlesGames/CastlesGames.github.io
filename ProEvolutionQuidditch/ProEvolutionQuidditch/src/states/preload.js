ProEvolutionQuidditch.preloadState = function(game) {

}

ProEvolutionQuidditch.preloadState.prototype = {

    preload: function() {
        var text = "Cargando Assets";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(game.world.centerX - 300, 0, text, style);

        game.load.image('backgroundMenu', 'assets/images/background/background.png')
        game.load.image('backgroundLevel', 'assets/images/background/stadium1.png');
        game.load.image('harry', 'assets/images/harry.png');
        game.load.image('snitch', 'assets/images/snitch.png');
        game.load.image('griffindor', 'assets/images/griffindor.png');
        game.load.image('title', 'assets/images/text/title.png');
        game.load.image('pressStart', 'assets/images/text/start.png');

        game.load.image('referee', 'assets/images/referee.png');
        game.load.image('backgroundIntro', 'assets/images/background/background2.png');
        game.load.image('clean', 'assets/images/text/cleangame.png');
    },

    create: function() {
        game.state.start('menuState');
    },

    update: function() {

    }
}