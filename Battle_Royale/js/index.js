///////// IMPORTS
import { Resize, Circle, Map, Square, Collision, Rotate, DrawImage } from "./classes.js";
import { clicking, speed, up, down, left, right } from "./controls.js";
/////////

///////// CONSTANT VARIABLES
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const c1 = canvas1.getContext("2d"); //all the static assets like the crate get drawn on here
const c2 = canvas2.getContext("2d");
// const canvasColor = "rgba(250, 0,  0, 1)"; //set to point 1 to add draging effect
const canvasColor = "skyblue"; //set to point 1 to add draging effect
const width = innerWidth;
const height = innerHeight;
/////////
///////// LET VARIABLES

let player = {
    x: width / 2,
    y: height / 2, //so it is always in the middle of the screen
    color: "rgba(20, 200, 100, 10)",
    radius: 30,
    outline: true,
    lineWidth: 5
}
let offset = {
    x: -player.x + width /2,
    y: -player.y + height /2
};
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
    x: Math.random(10) * 1000,
    y: Math.random(10) * 1000,
    damage: 10,
    color: "brown"
}
let mappos = {
    x: Math.random(-2) * -100,
    y: Math.random(-2) * -100
}

let Player = new Circle(c1, player);
let Fist1 = new Circle(c1, { x: fist.x1, y: fist.y1, radius: fist.radius, color: fist.color, outline: true });
let Fist2 = new Circle(c1, { x: fist.x2, y: fist.y2, radius: fist.radius, color: fist.color, outline: true });
let map, box, box1, crates = [], destroyCollision1, hitCollision, building;
// allows player to rotate
let rotateFist1 = new Rotate(c1, { x: Player.x, y: Player.y });
let rotateFist2 = new Rotate(c1, { x: Player.x, y: Player.y });
let image = new Image();
image.src = "assets/scar.png";
/////////

if (mappos.x <= -60 || mappos.y <= -60) {
    speed.value = 4;
    // console.log("greater");
}
else {
    speed.value = speed.main;
}

///////// FUNCTIONS DEFINED
function DrawPlayer() {
   
    // drawing the player
    Player.draw();
}

// let x = Math.random(10) * 1000, y = Math.random(10) * 1000;
let x = Math.random(100) * 1000, y =537;
function DrawBuildings() {
        // building = new Square(c2, {
        //     x: x, y: y, width: 800, height: 800, color: "blue", outline: true,
        // })
    
    let building2 = new DrawImage(c2, "../assets/building1.png", { x: x, y: y, width: 800, height: 800 });
        // console.log("building.x");
}

function DrawCrates() {
    box = new Square(c2, { x: boxes.x, y: boxes.y, width: boxes.radius, height: boxes.radius, color: boxes.color, outline: true });
    crates.push(box);
    
}

// for detecting collision
function collisionDetection() {
    // for destroying the box
    destroyCollision1 = new Collision(box, Fist1).checkCircleandRect(c2, { arms: true, player: Player });
    if (destroyCollision1 == true && clicking) {
        c2.save()
        c2.translate(box.x / 2, box.y / 2);
        boxes.radius -= boxes.damage; //reducing the box size when hit
        if (boxes.radius <= 30) {
            boxes.radius = 0;
        }
        c2.restore();
    }
    // collision between the player and the boxes
    hitCollision = new Collision(box, Player).checkCircleandRect(c2, { arms: false });
    if (hitCollision === true && up == true ||
        hitCollision === true && down == true ||
        hitCollision === true && left == true ||
        hitCollision === true && right == true) {
        // speed.value = 0;
        if (speed.value == speed.value) {
            speed.value = -speed.value
            // console.log(parseInt(-speed.value));
        }
        setTimeout(function () {
            speed.value = Math.abs(speed.value);
        },100)
    }
    // else {
    //     speed.value = speed.main;
    // }
}
// resizing the canvas1
function resize() {
    new Resize(canvas1, { width: width, height: height, update: false,});
    new Resize(canvas2, { width:canvas1.width, height:canvas1.height, update:false, });
}

// animation for the player canvas1
function animate() {
    requestAnimationFrame(animate);
    c1.fillStyle = canvasColor;
    c1.save();
    c1.translate(offset.x, offset.y); // to make the player move with the camera
    // c2.fillRect(-offset.x, -offset.y, canvas1.width, canvas.height);
    c1.clearRect(-offset.x, -offset.y, canvas1.width, canvas1.height);
    // DrawCrates();
    // DrawBuildings();
    DrawPlayer();
    // collisionDetection();
    rotateFist1.render();
    rotateFist2.render();
    // c1.fillStyle = 'black'
    // c1.fillRect(100, 100, 100, 100)
    c1.restore();
}

//animate for the main canvas1
function animate2() {
    requestAnimationFrame(animate2)
    // clearing the canvas1 so that the buffer doesn't show
    c2.fillStyle = canvasColor;
    c2.save();
    c2.translate(offset.x, offset.y); // give illusion off player moving -- basically the camera

    // clearing the first canvas1
    c2.fillRect(-offset.x, -offset.y, canvas2.width, canvas2.height);

    // drawing the map
    map = new Map(c2, { x: mappos.x, y: mappos.y, size: 500, amount: 50 })
    DrawBuildings();
    DrawCrates();
    collisionDetection();
    // c1.fillStyle = 'black'
    // c1.fillRect(100, 100, 100, 100)
    if (boxes.radius <= 0) {
        c2.drawImage(image, boxes.x, boxes.y, 100, 100)
    }
    c2.restore();
    // c2.clearRect()
}

/////////

//////// FUNCTIONS CALL
resize();
DrawBuildings();

animate();
animate2();
////////

//////// EXPORTS
export {
    Player,
    player,
    Fist1,
    Fist2,
    offset,
    fist,
    c2,
    width, 
    height
}