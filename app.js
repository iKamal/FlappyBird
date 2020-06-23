
    console.log("Loaded!");

    //context
    var c = document.getElementById("can");
    var ctx = c.getContext("2d");
    c.style.border = "1px solid red";

    //resources
    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeUp = new Image();
    var pipeDown = new Image();
    var pauseImg = new Image();
    pauseImg.src= "images/paus.png";
    var fly = new Audio();
    fly.src = "sounds/fly.mp3";
    bird.src = "images/bird.png";
    bg.src = "images/bg.png";
    fg.src = "images/fg.png";
    pipeUp.src = "images/pipeNorth.png";
    pipeDown.src = "images/pipeSouth.png";

    ctx.font = "30px Arial";


    //positions
    var birdY = 0;
    var birdX = 50;
    var pipeUpX = c.width;
    var pipeUpY = 0;
    var pipeDownX = c.width;

    var speed = 1;
    var speedIncrement = 0.009;
    var score = 0;

    var pause = false;

    //add event listener to any key press
    document.addEventListener("keydown",moveUp);

    function moveUp (event){
        if(event.keyCode === 38 && !pause){
            birdY -= 25;
            if(birdY <=0){
                birdY = 0;
            }
            fly.play();
        }
        else
        pause = !pause;
    }

    var getNewPipePosition = ()=> {
        var newPos =  Math.floor(Math.random() * (242 - 30) ) + 30;
        newPos = newPos - 242;

        if(pipeUpY > newPos){
            pipeUpY = (pipeUpY+242) - ((pipeUpY+242) - newPos);

        }
        else if(pipeUpY < newPos){
            pipeUpY = (pipeUpY+242) + (newPos - (pipeUpY+242));
        }



    }

    //draw
    draw = ()=>{
        ctx.drawImage(bg, 0,0);
        ctx.drawImage(pipeUp, pipeUpX, pipeUpY);
        ctx.drawImage(pipeDown, pipeDownX, (pipeUpY + pipeUp.height) + 85);
        ctx.drawImage(fg, 0,394);
        ctx.drawImage(bird, birdX, birdY);
        if(!pause){
            if(birdY + bird.height < bg.height - fg.height){
                birdY = birdY+2;
            }
            pipeUpX -= speed;
            pipeDownX-= speed;
        }



        if(pipeUpX<=0 && pipeDownX <= 0 && !pause){
            pipeUpX = c.width;
            pipeDownX = c.width;
            getNewPipePosition();
            score++;
        }
        if(score>0 && score%10 == 0 && !pause){
            speed += speedIncrement;
        }

        if(pause){
            ctx.drawImage(pauseImg, (c.width/2) - 100, c.height/2 - 60);
        }


        document.getElementById("score").innerText = "Score: "+ score;
        requestAnimationFrame(draw);
    };

    draw();

