//"use strict";
// import { crateBody } from "./crates.js";
import { camera, THREE, scene, CANNON, world } from "./index.js";

let player, mass = 10;

let playerBody;

let createPlayer = function () {
  // removing the friction
  const player_Shape = new CANNON.Box(new CANNON.Vec3(5 / 2, 5 / 2, 5 / 2))
  playerBody = new CANNON.Body({mass: mass, shape: player_Shape});

  let player_geometry = new THREE.BoxGeometry(
    5,
    5,
    5
  );
  let player_material = new THREE.MeshBasicMaterial({
    color: "blue"
  });
  player = new THREE.Mesh(player_geometry, player_material);

    playerBody.position.copy(camera.position);
  world.addBody(playerBody);
  camera.add(player);
  
  
  updateCameraPosition();
};

let updateCameraPosition = function () {
    requestAnimationFrame(updateCameraPosition);
    player.position.copy(playerBody.position);
    player.quaternion.copy(playerBody.quaternion);

  // when the player rotates
  playerBody.quaternion.copy(camera.quaternion);
  playerBody.position.copy(camera.position)
    
};
createPlayer();

export{
  player,
  playerBody,
}