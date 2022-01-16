import TileMap from "./tileMap.js";

// constant

    // --- canvas
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    // ---
    
    const tileSize = 32;
    const tileMap = new TileMap(tileSize);
    let velocity = 2;
    const pacman = tileMap.getPacman(velocity);
    const gameOverSound = new Audio("sound/sounds_gameOver.wav");
    const gameWinSound = new Audio("sound/sounds_gameWin.wav");
    const playbtn = document.getElementById("playbtn");

    //enemies
    const enemies = tileMap.getEnemies(velocity);
    //
//

/// variables
    let gameLoopId;
    let gameOver = false;
    let gameWin = false;

///

/// functions
function init(){
    document.getElementById("main").style.display = "block";
    playbtn.style.display = "none";
    tileMap.setCanvasSize(canvas);
}

function gameLoop() {
    tileMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach(enemy => {
        enemy.draw(ctx, pause(), pacman);
    });
    chackGameOver();
    chackGameWin();
}

function chackGameOver(){
    if(!gameOver){
        gameOver = isGameOver();
        if(gameOver){
            gameOverSound.play();
            playbtn.style.display = "block";
        }
    }
}

function chackGameWin(){
    if(!gameWin){
        gameLoopId = null;
        velocity = null;
        gameWin = tileMap.didWin();
        if(gameWin){
            gameWinSound.play();
            playbtn.style.display = "block";
        }
    }
}

function isGameOver(){
    gameLoopId = null;
    velocity = null;
    return enemies.some(enemy => !pacman.powerDotActive && enemy.collideWith(pacman));
}


function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}


function drawGameEnd() {
    if(gameOver || gameWin){
        let text = "You win";
        if(gameOver){
            text = "Game Over";
        }
        ctx.fillRect(0, canvas.height/3.2, canvas.width, 80);
        ctx.font = "80px comic sans";
        ctx.fillStyle = "skyblue";
        ctx.fillText(text, 100, canvas.height/2)
    }
}

playbtn.addEventListener("click", function(){
    if(!gameOver || !gameWin){
        init();
     gameLoopId = setInterval(gameLoop, 1000/75);
    }
    if(gameOver){
        pacman.x = 352;
        pacman.y = 224;
        gameOver = false;
        playbtn.style.display = "none";
    }
    else if(gameWin){
        gameWin = false;
        playbtn.style.display = "none";
    }
})
///