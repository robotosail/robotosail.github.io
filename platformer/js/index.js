import TileMap from "./tileMap.js";

// constant

    // --- canvas
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    // ---
    
    const tileSize = 32;
    const tileMap = new TileMap(tileSize);
    const velocity = 2;
    const pacman = tileMap.getPacman(velocity);
    const gameOverSound = new Audio("sound/sounds_gameOver.wav");
    const gameWinSound = new Audio("sound/sounds_gameWin.wav");

    //enemies
    const enemies = tileMap.getEnemies(velocity);
    //
//

/// variables
    let gameLoopId;
    let gameOver = false;
    let gameWin = false;
    let enemyEaten = false;

///

/// functions
function gameLoop() {
    tileMap.draw(ctx);
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
        }
    }
}

function chackGameWin(){
    if(!gameWin){
        gameWin = tileMap.didWin();
        if(gameWin){
            gameWinSound.play();
        }
    }
}

function isGameOver(){
    return enemies.some(enemy => !pacman.powerDotActive && enemy.collideWith(pacman));
}


function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}

tileMap.setCanvasSize(canvas);
   gameLoopId = setInterval(gameLoop, 1000/75);
///