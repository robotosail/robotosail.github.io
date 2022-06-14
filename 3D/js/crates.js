import { camera, THREE, scene, CANNON, world, Materials } from "./index.js";
import { drawShape } from "./classes.js";
import { playerBody } from "./player.js";

function createBox() {
  for (let i = 0; i < 3; i++) {
    let box = new drawShape({
      update: true,
      name: "box",
      shape: "box",
      width: 5,
      height: 5,
      depth: 5,
      x: 10,
      y: -2,
      z: 70,
      color: "red",
      phong: true,
      material: Materials.groundMaterial,
      mass: 100,
      shadow: true,
    });
  }
}

createBox();
