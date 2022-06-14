//"use strict";
// import { crateBody } from "./crates.js";
import { camera, THREE, scene, CANNON, world, Materials } from "./index.js";

let player;
const mass = 10,
  width = 2,
  height = 2.5,
  depth = 2;
let playerBody;

let createPlayer = function () {
  const player_geometry = new THREE.BoxGeometry(width, height, depth);
  const player_material = new THREE.MeshBasicMaterial({
    color: "blue",
    // wireframe: true, //for debugging purpose
  });
  player = new THREE.Mesh(player_geometry, player_material);
  scene.add(player);
  player.castShadow = true;

  // const player_Shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
  //use a shpere instead of a box as the player shape.
  const player_Shape = new CANNON.Sphere(2);
  playerBody = new CANNON.Body({
    mass: mass,
    shape: player_Shape,
    // material: Materials.groundMaterial,
  });
  playerBody.position.set(100, -5, 0);

  playerBody.linearDamping = 0.9;
  // playerBody.angularDamping = 0.4;
  world.addBody(playerBody);

  updateCameraPosition();
};

function updateCameraPosition() {
  requestAnimationFrame(updateCameraPosition);
  player.position.copy(playerBody.position);
  player.quaternion.copy(playerBody.quaternion);
  camera.position.copy(playerBody.position);

  // when the player rotates
  playerBody.quaternion.copy(camera.quaternion);
}
createPlayer();

export { player, playerBody };
