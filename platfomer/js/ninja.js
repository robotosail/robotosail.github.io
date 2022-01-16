import MovingDirection from "./directions.js";

export default class Pacman{
    constructor(x, y, tileSize, velocity, tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.madeFirstMove = false;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        // --- the animation timer
        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimationTimer = null;
        // ---

        this.pacmanRotation = this.Rotation.right;
        // --- event listener for the movement
        document.addEventListener("keydown", this.#keydown);
        // ---

        this.#loadPacmanImages();
    }

    Rotation = {
        up:3,
        down:1,
        left:2,
        right:0
    }

    draw(ctx, pause){
        if (!pause) {
            this.#move();
        }

        const size = this.tileSize / 2;

        //makes pacman rotate
        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], -size, -size, this.tileSize, this.tileSize);
        ctx.restore();
        // ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize);
    }

    // private methods
    #loadPacmanImages(){
        const pacmanImage1 = new Image();
        pacmanImage1.src = "assets/ninja.png";

        this.pacmanImages = [pacmanImage1];

        this.pacmanImageIndex = 0;
    }

    #keydown = (e)=>{
        //up
        if(e.key === "ArrowUp" || e.key === "w"){
            if(this.currentMovingDirection == MovingDirection.down){
                this.currentMovingDirection = MovingDirection.up;
            }
            this.requestedMovingDirection = MovingDirection.up;
            this.madeFirstMove = true;
        }
        //down
        if(e.key === "ArrowDown" || e.key === "s"){
            if(this.currentMovingDirection == MovingDirection.up){
                this.currentMovingDirection = MovingDirection.down;
            }
                this.requestedMovingDirection = MovingDirection.down;
                this.madeFirstMove = true;
        }
        //left
        if(e.key === "ArrowLeft" || e.key === "a"){
            if(this.currentMovingDirection == MovingDirection.right){
                this.currentMovingDirection = MovingDirection.left;
            }
                this.requestedMovingDirection = MovingDirection.left;
                this.madeFirstMove = true;
        }
        //right
        if(e.key === "ArrowRight" || e.key === "d"){
            if(this.currentMovingDirection == MovingDirection.left) // this method of if statement only calls the the first line under it
                this.currentMovingDirection = MovingDirection.right;
                this.requestedMovingDirection = MovingDirection.right;
                this.madeFirstMove = true;
        }
    }

    //make pacman move
    #move(){
        if(this.currentMovingDirection !== this.requestedMovingDirection){
            if(Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)){
                if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.requestedMovingDirection))
            this.currentMovingDirection = this.requestedMovingDirection;
            }
        }
        if(this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)){
            this.pacmanAnimationTimer = null;
            this.pacmanImageIndex = 0;
            return;
        }
        else if(this.currentMovingDirection != null && this.pacmanAnimationTimer === null){
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
        }
        switch (this.currentMovingDirection) {
            case MovingDirection.up: //up
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up;
                break;
        
            case MovingDirection.down: // down
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down;
                break;

            case MovingDirection.left: //left
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left;
                break;

            case MovingDirection.right: // right
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right;
                break;
            default:
                break;
        }
    }
}

export{
    Pacman
}