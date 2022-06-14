import { controls, camera, options } from "./index.js";
import { player, playerBody } from "./player.js";
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let movespeed = 0.33;
let crouch = false;
// let jumpspeed = 0.29;
let jumpspeed = 0.3;
let jumpHeight = 20;
let w = "w";
let a = "a";
let d = "d";
let s = "s";
let up = "ArrowUp";
let down = "ArrowDown";
let left = "ArrowLeft";
let right = "ArrowRight";
let shift = "Shift";
let space = " ";
let animationId;
let container = document.getElementById("container");
var havePointerLock =
  "pointerLockElement" in document ||
  "mozPointerLockElement" in document ||
  "webkitPointerLockElement" in document;

if (havePointerLock) {
  var element = document.body;

  var pointerlockchange = function (event) {
    if (
      document.pointerLockElement === element ||
      document.mozPointerLockElement === element ||
      document.webkitPointerLockElement === element
    ) {
      controls.enabled = true;

      // blocker.style.display = 'none';
    } else {
      controls.enabled = false;

      container.style.display = "-webkit-box";
      container.style.display = "-moz-box";
      container.style.display = "box";

      // instructions.style.display = '';
    }
  };
  var pointerlockerror = function (event) {
    container.style.display = "";
  };

  // Hook pointer lock state change events
  document.addEventListener("pointerlockchange", pointerlockchange, false);
  document.addEventListener("mozpointerlockchange", pointerlockchange, false);
  document.addEventListener(
    "webkitpointerlockchange",
    pointerlockchange,
    false
  );

  document.addEventListener("pointerlockerror", pointerlockerror, false);
  document.addEventListener("mozpointerlockerror", pointerlockerror, false);
  document.addEventListener("webkitpointerlockerror", pointerlockerror, false);
}
class Controler {
  constructor() {
    const self = this;
    window.addEventListener("keydown", this.moveKeyboard, false);
    window.addEventListener("keyup", this.move2Keyboard, false);

    controls.addEventListener("unlock", function () {
      cancelAnimationFrame(animationId);
      moveForward = false;
      moveBackward = false;
      moveRight = false;
      moveLeft = false;
      // canJump = false;
      // crouch = false;
    });

    controls.addEventListener("lock", function (e) {
      self.animatePlayer();
    });
  }
  moveKeyboard(e) {
    //checks if the input box is being focused
    if (e.target.matches("input")) {
      return;
    } else {
      // console.log(e.key);
      switch (e.key) {
        case w: // w
        case up: // up
          moveForward = true;
          break;
        case a: // a
        case left: // left
          moveLeft = true;
          break;
        case s: // s
        case down: // back
          moveBackward = true;
          break;
        case d: // d
        case right: // right
          moveRight = true;
          break;
        case shift: //shift
          crouch = true;
          break;
        case space: // space
          canJump = true;
          break;
        default:
          break;
      }
    }
  }
  move2Keyboard(e) {
    switch (e.key) {
      case w: // w
      case up: // up
        moveForward = false;
        break;
      case a: // a
      case left: // left
        moveLeft = false;
        break;
      case s: // s
      case down: // back
        moveBackward = false;
        break;
      case d: // d
      case right: // right
        moveRight = false;
        break;
      case space: // space
        canJump = false;
        break;
      case shift: // shift
        crouch = false;
        break;
      default:
        break;
    }
  }

  checkKeyStates() {
    if (moveForward) {
      controls.moveForward(movespeed);
      // playerBody.velocity.z += movespeed; // figure out how to use velocity instead of position inorder of smooth movement.
    }
    if (moveBackward) {
      controls.moveForward(-movespeed);
      // playerBody.velocity.z -= movespeed; // figure out how to use velocity instead of position inorder of smooth movement.
    }
    if (moveRight) {
      controls.moveRight(-movespeed);
      // playerBody.velocity.x += movespeed; // figure out how to use velocity instead of position inorder of smooth movement.
    }
    if (moveLeft) {
      controls.moveRight(movespeed);
      // playerBody.velocity.x -= movespeed; // figure out how to use velocity instead of position inorder of smooth movement.
    }
    // allows the player to jump
    // Jumping and player position is less than jumpHeight jump

    // to make the playerBody.position come back down after jumping
    if (canJump === false) {
      playerBody.velocity.y += jumpspeed;
      playerBody.position.y += jumpspeed;
    }
    //the crouch
    if (crouch && playerBody.position.y <= 0) {
      playerBody.velocity.y += jumpspeed;
      playerBody.position.y += jumpspeed;
    }
    //if the playerBody.position is crouching and the position is less than -3 remain there
    if (crouch && playerBody.position.y >= 0) {
      playerBody.position.y -= jumpspeed;
    }
    //stop crouching
    // else if (crouch === false && playerBody.position.y >= 0) {
    //   playerBody.position.y -= jumpspeed;
    // }
  }
  animatePlayer() {
    animationId = requestAnimationFrame(this.animatePlayer.bind(this));
    if (playerBody) {
      this.checkKeyStates();
      playerBody.position.x = camera.position.x;
      playerBody.position.z = camera.position.z;
      camera.position.y = playerBody.position.y;
    }
  }
}

new Controler();
