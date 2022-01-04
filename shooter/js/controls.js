import { player, x, y, projectile, cameraSpeed, offset } from "./index.js";

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
const movespeed = 3;

let friction = 0.1;
let angle = Math.atan2( innerHeight / 2 - 100, innerWidth / 2 - 100);
const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
}
function move(e){
    switch (e.key) {
        case "w":
           moveUp = true;   
        break;
        case "s":
                moveDown = true;
        break;
        case "a":
            moveLeft = true
                break;
        case "d":
            moveRight = true
                break;
    
        default:
            break;
    }
}

function notmoving(e){
    switch (e.key) {
        case "w":
           moveUp = false;
        break;
        case "s":
            moveDown = false;
        break;
        case "a":
            moveLeft = false;
                break;
        case "d":
            moveRight = false;
                break;
    
        default:
            break;
    }
}

window.addEventListener("keydown", move)
window.addEventListener("keyup", notmoving)

function animate(){
    velocity.x *= friction;
    velocity.y *= friction;
    requestAnimationFrame(animate)
    if(moveUp){
        player.y -= movespeed - velocity.y;
        projectile.y -= movespeed - velocity.x;
        offset.y += cameraSpeed.y - velocity.y;
    }
    if(moveDown){
        player.y += movespeed - velocity.y;
        projectile.y += movespeed - velocity.y;
        offset.y -= cameraSpeed.y - velocity.y;
    }
    if(moveLeft){
        player.x -= movespeed - velocity.x;
        projectile.x -= movespeed - velocity.x;
        offset.x += cameraSpeed.x - velocity.x;
    }
    if(moveRight){
        player.x += movespeed - velocity.x;
        offset.x -= cameraSpeed.x - velocity.x;
    }
}

animate();

export{
    movespeed
}