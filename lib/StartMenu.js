FlappyBird.StartMenu = function(game){
    this.startBG;
}

FlappyBird.StartMenu.prototype = {

    create: function(){
        console.log("create menu")
        startBG = this.add.image(0, 0, 'tbg');
        startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);
    },

    update: function(){

    },

    startGame: function(){
        this.state.start('Game');
    }
}
