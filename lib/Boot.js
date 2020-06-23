var FlappyBird = {};

FlappyBird.Boot = function(game){};

FlappyBird.Boot.prototype = {

    preload: function(){
        this.load.image('preloaderBar', 'images/loader_bar.png');
        this.load.image('loading', 'images/loading.png');
        this.load.image('bg', 'images/bg.png');
    },

    create: function(){
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 288;
		this.scale.minHeight = 512;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);

		this.input.addPointer();
		this.stage.backgroundColor = '#7bc5cd';
        console.log("Boot");
        this.state.start('Preloader');
    }
}
