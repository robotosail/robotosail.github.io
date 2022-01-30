import Pacman from "./pacman.js";
import MovingDirection from "./directions.js";
import Enemy from "./Enemy.js"


export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.yellowDot = this.#image("yellowDot.png");
        this.pinkDot = this.#image("pinkDot.png");

        this.wall = this.#image("wall.png");

        this.powerDot = this.pinkDot;
        this.powerDotAnimationTimerDefault = 30;
        this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
    }

    //0 - dots
    //1 - walls
    //2 - pacman
    //3 - ghost
    //4 - empty space
    //5 - power dot
    
    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // -- 20 units
        [1,5,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1], // -- 20 units
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1], // -- 20 units
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,5,1,2,1], // -- 20 units
        [1,3,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1], // -- 20 units
        [1,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,1], // -- 20 units
        [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1], // -- 20 units
        [1,0,1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,1], // -- 20 units
        [1,0,1,1,1,1,0,1,1,1,1,1,5,1,1,1,1,1,0,1], // -- 20 units
        [1,5,3,0,0,0,0,0,0,0,0,0,0,3,0,0,0,1,5,1], // -- 20 units
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // -- 20 units
    ]

    draw(ctx){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 0){
                    this.#drawDot(ctx, column, row, this.tileSize);
                }
                else if(tile === 1){
                    this.#drawWall(ctx, column, row, this.tileSize);
                }
                else if(tile === 3){
                    this.#drawEnemies(ctx, column, row, this.tileSize)
                }
                else if(tile === 5){
                    this.#drawPowerDot(ctx, column, row, this.tileSize);
                }

                else{
                    this.#drawBlank(ctx, column, row, this.tileSize);
                }

                // // to help visualize
                // ctx.strokeStyle = "red";
                // ctx.strokeRect( column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize)
            }
        }
    }

    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize; //setting the canvas size
        canvas.height = this.map.length * this.tileSize; 
    }

    getPacman(velocity){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 2){
                    tile = this.map[row][column] = 0; 
                    return new Pacman(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                }

            }
        }
    }

    getEnemies(velocity){
        const enemies = []
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                const tile = this.map[row][column];
                if(tile === 3){
                    this.map[row][column] = 0;
                    enemies.push(new Enemy(column* this.tileSize, row * this.tileSize, this.tileSize, velocity, this));
                }

            }
        }
        return enemies;
    }

    didCollideWithEnvironment(x, y, direction){
        if (direction == null) {
            return;
        }

        //checks if the position is in the tile before moving
        if(Number.isInteger(x/this.tileSize) && Number.isInteger(y/this.tileSize)){
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;
            
            switch (direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            
                default:
                    break;
            }
            const tile = this.map[row][column]; //detecting collision between walls
            if(tile === 1){
                return true;
            }
        }
        return false;
    }

    eatDot(x, y){
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)){
            if(this.map[row][column] === 0){
                this.map[row][column] = 4;
               return true; 
            }
            return false;
        }
    }

    eatPowerDot(x, y){
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)){
            if(this.map[row][column] === 5){
                this.map[row][column] = 4;
               return true;
            }
            return false;
        }
    }

    eatGhost(x, y){
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)){
            if(this.map[row][column] === 3){
               return true; 
            }
            return false;
        }
    }

    didWin(){
        return this.#dotsLeft() === 0;
    }

    ///private method -- to make it in accessible.
    #drawDot(ctx, column, row, size){
        ctx.drawImage(this.yellowDot, column * this.tileSize, row * this.tileSize, size, size);
    }

    #drawWall(ctx, column, row, size){
        ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size);
    }
    
    #drawBlank(ctx, column, row, size){
        ctx.fillStyle = "black";
        ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size)
    }

    #drawEnemies(ctx, column, row, size){
        ctx.drawImage(this.ghost, column * this.tileSize, row * this.tileSize, size, size);
    }

    #drawPowerDot(ctx, column, row, size){
        this.powerDotAnimationTimer --;
        if(this.powerDotAnimationTimer === 0){
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
            if(this.powerDot === this.pinkDot){
                this.powerDot = this.yellowDot;
            }
            else{
                this.powerDot = this.pinkDot;
            }
        }
        ctx.drawImage(this.powerDot, column * size, row * size, size, size)
    }

    #dotsLeft(){
        //transforms an array by combining them into one
        return this.map.flat().filter(tile=>
            tile === 0
        ).length;
    }

    //gets images
    #image(filename){
        const image = new Image();
        image.src = `assets/${filename}`;

        return image;
    }


}

// 12:15