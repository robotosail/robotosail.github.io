///////// IMPORTS
import * as RBTS from "./classes.js";
import { clicking, speed, up, down, left, right } from "./controls.js";
/////////

///////// CONSTANT VARIABLES
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const canvas4 = document.getElementById("canvas4");
const c1 = canvas1.getContext("2d"); //all the static assets like the crate get drawn on here
const c2 = canvas2.getContext("2d");
const c3 = canvas3.getContext("2d");
const c4 = canvas4.getContext("2d");
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
    radius: 20,
    outline: true,
    lineWidth: 5
}
let offset = {
    x: -player.x + width /2,
    y: -player.y + height /2
};
let fist = {
    x1: 20,
    x2:  -18,
    y1: 16,
    y2: 20,
    color: "blue",
    radius: 7
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
let colors = ["green", "red", "purple", "orange", "magenta", "pink", "blue", "cyan"];
let Player = new RBTS.Circle(c1, player),
Fist1 = new RBTS.Circle(c1, { x: fist.x1, y: fist.y1, radius: fist.radius, color: fist.color, outline: true }),
Fist2 = new RBTS.Circle(c1, { x: fist.x2, y: fist.y2, radius: fist.radius, color: fist.color, outline: true });
// let Fist2 = new Square(c1, { x: fist.x2, y: fist.y2, width: fist.radius, height: fist.radius, color: fist.color, outline: true });
let map, box, box2, crates = [], crates2 = [], destroyCollision1, destroyCollision2, hitCollision1, hitCollision2;
// allows player to rotate
let rotateFist1 = new RBTS.Rotate(c1, { x: Player.x, y: Player.y }),
    rotateFist2 = new RBTS.Rotate(c1, { x: Player.x, y: Player.y }), weaponThere1 = false, weaponThere2 = false, random_x1, random_y1, random_x2, random_y2, x = player.x, y = player.y, weapon = { x: 0, y: 0, width: 60, height: 60, src: "assets/scar.png" },
    gun, guns = [], surroundingCircle1, surroundingCircle2, circleArray = [], infoMessage, message = { color: "white", txt: "press e to pick up"};
let overcollision1, overcollision2;

    /////////


///////// FUNCTIONS DEFINED
    // console.time("loop") //gives you the amount of time something takes
    // console.timeEnd("loop") //gives you the amount of time something takes
    // console.group("Group") //create group for the log message
    // console.groupEnd()

    function DrawPlayer() {
    
        // drawing the player
        Player.draw();
    }

    // let x = Math.random(10) * 1000, y = Math.random(10) * 1000;
    function DrawBuildings() {
            // building = new Square(c2, {
            //     x: x, y: y, width: 800, height: 800, color: "blue", outline: true,
            // })
        
        let building = new RBTS.DrawImage(c3, "./assets/building1.png", { x: x, y: y, width: 800, height: 800 });
            // console.log("building.x");
    }

    //draw at random position
    function DrawCrates() {
        for (let i = 0; i < 16; i++){
            random_x1 = randomNum(boxes.radius, ((width) - boxes.radius));
            random_y1 = randomNum(boxes.radius, ((height) - boxes.radius));
            random_x2 = randomNum(boxes.radius, ((width) - boxes.radius));
            random_y2 = randomNum(boxes.radius, ((height) - boxes.radius));
            // console.log("drawn");
            box = new RBTS.Square(c2, { x: randomNum(boxes.radius, ((width) - boxes.radius)), y: randomNum(boxes.radius, ((height) - boxes.radius)), width: boxes.radius, height: boxes.radius, color: boxes.color, outline: true, update: true});
            box2 = new RBTS.Square(c2, { x: random_x2, y: random_y2, width: boxes.radius, height: boxes.radius, color: boxes.color, outline: true, update: true });
            if (box.x == box2.x && box.y == box2.y) {
                box.x = random_x1;
                box.y = random_y1;
                box2.x = random_x2;
                box2.y = random_y2;
            }
            crates.push(box);
            crates2.push(box2);
        }
        // console.table(crates);
        // console.log(crates2);
    }
    // for detecting collision
    function collisionDetection() {
    // looping thourgh the crates and adding collision
        crates.forEach(crate => {
            // for destroying the box
            destroyCollision1 = new RBTS.Collision({ obj1: crate, obj2: Fist1 }).checkCircleandRect({ arms: true, player: Player });
            hitCollision1 = new RBTS.Collision({ obj1: crate, obj2: Player }).checkCircleandRect({ arms: false });

            if (destroyCollision1 == true && clicking) {
                c2.save()
                c2.translate(crate.x / 2, crate.y / 2);
                crate.width -= boxes.damage; //reducing the crate size when hit
                crate.height -= boxes.damage; //reducing the crate size when hit
                if (crate.width <= 30 || crate.height <= 30) {
                    crate.width = 0;
                    crate.height = 0;
                    weaponThere1 = true;
                }
                c2.restore();
            }
            // collision between the player and the boxes
            if (hitCollision1 === true && up == true ||
                hitCollision1 === true && down == true ||
                hitCollision1 === true && left == true ||
                hitCollision1 === true && right == true) {
                // speed.value = 0;
                if (speed.value == speed.value) {
                    speed.value = -speed.value
                    // console.log(parseInt(-speed.value));
                }
                setTimeout(function () {
                    speed.value = Math.abs(speed.value);
                }, 100)
            }
        
            if (weaponThere1 === true && crate.width == 0 && crate.height == 0) {
                weapon.x = crate.x;
                weapon.y = crate.y;
                // instead of making things complicated by detecting collision between the player and the gun just create a circle and create a detection off of that
                surroundingCircle1 = new RBTS.Circle(c2, { x: weapon.x + (weapon.width / 2), y: weapon.y + (weapon.height / 2), radius: 35, outline: true, color: "rgba(0, 0, 255, 0.5)" });
                circleArray.push(surroundingCircle1);

                gun = new RBTS.Gun(c2, { src: weapon.src, x: weapon.x, y: weapon.y, width: weapon.width, height: weapon.height });
                
                overcollision1 = new RBTS.Collision({ obj1: surroundingCircle1, obj2: Player }).checkCircle();
                // c2.scale(2, 2);
                if (overcollision1 === true) {
                    infoMessage = new RBTS.DrawText(c2, {text: message.txt, x: gun.x, y: gun.y, mxwdth: 100, update: false, color: message.color})
                }
            }
        });
        let test = false;
        crates2.forEach(crate => {
            // for destroying the box,
            destroyCollision2 = new RBTS.Collision({ obj1: crate, obj2: Fist1 }).checkCircleandRect({ arms: true, player: Player });
            if (destroyCollision2 == true && clicking) {
                c2.save()
                c2.translate(crate.x / 2, crate.y / 2);
                crate.width -= boxes.damage; //reducing the crate size when hit
                crate.height -= boxes.damage; //reducing the crate size when hit
                if (crate.width <= 30 || crate.height <= 30) {
                    crate.width = 0;
                    crate.height = 0;
                    weaponThere2 = true;
                }
                c2.restore();
            }

            // collision between the player and the boxes
            hitCollision2 = new RBTS.Collision({ obj1: crate, obj2: Player }).checkCircleandRect({ arms: false });
            if (hitCollision2 === true && up == true ||
                hitCollision2 === true && down == true ||
                hitCollision2 === true && left == true ||
                hitCollision2 === true && right == true) {
                // speed.value = 0;
                if (speed.value == speed.value) {
                    speed.value = -speed.value
                    // console.log(parseInt(-speed.value));
                }
                setTimeout(function () {
                    speed.value = Math.abs(speed.value);
                }, 100)
            }

            //creating the weapon when it is there.
            if (weaponThere2 === true && crate.width == 0 && crate.height == 0) {
                weapon.x = crate.x;
                weapon.y = crate.y;
                surroundingCircle2 = new RBTS.Circle(c2, { x: weapon.x + (weapon.width / 2), y: weapon.y + (weapon.height / 2), radius: 35, outline: true, color: "rgba(0, 255, 0, 0.5)" })
                circleArray.push(surroundingCircle1)

                gun = new RBTS.Gun(c2, { src: weapon.src, x: weapon.x, y: weapon.y, width: weapon.width, height: weapon.height });
                guns.push(gun)
                overcollision2 = new RBTS.Collision({ obj1: surroundingCircle2, obj2: Player }).checkCircle();
                //detect collsion for when the player is over the gun using the surrounding circle
                if (overcollision2 === true) {
                    infoMessage = new RBTS.DrawText(c2, { text: message.txt, x: gun.x, y: gun.y, mxwdth: 100, update: false, color: message.color });
                    // test = true;
                    c2.clearRect(gun.x - 10, gun.y- 10, 100, 100) //so far so good
                }
            }
        });
        
    }

    function collisionArray() {
        
        //collision detection for the boxes with the crate array
        let arrays = [];
    
        //// if the crates are touching change their position.
            for (let i = 0; i < crates.length; i++) {
                for (let j = 0; j < crates2.length; j++) {
                    // console.log(crates[j].x + crates[j].width)
                    // console.log(crates[i].x)
                    // console.log(i, j)
                    // console.log(j)
                    if (crates[i].x < crates2[j].x + crates2[j].width &&
                        crates[i].x + crates[i].width > crates2[j].x &&
                        crates[i].y < crates2[j].y + crates2[j].height &&
                        crates[i].height + crates[i].y > crates2[j].y) {
                        // this.otherArray.push(this.obj1, this.obj2);
                        arrays.push(crates[i], crates2[j], crates[j], crates2[i])    
                    }
                }
                for (let j = 0; j < arrays.length; j++) {
                    const element = arrays[j];
                    // element.color = "purple";
                    element.x = random_x2;
                    element.y  = random_y2;
                }
            }
                    // console.table(arrays)
                    // console.log(touchcollision)

    }

    // resizing the canvas1
    function resize() {
        new RBTS.Resize(canvas1, { width: width, height: height, update: false,});
        new RBTS.Resize(canvas2, { width:canvas1.width, height:canvas1.height, update:false, });
        new RBTS.Resize(canvas3, { width:canvas1.width, height:canvas1.height, update:false, });
        new RBTS.Resize(canvas4, { width:canvas1.width, height:canvas1.height, update:false, });
    }

    // animation for the player canvas1
    function animate() {
        requestAnimationFrame(animate);
        // c1.fillStyle = canvasColor;
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

    //animate for the boxes and trees canvas1
    function animate2() {
        requestAnimationFrame(animate2)
        c2.save();
        c2.translate(offset.x, offset.y); // give illusion off player moving -- basically the camera

        // clearing the first canvas1
        c2.clearRect(-offset.x, -offset.y, canvas2.width, canvas2.height);
        // making random boxes
        crates.forEach(crate => {
            crate.draw();
        })
        crates2.forEach(crate => {
            crate.draw();
        });
        collisionDetection();

        // c1.fillStyle = 'black'
        // c1.fillRect(100, 100, 100, 100)
        c2.restore();
        // c2.clearRect()   
        
    }

    //the canvas for the buildings
    function animate3() {
        requestAnimationFrame(animate3);
        c3.save();
        c3.translate(offset.x, offset.y); // give illusion off player moving -- basically the camera
        c3.clearRect(-offset.x, -offset.y, canvas2.width, canvas2.height);
        DrawBuildings();
        c3.restore();

    }

    //the canvas for the map
    function animate4() {
        requestAnimationFrame(animate4);
        c4.fillStyle = canvasColor;
        c4.save();
        c4.translate(offset.x, offset.y); // give illusion off player moving -- basically the camera
        c4.fillRect(-offset.x, -offset.y, canvas2.width, canvas2.height);
        map = new RBTS.Map(c4, { x: mappos.x, y: mappos.y, size: 500, amount: 50 })
        c4.restore();
    }

    // creating random x and y
    function randomNum(min, max) {
        let result = Math.random() * (max - min) - min;
        return result;
    }

/////////

//////// FUNCTIONS CALL
resize();
DrawBuildings();
DrawCrates();
collisionArray();
animate();
animate2();
animate3();
animate4();
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