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
        this.wakaSound = new Audio("sound/sounds_waka.wav");

        this.powerDotSound = new Audio("sound/sounds_power_dot.wav");
        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;
        this.timers = [];
        
        this.eatGhostSound = new Audio("sound/sounds_eat_ghost.wav");
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

    draw(ctx, pause, enemies){
        if (!pause) {
            this.#move();
            this.#animate();
        }

        this.#eatDot();
        this.#eatPowerDot();  
        this.#eatGhost(enemies);

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
        pacmanImage1.src = "assets/pac0.png";

        const pacmanImage2 = new Image();
        pacmanImage2.src = "assets/pac1.png";
    
        const pacmanImage3 = new Image();
        pacmanImage3.src = "assets/pac2.png";
    
        const pacmanImage4 = new Image();
        pacmanImage4.src = "assets/pac1.png";

        this.pacmanImages = [pacmanImage1, pacmanImage2, pacmanImage3, pacmanImage4];

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

    #animate(){
        if(this.pacmanAnimationTimer === null){
            return;
        }
        this.pacmanAnimationTimer--;

        if(this.pacmanAnimationTimer === 0){
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
            this.pacmanImageIndex++;
            //if the image list reaches to the end reset the image to pacman1
            if(this.pacmanImageIndex === this.pacmanImages.length){
                this.pacmanImageIndex = 0;
            }
        }
    }

    #eatDot(){
        if(this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove){
            //play sound
            this.wakaSound.play();
        }
    }

    #eatPowerDot(){
        if(this.tileMap.eatPowerDot(this.x, this.y)){
            //the ghost becomes blue
            this.powerDotSound.play();
            this.powerDotActive = true;
            this.powerDotAboutToExpire = false;
            this.timers.forEach(timer => {
                clearTimeout(timer);
            });
                this.timers = [];

                //makes the power dot active for 6 seconds
                let powerDotTimer = setTimeout(()=>{
                    this.powerDotActive = false;
                    this.powerDotAboutToExpire = false;
                }, 1000 * 6);

                this.timers.push(powerDotTimer);

                let powerDotAboutToExpireTimer = setTimeout(() =>{
                    this.powerDotAboutToExpire = true;
                }, 1000 * 3);

                this.timers.push(powerDotAboutToExpireTimer);
        }
    }

    #eatGhost(enemies){
        if(this.powerDotActive){
            //the filter method goes in through the enemies list one by one
            const collideEnemies = enemies.filter((enemy)=>
                enemy.collideWith(this)
            );
            collideEnemies.forEach((enemy)=>{
                //looping through the enemies list and splcing it.
                enemies.splice(enemies.indexOf(enemy), 1);
                this.eatGhostSound.play();
            })
        }
    }
}