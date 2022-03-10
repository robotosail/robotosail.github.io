///////// IMPORTS
import { Resize, Circle, Map, Square, Collision, Rotate } from "./classes.js";
import { clicking, speed, up, down, left, right } from "./controls.js";
/////////

///////// CONSTANT VARIABLES
const canvas = document.getElementById("canvas");
const canvas2 = document.getElementById("canvas2");
const c = canvas.getContext("2d"); //all the static assets like the crate get drawn on here
const c2 = canvas2.getContext("2d");
// const canvasColor = "rgba(250, 0,  0, 1)"; //set to point 1 to add draging effect
const canvasColor = "green"; //set to point 1 to add draging effect
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
    x1: 26,
    x2:  -28,
    y1: 27,
    y2: 25,
    color: "blue",
    radius: 10
}
let boxes = {
    radius: 100,
    damage: 10,
    color: "brown"
}

let Player = new Circle(c2, player);
let Fist1 = new Circle(c2, { x: fist.x1, y: fist.y1, radius: fist.radius, color: fist.color, outline: true });
let Fist2 = new Circle(c2, { x: fist.x2, y: fist.y2, radius: fist.radius, color: fist.color, outline: true });
let map, box, box1, crates = [], destroyCollision1, hitCollision, building;
// allows player to rotate
let rotateFist1 = new Rotate(c2, { x: Player.x, y: Player.y });
let rotateFist2 = new Rotate(c2, { x: Player.x, y: Player.y });
/////////


///////// FUNCTIONS DEFINED
function DrawPlayer() {
   
    // drawing the player
    Player.draw();
}

function DrawBuildings() {
    building = new Square(c, {x: 100, y:600, width: 500, height: 500, color: "blue"})
}

function DrawCrates() {
    box = new Square(c, { x: 400, y: 100, width: boxes.radius, height: boxes.radius, color: boxes.color, outline: true });
    crates.push(box);
    
}

// for detecting collision
function collisionDetection() {
    // for destroying the box
    destroyCollision1 = new Collision(box, Fist1).checkCircleandRect(c, { arms: true, player: Player });
    if (destroyCollision1 == true && clicking) {
        c.save()
        c.translate(box.x / 2, box.y / 2);
        boxes.radius -= boxes.damage; //reducing the box size when hit
        if (boxes.radius <= 30) {
            boxes.radius = 0;
        }
        c.restore()
    }
    // collision between the player and the boxes
    hitCollision = new Collision(box, Player).checkCircleandRect(c, { arms: false });
    if (hitCollision === true && up == true ||
        hitCollision === true && down == true ||
        hitCollision === true && left == true ||
        hitCollision === true && right == true) {
        // speed.value = 0;
        if (speed.value == speed.value) {
            speed.value = -speed.value
            // console.log(parseInt(-speed.value));
        }
        // setTimeout(function () {
        //     speed.value = Math.abs(speed.value);
        // },100)
    }
    else {
        speed.value = 2;
    }
}
// resizing the canvas
function resize() {
    new Resize(canvas, { width: width, height: height, update: false, color: canvasColor });
    new Resize(canvas2, { width:canvas.width, height:canvas.height, update:false, color: canvasColor,});
}

//animate
function animate() {
    requestAnimationFrame(animate);
     // clearing the canvas so that the buffer doesn't show
    c2.fillStyle = canvasColor;
    c.fillStyle = canvasColor;
    c.save();
    c2.save();
    c.translate(offset.x, offset.y);
    // clearing the first canvas
    c.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);

    map = new Map(c, { size: 100, amount: 50 })
    DrawCrates();
    DrawBuildings();
    collisionDetection();
    // c2.fillStyle = 'black'
    // c2.fillRect(100, 100, 100, 100)
    c.restore();
    // c.clearRect()

}

function animate2() {
    requestAnimationFrame(animate2)
    c2.fillStyle = canvasColor;
    c2.save();
    c2.translate(offset.x, offset.y);
    // c.fillRect(-offset.x, -offset.y, canvas.width, canvas.height);
    c2.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);
    // DrawCrates();
    // DrawBuildings();
    DrawPlayer();
    // collisionDetection();
    rotateFist1.render();
    rotateFist2.render();
    // c2.fillStyle = 'black'
    // c2.fillRect(100, 100, 100, 100)
    c2.restore();
}

/////////

//////// FUNCTIONS CALL
resize();
animate2();
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