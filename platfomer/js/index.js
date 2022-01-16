import { Map } from "./map.js";

////// the constant
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = 32;
let velocity = 2;
const map = new Map(tileSize);
const pacman = map.getPacman(velocity);
//////

let gameLoopId;
    let gameOver = false;
    let gameWin = false;

///// the functions
function init(){
    
    gameLoop();
}
init();

function chackGameWin(){
    if(!gameWin){
        gameLoopId = null;
        velocity = null;
        if(gameWin){
            gameWinSound.play();
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

function gameLoop(){
    requestAnimationFrame(gameLoop);
    map.setCanvasSize(canvas)
    map.draw(ctx);
    pacman.draw(ctx, pause());

}