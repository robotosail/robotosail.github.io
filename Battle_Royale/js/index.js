///////// IMPORTS
import { Resize, Circle, Map, Square, Collision } from "./classes.js";
import { clicking, speed, up, down, left, right } from "./controls.js";
/////////

///////// CONSTANT VARIABLES
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const canvasColor = "rgba(250, 0,  0, 1)"; //set to point 1 to add draging effect
const width = innerWidth;
const height = innerHeight;
/////////

///////// LET VARIABLES
let offset = {
    x: 0,
    y: 0
};

let player = {
    x: innerWidth / 2 - offset.x,
    y: innerHeight / 2, //so it is always in the middle of the screen
    color: "rgba(20, 200, 100, 10)",
    radius: 30,
    outline: true,
    lineWidth: 5
}
let fist = {
    x1: player.x - 27,
    x2: player.x + 28,
    y1: player.y - 25,
    y2: player.y - 25,
    color: "blue",
    radius: 10
}
let boxes = {
    radius: 100,
    damage: 10,
    color: "brown"
}

let Player = new Circle(c, player);
let Fist1 = new Circle(c, { x: fist.x1, y: fist.y1, radius: fist.radius, color: fist.color, outline: true });
let Fist2 = new Circle(c, { x: fist.x2, y: fist.y2, radius: fist.radius, color: fist.color, outline: true });
let map, box, box1, crates = [];
/////////



///////// FUNCTIONS DEFINED
function DrawPlayer() {
   
    // drawing the player
    Player.draw();
    Fist1.draw();
    Fist2.draw()
}

function DrawMap() {
    box1 = new Square(c, { x: 400, y: 100, width: boxes.radius, height: boxes.radius, color: boxes.color, outline: true });
    // for destroying the box
    // if () {
        let destroyCollision1 = new Collision(box1, Fist1).checkCircleandRect(c);
        if (destroyCollision1 == true && clicking) {
            boxes.radius -= boxes.damage; //reducing the box size when hit

            if (boxes.radius <= 30) {
                boxes.radius = 0;
            }
        }
    // }
    // to stop moving
    let destroyCollision = new Collision(box1, Player).checkCircleandRect(c);
    if (destroyCollision === true && up == true ||
        destroyCollision === true && down == true ||
        destroyCollision === true && left == true ||
        destroyCollision === true && right == true  ) {
        speed.value = 0;
    }
    else {
        speed.value = 2;
    }
}
// resizing the canvas
function resize() {
    new Resize(canvas, { width:width, height:height, update:false, color: canvasColor });
}

//animate
function animate() {
    requestAnimationFrame(animate);
     // clearing the canvas so that the buffer doesn't show
    c.fillStyle = canvasColor;
    c.save()
    c.translate(offset.x, offset.y);
    c.fillRect(-offset.x, -offset.y, canvas.width, canvas.height);
    map = new Map(c, { size: 90, amount: 10 })
    DrawMap();
    DrawPlayer();
    c.restore();
}

/////////

//////// FUNCTIONS CALL
resize();
animate();
////////

//////// EXPORTS
export {
    Player,
    player,
    Fist1,
    Fist2,
    offset,
    fist,
    c,
    width, 
    height
}