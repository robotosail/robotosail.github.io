import { Resize, Player, Frame, Fruit, SnakePart, Collision, Text } from "./classes.js";
import { controlsbtn, controlsPanel } from "./customize.js";

//// constsant
    // ---- canvas
    const canvasElm = document.getElementsByTagName("canvas");
    canvasElm[0].setAttribute("id", "canvas");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // ----
    
    // ---- buttons
    const playbtn = document.getElementById("playbtn");
    const backBtn = document.getElementById("backbtn");
    const logo = document.getElementById("title");
    // ----

    const SNAKE_SPEED = 17;
    const snake_body = [];

    const fruit = {
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: {
            x: 10,
            y: 10
        },
        outline: true,
        thickness: 2
    }

    const player = {
        x: canvas.width/2,
        y: canvas.height/2,
        color: "green",
        size: {
            x: 20,
            y: 20
        },
        outline: true,
        thickness: 2
    }
    const color_random = {
        value: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
    }
////

//// let variables
    // ---- animation id
        let gameLoopAnimation  = undefined;
        // let lastTime = 0;
    // ----


    let gameoverText, defaultTailLength = 1, tailLength = defaultTailLength;


    let VelY = 0, VelX = 0, score = 0, apple, snake;
////

// ---- functions

    function init() {
        playbtn.style.display = "none";
        controlsbtn.style.display = "none";
        controlsPanel.style.display = "none";
        backBtn.style.display = "none";
        logo.style.display = "none";
        document.addEventListener("keydown", keyDown);
        gameLoop();
        const frameRate = new Frame("frame-count", ctx);
    }

    
    function Character(){
        
        
        apple = new Fruit(ctx, { type: "apple", x: fruit.x, y: fruit.y, size: {x: fruit.size.x, y: fruit.size.y},
                            outline: fruit.outline, thickness: fruit.thickness});
                            
        for(let i = 0; i < snake_body.length; i++){
                let parts = snake_body[i];
                new Player(ctx, {x: parts.x, y: parts.y, 
                    size: {x: player.size.x, y: player.size.y}, color: color_random.value, 
                    outline: player.outline, thickness: player.thickness});
            }
            snake_body.push(new SnakePart(player.x, player.y));

            while (snake_body.length > tailLength){
                snake_body.shift();
            }


            
            snake = new Player(ctx, {x: player.x, y: player.y, 
                size: {x: player.size.x, y: player.size.y}, color: player.color, tailLength: tailLength, 
                outline: player.outline, thickness: player.thickness});
                
    }
    
    //updating snake position
    function changeSnakePos(){
        // makes the snake move continuiesly.
        player.x = player.x + VelX;
        player.y = player.y + VelY;
    }

    //collision detection
    function detect(){

        /// to make it run on the same frame rate
        // const lastSec = (currentTime - lastTime) / 1000;
        // if(lastSec < 1/SNAKE_SPEED) return;

        // lastTime = currentTime;
        ///

        // --- check if player touches apple
        if(player.x < fruit.x + fruit.size.x &&
            player.x + player.size.x > fruit.x &&
            player.y < fruit.y + fruit.size.x &&
            player.size.y + player.y > fruit.y){
            fruit.x = Math.floor(Math.random() * canvas.width);
            fruit.y = Math.floor(Math.random() * canvas.height);
            tailLength++;
            score++;
            if(fruit.x <= 64){
            fruit.x = Math.floor(Math.random() * canvas.width);
            }
            if(fruit.x >= canvas.width - 64){
            fruit.x = Math.floor(Math.random() * canvas.width);
            }
            if(fruit.y <= 64){
            fruit.y = Math.floor(Math.random() * canvas.height);
            }
            if(fruit.y >= canvas.height - 64){
            fruit.y = Math.floor(Math.random() * canvas.height);
            }
            else if(fruit.x < player.x + player.size.x &&
                fruit.x + fruit.size.x > player.x &&
                fruit.y < player.y + player.size.x &&
                fruit.size.y + fruit.y > player.y){
                    fruit.x = Math.floor(Math.random() * canvas.width);
                    fruit.y = Math.floor(Math.random() * canvas.height);  
                }
        }
        /// ---
        

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.restore();
        
    }

    // the controls
    function keyDown(e) {
        switch (e.key) {
            case "w": // -- up
            case "ArrowUp":
            //this makes the player not able to go through their body
                if(VelY === SNAKE_SPEED){
                    return;
                }
                VelX = 0;
                VelY = -SNAKE_SPEED;
                break;
            case "s": // -- down
            case "ArrowDown":
                //this makes the player not able to go through their body
                if(VelY === -SNAKE_SPEED){
                    return;
                }
                VelX = 0;
                VelY = SNAKE_SPEED;
                break;
            case "a": //left
            case "ArrowLeft":
                //this makes the player not able to go through their body
                if(VelX === SNAKE_SPEED){
                    return;
                }
                VelX = -SNAKE_SPEED;
                VelY = 0;
                break;
            case "d":
            case "ArrowRight":
                //this makes the player not able to go through their body
                if(VelX === -SNAKE_SPEED){
                    return;
                }
                // right
                VelY = 0;
                VelX = SNAKE_SPEED;
                break;
            case "p":
            case "space":
                if(!gameLoopAnimation){
                    init();
                    console.log("playing");
                }else{
                    show();
                }
                break;
            case "r": //resetting the game
            if(gameoverText){
                reset();
                playbtn.click();
            }
            else{
                reset();
            }
            default:
                break;
        }
    }

    function updateScore(){
        new Text(ctx, {text: "Score: " + score, x: 50, y: 80, color: "yellow", font: "30px tahoma"});
    }

    function show() {
        clearTimeout(gameLoopAnimation);
        playbtn.style.display = "block";
        controlsbtn.style.display = "block";
        logo.style.display = "block";
        backBtn.style.display = "block";
        gameLoopAnimation = null;
    }

    function pause() {
        if(!gameLoopAnimation){
            init();
            console.log("playing");
        }else{
            show();
        }
    }

    function isGameOver(){
        let gameOver = false;

        if(VelX === 0 && VelY === 0){
            return false;
        }

        //walls
        if(player.x <= 0){
            gameOver = true;
        }
        if(player.x >= canvas.width - 20){
            gameOver = true;
        }
        if(player.y <= 0){
            gameOver = true;
        }
        if(player.y >= canvas.height - 20){
            gameOver = true;
        }

        for(let i = 0; i < snake_body.length; i++){
            let part = snake_body[i];
            while(part.x === player.x && part.y === player.y){
                gameOver = true;
                break;
            }
        }

        if(gameOver){
            reset();
        }

        return gameOver;
    }

    function gameLoop() {
        gameLoopAnimation = setTimeout(gameLoop, 1070 / SNAKE_SPEED);
        changeSnakePos();
        document.addEventListener("keydown", keyDown);
        let result = isGameOver();
        if(result){
            gameoverText = new Text(ctx, {text: "GAME OVER", x: canvas.width / 2 - 300, y: canvas.height / 2 - 100, font: "100px comic sans", color: "purple"});
            show();
            return;
        }

        detect();
        Character();
        updateScore();
    }

    function reset() {
        if(gameoverText){
            gameoverText = null;
            player.x = canvas.width / 2;
            player.y = canvas.height / 2;
            tailLength = defaultTailLength;
            VelX = 0;
            VelY = 0;
            score = 0;
            document.removeEventListener("keydown", keyDown);

        }
        
    }
// ----


// ---- event listeners
    playbtn.addEventListener("click", function(){
        init();
    document.documentElement.requestFullscreen();
    });

    document.getElementById("pause").addEventListener("click", pause);

// ----


/// classes call
    //setting the canvas to be fullscreen
    const resizedCanvas = new Resize({ element: canvas});
///

export{
    canvas,
    ctx,
    playbtn,
    color_random
}