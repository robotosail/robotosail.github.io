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
const height = innerHeight, keyboard = {};
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
    x: -player.x + width / 2,
    y: -player.y + height / 2
};
let fist = {
    x1: 20,
    x2: -18,
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
let newGun = {
    x: -30,
    y: -80,
    width: 60,
    height: 60,
    equip: false
};

//gun list
let gunName = ["scar", "ak"]

let gunList = [];

let projectiles = [], projectile;
let colors = ["green", "red", "purple", "orange", "magenta", "pink", "blue", "cyan"];
let Player = new RBTS.Circle(c1, player),
    Fist1 = new RBTS.Circle(c1, { x: fist.x1, y: fist.y1, radius: fist.radius, color: fist.color, outline: true }),
    Fist2 = new RBTS.Circle(c1, { x: fist.x2, y: fist.y2, radius: fist.radius, color: fist.color, outline: true });
// let Fist2 = new Square(c1, { x: fist.x2, y: fist.y2, width: fist.radius, height: fist.radius, color: fist.color, outline: true });
let map, box, box2, crates = [], crates2 = [], destroyCollision1, destroyCollision2, hitCollision1, hitCollision2;
// allows player to rotate
let rotateFist1 = new RBTS.Rotate(c1, { x: Player.x, y: Player.y }),
    rotateGun = new RBTS.Rotate(c1, { x: Player.x, y: Player.y }),
    rotateFist2 = new RBTS.Rotate(c1, { x: Player.x, y: Player.y }),
    weaponThere1 = false,
    weaponThere2 = false,
    random_x1,
    random_y1,
    random_x2,
    random_y2,
    x = player.x,
    y = player.y,
    weapon = { x: 0, y: 0, width: 60, height: 60, src: "assets/scar.png", there: false },
    guns = [],
    guns2 = [],
    surroundingCircle1,
    surroundingCircle2,
    destroyableObjects = [],
    circleArray = [],
    circleArray2 = [],
    infoMessage,
    message = { color: "white", txt: ("E to pick up").split("").join(String.fromCharCode(8202)) },
    rectDoor;
let overcollision1, overcollision2, collision, gun, gun1, update = false, ecount = 0;
let equip = false, prevKey;
/////////


///////// FUNCTIONS DEFINED
// console.time("loop") //gives you the amount of time something takes
// console.timeEnd("loop") //gives you the amount of time something takes
// console.group("Group") //create group for the log message
// console.groupEnd()

for (let i = 0; i < gunName.length; i++) {
    gunList.push(`assets/${gunName[i]}.png`);
    console.log(gunList);
}

c1.msImageSmoothingEnabled = true;
c2.msImageSmoothingEnabled = true;
c3.msImageSmoothingEnabled = true;
c4.msImageSmoothingEnabled = true;
c1.mozImageSmoothingEnabled = true;
c2.mozImageSmoothingEnabled = true;
c3.mozImageSmoothingEnabled = true;
c4.mozImageSmoothingEnabled = true;
c1.webkitImageSmoothingEnabled = true;
c2.webkitImageSmoothingEnabled = true;
c3.webkitImageSmoothingEnabled = true;
c4.webkitImageSmoothingEnabled = true;
c1.imageSmoothingEnabled = true;
c2.imageSmoothingEnabled = true;
c3.imageSmoothingEnabled = true;
c4.imageSmoothingEnabled = true;

function DrawPlayer() {

    // drawing the player
    Player.draw();
}

// let x = Math.random(10) * 1000, y = Math.random(10) * 1000;
function DrawBuildings() {
    // building = new Square(c2, {
    //     x: x, y: y, width: 800, height: 800, color: "blue", outline: true,
    // })

    let building = new RBTS.DrawImage(c3, "./assets/building1.png", { x: x, y: y, width: 1000, height: 1000 });
    rectDoor = new RBTS.Square(c3, {x: building.x + (building.width / 2) - 40, y: building.y, width: 140, height: 40 / 2, color: "red", })
    let rectDoor2 = new RBTS.Square(c3, { x: building.x + (building.width / 2) - 60, y: building.y + building.height - 10, width: 140, height: 40 / 2, color: "red", });
    let doorCollision = new RBTS.Collision({obj1: rectDoor, obj2: Player}).checkCircleRect()
    let doorCollision2 = new RBTS.Collision({obj1: rectDoor2, obj2: Player}).checkCircleRect()
    // console.log("building.x");
    if (doorCollision == true || doorCollision2 == true) {
        // speed.value = 0;
        addEventListener("keyup", (e) => {
            prevKey = e.key; // check the last key that was pressed
        })
        if (keyboard[prevKey] == prevKey) { // check if the last key that was pressed is equal to the key that is being pressed
            speed.value = 0;
        }
        else if(keyboard[prevKey] !== prevKey) {
            speed.value = speed.main;
        }
        }
        else if (doorCollision == false || doorCollision2 == false) {
            prevKey = null;
        }
}

//draw at random position
function DrawCrates() {
    for (let i = 0; i < 16; i++) {
        random_x1 = randomNum(boxes.radius, ((width) - boxes.radius));
        random_y1 = randomNum(boxes.radius, ((height) - boxes.radius));
        random_x2 = randomNum(boxes.radius, ((width) - boxes.radius));
        random_y2 = randomNum(boxes.radius, ((height) - boxes.radius));
        // console.log("drawn");
        box = new RBTS.Square(c2, { x: randomNum(boxes.radius, ((width) - boxes.radius)), y: randomNum(boxes.radius, ((height) - boxes.radius)), width: boxes.radius, height: boxes.radius, color: boxes.color, outline: true, update: true });
        box2 = new RBTS.Square(c2, { x: random_x2, y: random_y2, width: boxes.radius, height: boxes.radius, color: boxes.color, outline: true, update: true });
        if (box.x == box2.x && box.y == box2.y) {
            box.x = random_x1;
            box.y = random_y1;
            box2.x = random_x2;
            box2.y = random_y2;
        }
        crates.push(box);
        crates2.push(box2);
        destroyableObjects.push(box, box2)
    }
    // console.table(crates);
    // console.log(crates2);
}

function DrawWeapon() {
    c2.font = "30px Arial"; //font size of the second canvas

    crates.forEach(crate => {
        if (weaponThere1 === true && crate.width == 0 && crate.height == 0) {
            weapon.x = crate.x;
            weapon.y = crate.y;
            // instead of making things complicated by detecting collision between the player and the gun just create a circle and create a detection off of that

            surroundingCircle1 = new RBTS.Circle(c2, { x: weapon.x + (weapon.width / 2), y: weapon.y + (weapon.height / 2), radius: 35, outline: true, color: "rgba(0, 0, 255, 0.5)" });
            circleArray.push(surroundingCircle1);

            gun = new RBTS.Gun(c2, { src: weapon.src, x: weapon.x, y: weapon.y, width: weapon.width, height: weapon.height });
            gun.draw()
            guns.push(gun)

            circleArray.forEach(circle => {
                overcollision1 = new RBTS.Collision({ obj1: circle, obj2: Player }).checkCircle();
            })
            // c2.scale(2, 2);
            if (overcollision1 === true) {
                infoMessage = new RBTS.DrawText(c2, { text: message.txt, x: gun.x - (gun.height / 2) + 10, y: gun.y + (gun.height / 2), mxwdth: 100, update: false, color: message.color });

                if (equip == true) {
                    gun.equip = true;
                }
            }

            guns.forEach(gund => {
                // if each of the guns there is set the false
                if (gund.equip === true) {

                    // making sure the player cannot pick more than 2 weapons up.
                    if (ecount >= 2) {
                        return true;
                    }
                    else if(ecount < 2){
                    //deleting the stationary gun from the scene
                        c2.clearRect(gund.x - 25, gund.y - 10, 105, 90);

                        //drawing a new gun to the player's scene
                        infoMessage = null;

                        // overcollision1.stop = true
                        gun1 = new RBTS.Gun(c1, { src: weapon.src, x: newGun.x, y: newGun.y, width: newGun.width, height: newGun.height, equip: newGun.equip })
                        // then drawing it onto that canvas
                        update = true;
                        // ecount + 1;
                        // guns2.splice(guns.indexOf(gun), 1)
                        //for precise cutting
                        // c2.save()
                        // c2.arc(weapon.x + (weapon.width / 2), weapon.y + (weapon.height / 2), 35, 0, Math.PI * 2);
                        // c2.clip();
                        // c2.clearRect(gun.x - 2, gun.y - 2, 65, 65) //so far so good
                        // // guns.splice(guns.indexOf(gun), 1)
                        // c2.restore()
                        // gun.x = 0;
                        // gun.y = 0;
                    }
                }
                // guns.splice(guns.indexOf(gun), 1)
            });
        }
    });

    crates2.forEach(crate => {
        //creating the weapon when it is there.
        if (weapon.there === true && crate.width == 0 && crate.height == 0) {
            weapon.x = crate.x;
            weapon.y = crate.y;
            surroundingCircle2 = new RBTS.Circle(c2, { x: weapon.x + (weapon.width / 2), y: weapon.y + (weapon.height / 2), radius: 35, outline: true, color: "rgba(0, 255, 0, 0.5)" })
            circleArray2.push(surroundingCircle2);
            gun = new RBTS.Gun(c2, { src: weapon.src, x: weapon.x, y: weapon.y, width: weapon.width, height: weapon.height, equip: false })
            gun.draw();
            guns2.push(gun);

            //detect collsion for when the player is over the gun using the surrounding circle
            //adding collision event for each circle in the array.
            circleArray2.forEach(circle => {
                overcollision2 = new RBTS.Collision({ obj1: circle, obj2: Player }).checkCircle();
            })

            //checking if the collision is true
            if (overcollision2 === true) {
                //// if the collision is true give player instructions of how to pick up the gun
                infoMessage = new RBTS.DrawText(c2, { text: message.txt, x: gun.x - (gun.height / 2) + 10, y: gun.y + (gun.height / 2), mxwdth: 100, update: false, color: message.color });
                //setting that the gun been there is false once the player presses e
                if (equip == true) {
                    gun.equip = true;
                }

            }

            //looping throught gun array 
            guns2.forEach(gund => {
                // if each of the guns there is set the false
                if (gund.equip === true) {
                    if (ecount >= 2) {
                        return true;
                    }
                    else if (ecount >= 2) {
                         
                        c2.clearRect(gund.x - 25, gund.y - 10, 105, 90);
                        
                        //drawing a gun prior to the players pos and updating it
                        gun1 = new RBTS.Gun(c1, { src: weapon.src, x: newGun.x, y: newGun.y, width: newGun.width, height: newGun.height, equip: newGun.equip })
                        // then drawing it onto that canvas
                        update = true;
                        ecount + 1;
                        // guns.splice(guns.indexOf(gun), 1)
                        //for precise cutting
                        // c2.save()
                        // c2.arc(weapon.x + (weapon.width / 2), weapon.y + (weapon.height / 2), 35, 0, Math.PI * 2);
                        // c2.clip();
                        // c2.clearRect(gun.x - 2, gun.y - 2, 65, 65) //so far so good
                        // // guns.splice(guns.indexOf(gun), 1)
                        // c2.restore()
                        // gun.x = 0;
                        // gun.y = 0;
                    }
                }
                // guns.splice(guns.indexOf(gun), 1)
            })
        }
    });

    // try {
    //     console.log(ecount);
    // } catch (error) {
    //     console.log(e);
    // }
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


    });

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
                weapon.there = true;
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

    });

    DrawWeapon();
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
            element.y = random_y2;
        }
    }
    // console.table(arrays)
    // console.log(touchcollision)

}

