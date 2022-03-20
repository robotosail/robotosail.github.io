import { Player, Fist1, Fist2, offset, c2} from "./index.js";

///////// CONSTANTS
const speed = {
    value: 4,
    main: 4,
};
const height = 20;
/////////

///////// VARIABLES
let up = false;
let down = false;
let left = false;
let right = false;
let clicking = false;
/////////
console.log(speed.value, speed.main);
///////// FUNCTIONS
function move(e) {
    // console.log(e.key);
    switch (e.key) {
        case "w":
        case "ArrowUp":
            up = true;
            break;
        case "s":
        case "ArrowDown":
            down = true;
            break;
        case "d":
        case "ArrowRight":
            right = true;
            break;
        case "a":
        case "ArrowLeft":
            left = true;
            break;

        default:
            break;
    }
}

function stopMoving(e) {
    switch (e.key) {
        case "w":
        case "ArrowUp":
            up = false;
            break;
        case "s":
        case "ArrowDown":
            down = false;
            break;
        case "d":
        case "ArrowRight":
            right = false;
            break;
        case "a":
        case "ArrowLeft":
            left = false;
            break;

        default:
            break;
    }
}

function click(e) {
    switch (e.button) {
        case 0:
            Fist1.y = Fist1.y + height
            clicking = true;
            setTimeout(function () {
                Fist1.y = Fist1.y - height;
                clicking = false;
            }, 100);
            // c2.scale(100, 100);
            break;
    
        default:
            break;
    }
}


function animate() {
    requestAnimationFrame(animate);
    // offset is for the moving camera
    if (up == true) {
        Player.y -= speed.value;
        // Fist1.y -= speed.value;
        // Fist2.y -= speed.value;
        offset.y += speed.value;
    } if (down == true) {
        Player.y += speed.value;
        // Fist1.y += speed.value;
        // Fist2.y += speed.value;
        offset.y -= speed.value;
    } if (left == true) {
        Player.x -= speed.value;
        // Fist1.x -= speed.value;
        // Fist2.x -= speed.value;
        offset.x += speed.value;
    } if (right == true) {
        Player.x += speed.value;
        // Fist1.x += speed.value;
        // Fist2.x += speed.value;
        offset.x -= speed.value;
    }
}
/////////

///////// EVENT LISTENERS
addEventListener("keydown", move);
addEventListener("click", click);
addEventListener("keyup", stopMoving);
/////////
    
///////// FUNCTION Call
animate();
/////////

export {
    clicking,
    speed,
    up,
    down,
    right,
    left
}
export default {
}