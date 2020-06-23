FlappyBird.Game = function(game){
    this.bg;
    this.fg;
    this.bird;
    this.pipeUp;
    this.pipeDown;
    this.over;
    this.isPaused;
    this.isStopped;
    this.pBut;
    this.paus;
    this.playBut;
    this.resBut;
    this.score;
    this.scoreCount;
    this.speed;
    this.speedIncrement;
    this.speedIncrementScore;
    this.birdVelocity;
    this.birdVelocityMax;
    this.birdSpeedIncrement;
    this.speedMax;
    this.flySound;
    this.hitSound;
    this.selectSound;
    this.clickSound;
    this.bgMusic;
}

FlappyBird.Game.prototype = {

    create: function(){
        this.bgMusic = this.add.audio('bgMusic');
        this.bgMusic.play('', 0, 0.3, true);
        console.log("game music started");
        this.isPaused = false;
        this.isStopped = false;
        this.bg = this.add.image(0,0, 'bg');
        this.bird = this.add.sprite(50, 100, 'bird');
        this.pipeUp = this.add.sprite(this.world.width, 0, 'pipeUp');
        this.pipeDown = this.add.sprite(this.world.width, this.pipeUp.position.y + this.pipeUp.height + 80, 'pipeDown');
        this.physics.enable(this.bird, Phaser.Physics.ARCADE);
        this.physics.enable(this.pipeUp, Phaser.Physics.ARCADE);
        this.physics.enable(this.pipeDown, Phaser.Physics.ARCADE);
        this.pipeUp.enableBody = true;
        this.pipeUp.body.immovable = true;
        this.pipeDown.enableBody = true;
        this.pipeDown.body.immovable = true;
        this.fg = this.add.image(0, this.world.height - 118, 'fg');
        this.pBut = this.add.sprite(this.world.centerX, this.world.height - 50, 'pBut');
        this.pBut.inputEnabled = true;
        this.pBut.events.onInputDown.add(this.clickedPause, this);
        this.pBut.anchor.set(0.5);
        this.bg.inputEnabled = true;
		this.bg.events.onInputDown.add(this.fly, this);
        this.input.addPointer();
        this.scoreCount = 0;
        this.score = this.add.bitmapText(10, 10, 'retro', 'SCORE: ' + this.scoreCount, 14);
        this.speed = -60;
        this.speedIncrement = 9;
        this.speedIncrementScore = 3;
        this.birdVelocity = 60;
        this.birdVelocityMax = 200;
        this.speedMax = -200;
        this.birdSpeedIncrement = 7;
        this.flySound = this.add.audio('a_fly', 0.1, false);
        this.hitSound = this.add.audio('a_hit');
        this.selectSound = this.add.audio('a_select');
        this.clickSound = this.add.audio('click');
    },

    fly: function(){
        if(!this.isPaused && !this.isStopped){
         this.bird.body.velocity.y =-this.birdVelocity;
        }
    },

    clickedPause: function(){
        this.clickSound.play();
        this.isPaused = !this.isPaused;
        if(this.pBut){
            this.pBut.destroy();
           }
        if(this.playBut){
            this.playBut.destroy();
           }
        this.updatePauseButtonState();
    },

    updatePauseButtonState: function(){
        if(this.isPaused){
                this.bgMusic.pause();
                this.playBut = this.add.sprite(this.world.centerX, this.world.height - 50, 'playBut');
                this.playBut.inputEnabled = true;
                this.playBut.anchor.set(0.5);
                this.playBut.events.onInputDown.add(this.clickedPause, this);
        }
        else{
            this.bgMusic.resume();
            this.pBut = this.add.sprite(this.world.centerX, this.world.height - 50, 'pBut');
            this.pBut.inputEnabled = true;
            this.pBut.anchor.set(0.5);
            this.pBut.events.onInputDown.add(this.clickedPause, this);
        }
    },

    update: function(){
            this.updatePipes();
            if(this.input.activePointer.isDown){
              this.fly();
            }
            else{
                this.updateBird();
            }

            this.physics.arcade.collide(this.bird, this.pipeUp, this.gameOver, null, this);
            this.physics.arcade.collide(this.bird, this.pipeDown, this.gameOver, null, this);

    },

    restartGame: function(){
        this.clickSound.play();
        this.state.start('StartMenu');
    },

    gameOver: function(){
        this.hitSound.play();
        this.bird.kill();
        this.bgMusic.stop();
        this.isStopped = true;
        this.over = this.add.sprite((this.world.width/2) - 100, this.world.height/2 - 60, 'over');
        if(this.pBut){
            this.pBut.destroy();
           }
        if(this.playBut){
            this.playBut.destroy();
           }

        // add restart button
        this.resBut = this.add.sprite(this.world.centerX, this.world.height - 50, 'resBut');
        this.resBut.inputEnabled = true;
        this.resBut.anchor.set(0.5);
        this.resBut.events.onInputDown.add(this.restartGame, this);
    },


    pauseGame: function(){
        if(this.isPaused){
           this.bird.body.velocity.y = 0;
            this.pipeUp.body.velocity.x = 0;
            this.pipeDown.body.velocity.x = 0;
            this.paus = this.add.sprite((this.world.centerX), this.world.centerY, 'paus');
            this.paus.anchor.set(0.5);
       }
        this.isPaused = !this.isPaused;


    },

    updateBird: function(){
        if(!this.isPaused && !this.isStopped){
            if(this.bird.position.y + this.bird.height < this.world.height - this.fg.height){
                this.bird.body.velocity.y = this.birdVelocity;
            }
            else{
                this.bird.body.velocity.y = 0;
            }
        }
        else{
            this.bird.body.velocity.y = 0;
        }

    },


    updatePipes: function(){
        if(this.isPaused || this.isStopped){
            this.pipeUp.body.velocity.x = 0;
            this.pipeDown.body.velocity.x = 0;
            return;
        }
        // keep moving pipes if not reached the start
        if(this.pipeUp.position.x + this.pipeUp.width >=0){
            this.pipeUp.body.velocity.x = this.speed;
            this.pipeDown.body.velocity.x = this.speed;
            if(this.pipeUp.x + this.pipeUp.width < this.bird.position.x && (this.pipeUp.x + this.pipeUp.width) > (this.bird.position.x-1)){
               this.selectSound.play();
               }
        }
        else{
            // reset pipe position x to max
            this.pipeUp.position.x = this.bg.width;
            this.pipeDown.position.x = this.bg.width;

            // update position y to random
            var newPos =  Math.floor(Math.random() * (242 - 30) ) + 30;
            newPos = newPos - 242;

            // move up for the new position
            if( this.pipeUp.position.y > newPos){
                this.pipeUp.position.y = ( this.pipeUp.position.y+242) - (( this.pipeUp.position.y+242) - newPos);

            }

            // move down for the new position
            else if( this.pipeUp.position.y < newPos){
                 this.pipeUp.position.y = ( this.pipeUp.position.y+242) + (newPos - ( this.pipeUp.position.y+242));
            }

            this.pipeDown.position.y = this.pipeUp.position.y + this.pipeUp.height + 80;
            this.scoreCount++;
            this.score.text = "SCORE: " + this.scoreCount;
            if(this.scoreCount%this.speedIncrementScore === 0){
                if(this.speed - this.speedIncrement >= this.speedMax){
                   this.speed -= this.speedIncrement;
                    console.log("speed increased to :" + this.speed);
                   }
                else{
                    this.speed = this.speedMax;
                    console.log("MAX SPEED!");
                }
                if(this.birdVelocity + this.birdSpeedIncrement  <= this.birdVelocityMax){
                    this.birdVelocity += this.birdSpeedIncrement;
                    console.log("bird speed increased to :" + this.birdVelocity);
                   }
                else{
                    this.birdVelocity = this.birdVelocityMax;
                    console.log("MAX BIRD POWER!");
                }
               }

        }
    }
}