// resizing the canvas1
function resize() {
    new RBTS.Resize(canvas1, { width: width, height: height, update: false, });
    new RBTS.Resize(canvas2, { width: canvas1.width, height: canvas1.height, update: false, });
    new RBTS.Resize(canvas3, { width: canvas1.width, height: canvas1.height, update: false, });
    new RBTS.Resize(canvas4, { width: canvas1.width, height: canvas1.height, update: false, });
}

// animation for the player canvas1
function animate() {
    requestAnimationFrame(animate);
    // c1.fillStyle = canvasColor;
    c1.save();
    c1.translate(offset.x, offset.y); // to make the player move with the camera
    c1.clearRect(-offset.x, -offset.y, canvas1.width, canvas1.height);
    projectiles.forEach((projectile,) => {
        // updating the projectiles(bullet) position to make it move
        projectile.update();
    });
    DrawPlayer();
    rotateFist1.render();
    rotateFist2.render();
    rotateGun.render();
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

// updating the position of the projectile using animation frame. (for the use of collision)
function updateProjectile() {
    requestAnimationFrame(updateProjectile);
    projectiles.forEach((projectile) => {
        destroyableObjects.forEach(obj => {
            collision = new RBTS.Collision({ obj1: obj, obj2: projectile }).checkCircleandRect({ arms: false });

            if (collision == true) { // if the collision is true destroy object
                obj.width -= (boxes.damage);
                obj.height -= (boxes.damage);
                projectiles.splice(projectiles.indexOf(projectile), 1); //deleting the projectile from the array
                if (obj.width <= 50) {
                    obj.width = 0;
                    obj.height = 0;
                    weaponThere1 = true; //show the weapon when the object is destroyed
                    weapon.there = true;
                }
            }
        })
    })
}
/////////
setInterval(function () {
    console.log(prevKey);
}, 1000)
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


////// EVENT LISTENERS
    addEventListener("keydown", function (e) {
        if (e.key == "e") {
            equip = true;
            if (equip === true && overcollision1 == true || overcollision2 == true) {
                if (ecount >= 2) {
                    equip = false;
                    gun.equip = false;
                    ecount = 2;
                }
                else {
                    ecount++;
                }
            }
        }
        else {
            equip = false
        }
    })

        //// in testing: to always key the angle updated
            // let angle;
            // addEventListener("mousemove", (e) => {
            //     angle = Math.atan2(e.clientY - canvas1.height / 2, e.clientX - canvas1.width / 2);
            // })
        ////

    addEventListener("mousedown", function (e) {

        //the angle
        const angle = Math.atan2(e.clientY - canvas1.height / 2, e.clientX - canvas1.width / 2);
        const velocity = {
            x: Math.cos(angle) * 25, //the speed of the bullet: (higher the number the faster.)
            y: Math.sin(angle) * 25 //the speed of the bullet
        }

        //setting the position of the projectile to be from the player
        if (update == true) {
                projectiles.push(projectile = new RBTS.Projectile(c1, {
                    x: Player.x, y: Player.y,
                    radius: 5.5, color: "red", velocity: {
                        x: velocity.x, y: velocity.y
                    }
                }));
        }

        updateProjectile();
    })

    addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })
/////


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
    height,
    gun,
    gun1,
    guns,
    update,
    keyboard
}