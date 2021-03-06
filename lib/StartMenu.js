FlappyBird.StartMenu = function(game){
    this.startBG;
    this.bird;
    this.clickSound;
}

FlappyBird.StartMenu.prototype = {

    create: function(){
        this.clickSound = this.add.audio('click');
        console.log("create menu")
        startBG = this.add.image(0, 0, 'tbg');
        this.bird = this.add.sprite(this.world.centerX - 20, 250, 'bird');
        this.bird.anchor.set = 0.5;
        startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);
    },

    update: function(){

    },

    startGame: function(){
        this.clickSound.play();
        this.state.start('Game');
    }
}
