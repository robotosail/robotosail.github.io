import {
  camera,
  THREE,
  scene,
  CANNON,
  world,
  Materials,
} from "./index.js";
import { drawShape } from "./classes.js";
import { playerBody } from "./player.js";

function createBox() {
  let box = new drawShape({
    update: true,
    name: "box",
    shape: "box",
    width: 5,
    height: 5,
    depth: 5,
    x: 10,
    y: 0,
    z: 70,
    color: "red",
    phong: true,
    material: Materials.groundMaterial,
    mass: 0,
  });
  // box.material.friction = 1;
  // box.material.restitution = 1;
  console.log(playerBody.material);
}

createBox();
