FlappyBird.Preloader = function(game){

}

FlappyBird.Preloader.prototype = {

    preload: function(){
        this.load.image('bg', 'images/bg.png');
        this.load.image('tbg', 'images/tbg.png');
        this.load.image('fg', 'images/fg.png');
        this.load.image('bird', 'images/aBird.png');
        this.load.image('pipeUp', 'images/pipeNorth.png');
        this.load.image('pipeDown', 'images/pipeSouth.png');
        this.load.image('over', 'images/over.png');
        this.load.image('pBut', 'images/pBut.png');
        this.load.image('paus', 'images/paus.png');
        this.load.image('playBut', 'images/playBut.png');
        this.load.image('resBut', 'images/res.png');
        this.load.bitmapFont('retro', 'fonts/retro.png', 'fonts/retro.fnt');
        this.load.audio('a_fly', 'sounds/sfx_wing.wav');
        this.load.audio('a_hit', 'sounds/sfx_hit.wav');
        this.load.audio('a_select', 'sounds/sfx_point.wav');
        this.load.audio('tick', 'sounds/boy.wav');
        this.load.audio('click', 'sounds/click.wav');
    },

    create: function(){
        console.log("preload create");
        this.tickSound = this.add.audio('tick');
        this.tickSound.play('', 0, 0.3, false);
    },

    update: function(){
        this.ready = true;
        this.state.start('StartMenu');
    }
}
