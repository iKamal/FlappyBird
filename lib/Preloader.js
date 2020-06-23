FlappyBird.Preloader = function(game){
    this.ready = false;
    this.tickSound;
    this.preloadBar;
    this.loading;
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

        this.preloadBar = this.add.sprite(this.world.centerX , this.world.centerY + 100, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);

        this.loading = this.add.image(this.world.centerX, this.world.centerY, 'loading');
        this.loading.anchor.set(0.5);
    },

    create: function(){
        console.log("preload create");
        this.preloadBar.cropEnabled = false;
    },

    update: function(){
        if(this.cache.isSoundDecoded('tick') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
    }
}
