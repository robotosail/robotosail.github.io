import { controls, camera } from "./index.js";
import { player, playerBody } from "./player.js";
let moveForward =  false ;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let movespeed =  0.3;
let crouch = false;
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

class Controler{
    constructor() {
        const self = this;
        window.addEventListener("keydown", this.move, false);
        window.addEventListener("keyup", this.move2, false);

        controls.addEventListener("unlock", function () {
        cancelAnimationFrame(animationId);
        });

        controls.addEventListener("lock", function (e) {
            self.animatePlayer();
        });
    }
    move(e) {

        //checks if the input box is being focused
        if (e.target.matches("input")) {

            return;
        }
        else {
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
    move2(e) {
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
        }
        if (moveBackward) {
            controls.moveForward(-movespeed);

        }
        if (moveRight) {
            controls.moveRight(-movespeed);
        }
        if (moveLeft) {
            controls.moveRight(movespeed);
        }
        // allows the player to jump
        // Jumping and player position is less than jumpHeight jump
        if (canJump && playerBody.position.y > -jumpHeight) {
            playerBody.position.y -= jumpspeed;
        }
        // to make the playerBody.position come back down after jumping
        else if (canJump === false) {
            playerBody.position.y += jumpspeed;
        }
        //the crouch
        if (crouch && playerBody.position.y <= -1) {
            playerBody.position.y += jumpspeed;
        }
        //if the playerBody.position is crouching and the position is less than -3 remain there
        // if (crouch && playerBody.position.y >= 0) {
        //     playerBody.position.y -= jumpspeed;
        // }
        //stop crouching
        else if (crouch === false && playerBody.position.y >= 0) {
            playerBody.position.y -= jumpspeed;
        }
    }
    animatePlayer() {
        animationId = requestAnimationFrame(this.animatePlayer.bind(this));
        if (player) {
            
            this.checkKeyStates();
            playerBody.position.x = camera.position.x;
            playerBody.position.z = camera.position.z;
            camera.position.y = playerBody.position.y;
        }
    }
    
}

new Controler();